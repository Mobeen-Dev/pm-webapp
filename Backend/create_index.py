import re
import sys
import json
import pickle
from pathlib import Path
from collections import defaultdict
from typing import Dict, List
import PyPDF2
import difflib
from nltk.stem import PorterStemmer


class PDFBookIndexer:
    """
    Creates a searchable index of PDF books organized by sections.
    Supports fuzzy search, stemming, and multi-word queries.
    """
    
    def __init__(self):
        self.books = {}  # {book_name: {section_id: {title, content}}}
        self.index = defaultdict(lambda: defaultdict(list))
        self.stemmer = PorterStemmer()
        self.stem_lookup = {}  # maps original words → stems

    def extract_text_from_pdf(self, pdf_path: str) -> str:
        try:
            with open(pdf_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                return "\n".join(page.extract_text() or "" for page in reader.pages)
        except Exception as e:
            print(f"Error reading {pdf_path}: {e}")
            return ""

    def parse_sections(self, text: str) -> Dict[str, Dict[str, str]]:
        sections = {}
        pattern = r'^(\d+(?:\.\d+)*)\s+(.+?)$'
        lines = text.split('\n')
        current_section = None
        current_content = []

        for line in lines:
            line = line.strip()
            if not line:
                continue
            match = re.match(pattern, line)
            if match:
                if current_section:
                    sections[current_section]['content'] = '\n'.join(current_content).strip()
                section_id = match.group(1)
                section_title = match.group(2).strip()
                sections[section_id] = {'title': section_title, 'content': ''}
                current_section = section_id
                current_content = []
            elif current_section:
                current_content.append(line)
        if current_section:
            sections[current_section]['content'] = '\n'.join(current_content).strip()
        return sections

    def process_book(self, pdf_path: str, book_name: str = ''):
        if not book_name:
            book_name = Path(pdf_path).stem
        print(f"Processing: {book_name}...")
        text = self.extract_text_from_pdf(pdf_path)
        if not text:
            print(f"  Warning: No text extracted from {book_name}")
            return
        sections = self.parse_sections(text)
        self.books[book_name] = sections
        print(f"  Found {len(sections)} sections")

    def build_index(self):
        print("\nBuilding index...")
        for book_name, sections in self.books.items():
            for section_id, section_data in sections.items():
                full_text = f"{section_data['title']} {section_data['content']}"
                words = re.findall(r'\b[a-zA-Z]{3,}\b', full_text.lower())
                for word in set(words):
                    stem = self.stemmer.stem(word)
                    self.stem_lookup[word] = stem
                    if section_id not in self.index[stem][book_name]:
                        self.index[stem][book_name].append(section_id)
        print(f"Index built with {len(self.index)} stemmed keywords")

    def print_section_hierarchy(self, book_name: str = ""):
        """
        Print all sections and subsections in order, showing hierarchy levels.
        If book_name is provided, prints only that book; otherwise prints all books.
        """
        if not self.books:
            print("No books processed yet.")
            return

        # Choose which books to print
        books_to_print = {book_name: self.books[book_name]} if book_name else self.books

        for bname, sections in books_to_print.items():
            print(f"\n📘 {bname}")
            print("=" * (len(bname) + 4))

            # Sort section IDs naturally (1, 1.1, 1.2, 2, 2.1, etc.)
            sorted_sections = sorted(
                sections.keys(),
                key=lambda x: [int(n) for n in x.split(".")]
            )

            for sid in sorted_sections:
                title = sections[sid]["title"]
                level = sid.count(".")  # indent by depth
                indent = "   " * level
                print(f"{indent}{sid}  {title}")

            print("\n")

    def save_index(self, output_path: Path):
        """Save the index as a .pkl (binary) and .json (summary)"""
        output_path.parent.mkdir(parents=True, exist_ok=True)

        pkl_path = output_path.with_suffix(".pkl")
        json_path = output_path.with_suffix(".json")

        with open(pkl_path, "wb") as f:
            pickle.dump({
                "books": self.books,
                "index": dict(self.index),
                "stem_lookup": self.stem_lookup
            }, f)
        print(f"✅ Saved binary index → {pkl_path.name}")

        # Create a summary JSON
        json_summary = {
            "books": list(self.books.keys()),
            "keywords_count": len(self.index),
            "total_sections": sum(len(b) for b in self.books.values())
        }
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(json_summary, f, indent=2)
        print(f"📄 Saved summary → {json_path.name}")
        
        
    def load_index(self, pkl_path: str):
        """Load an existing index (.pkl file)"""
        with open(pkl_path, "rb") as f:
            data = pickle.load(f)
            self.books = data["books"]
            self.index = defaultdict(lambda: defaultdict(list), data["index"])
            self.stem_lookup = data["stem_lookup"]

    def search(self, query: str, max_results: int = 5):
        """Search across this single index"""
        query_words = query.lower().split()
        results = defaultdict(list)

        for word in query_words:
            stem = self.stemmer.stem(word)
            # Find fuzzy matches among stems
            possible_stems = difflib.get_close_matches(stem, self.index.keys(), n=3, cutoff=0.7)
            for ps in possible_stems:
                for book_name, section_ids in self.index[ps].items():
                    for sid in section_ids:
                        title = self.books[book_name][sid]["title"]
                        snippet = self.books[book_name][sid]["content"][:200].replace('\n', ' ')
                        results[f"{book_name} - {sid} {title}"].append(snippet)

        # Format results
        formatted = []
        for key, snippets in results.items():
            formatted.append({
                "section": key,
                "snippets": snippets[:max_results]
            })
        return formatted

    
    def _find_similar_keywords(self, word: str, cutoff: float = 0.8) -> List[str]:
        """Return fuzzy-matched stems for the given word."""
        stem = self.stemmer.stem(word)
        return difflib.get_close_matches(stem, list(self.index.keys()), n=5, cutoff=cutoff)

    
    def search2(self, query: str, match_all: bool = False, fuzzy: bool = True) -> Dict[str, List[str]]:
        """
        Enhanced search:
          - Multi-word queries
          - Optional fuzzy matching
          - Optional AND logic (match_all=True)
        """
        words = re.findall(r'\b[a-zA-Z]{3,}\b', query.lower())
        all_results = defaultdict(set)

        for word in words:
            stems_to_search = [self.stemmer.stem(word)]
            
            if fuzzy:
                stems_to_search.extend(self._find_similar_keywords(word))

            word_results = defaultdict(set)
            for stem in stems_to_search:
                for book, sections in self.index.get(stem, {}).items():
                    word_results[book].update(sections)


            if not all_results:
                all_results = word_results
                
            
            else:
                # Merge results
                for book in list(all_results.keys()):
                    if match_all:
                        all_results[book] &= word_results.get(book, set())  # AND
                    else:
                        all_results[book] |= word_results.get(book, set())  # OR

        # Convert sets to sorted lists
        data =  {b: sorted(list(s)) for b, s in all_results.items() if s}
        print(len(data["book1"]))
        print(data["book1"])
        return data

    def display_search_results(self, query: str, **kwargs):
        results = self.search2(query, **kwargs)
        print(f"\n{'='*80}")
        print(f"Search Results for: '{query}'")
        print(f"{'='*80}\n")

        if not results:
            print("No results found.")
            return

        for book, sections in results.items():
            # print("Result",len(results))
            
            print(f"\n📘 {book}")
        #     for sid in sorted(sections, key=lambda x: [int(n) for n in x.split('.')]):
        #         title = self.books[book].get(sid, {}).get('title', 'Unknown')
        #         print(f"   • Section {sid}: {title}")
        # print(f"\n{'='*80}\n")
# ---------------------------
# 🧭 Main runner script
# ---------------------------
def main():
    if len(sys.argv) < 2:
        print("Usage: python pdf_indexer.py <folder_path>")
        sys.exit(1)

    folder_path = Path(sys.argv[1])
    if not folder_path.exists():
        print(f"Error: Folder '{folder_path}' not found.")
        sys.exit(1)

    pdf_files = list(folder_path.glob("*.pdf"))
    if not pdf_files:
        print("No PDF files found in the folder.")
        sys.exit(0)

    index_dir = folder_path / "index"
    index_dir.mkdir(exist_ok=True)

    for pdf_file in pdf_files:
        indexer = PDFBookIndexer()
        indexer.process_book(str(pdf_file))
        indexer.build_index()

        output_name = f"{pdf_file.stem}_index"
        output_path = index_dir / output_name
        indexer.save_index(output_path)

    print("\n🎉 All indexes created successfully!")



if __name__ == "__main__":
    main()
