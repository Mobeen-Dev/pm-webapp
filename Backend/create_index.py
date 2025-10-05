import re
import sys
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Tuple
import PyPDF2


class PDFBookIndexer:
    """
    Creates a searchable index of PDF books organized by sections.
    """
    
    def __init__(self):
        self.books = {}  # {book_name: {section_id: {title, content}}}
        self.index = defaultdict(lambda: defaultdict(list))  # {keyword: {book: [sections]}}
        
    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract text content from a PDF file."""
        try:
            with open(pdf_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"
                return text
        except Exception as e:
            print(f"Error reading {pdf_path}: {e}")
            return ""
    
    def parse_sections(self, text: str) -> Dict[str, Dict[str, str]]:
        """
        Parse text into sections based on numbered headings.
        Handles patterns like: 1, 1.1, 1.1.1, etc.
        """
        sections = {}
        
        # Pattern to match section headings: number(s) followed by title
        # Matches: "1 TITLE", "1.1 Title", "1.1.1 Title", etc.
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
                # Save previous section
                if current_section:
                    sections[current_section] = {
                        'title': sections[current_section]['title'],
                        'content': '\n'.join(current_content).strip()
                    }
                
                # Start new section
                section_id = match.group(1)
                section_title = match.group(2).strip()
                current_section = section_id
                sections[current_section] = {
                    'title': section_title,
                    'content': ''
                }
                current_content = []
            elif current_section:
                # Add to current section content
                current_content.append(line)
        
        # Save last section
        if current_section:
            sections[current_section] = {
                'title': sections[current_section]['title'],
                'content': '\n'.join(current_content).strip()
            }
        
        return sections
    
    def process_book(self, pdf_path: str, book_name: str = ''):
        """Process a PDF book and extract sections."""
        if book_name is None:
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
        """Build searchable index from all books."""
        print("\nBuilding index...")
        
        for book_name, sections in self.books.items():
            for section_id, section_data in sections.items():
                # Combine title and content for indexing
                full_text = f"{section_data['title']} {section_data['content']}"
                
                # Extract keywords (words with 3+ characters, lowercase)
                words = re.findall(r'\b[a-zA-Z]{3,}\b', full_text.lower())
                
                # Add to index
                for word in set(words):  # Use set to avoid duplicates
                    if section_id not in self.index[word][book_name]:
                        self.index[word][book_name].append(section_id)
        
        print(f"Index built with {len(self.index)} unique keywords")
    
    def search(self, keyword: str) -> Dict[str, List[str]]:
        """
        Search for a keyword and return sections containing it.
        Returns: {book_name: [section_ids]}
        """
        keyword = keyword.lower()
        return dict(self.index.get(keyword, {}))
    
    def display_search_results(self, keyword: str):
        """Display search results in a readable format."""
        results = self.search(keyword)
        
        print(f"\n{'='*80}")
        print(f"Search Results for: '{keyword}'")
        print(f"{'='*80}\n")
        
        if not results:
            print("No results found.")
            return
        
        for book_name, section_ids in results.items():
            print(f"\n📚 Book: {book_name}")
            print(f"   Found in {len(section_ids)} section(s):\n")
            
            # Sort section IDs naturally (1, 1.1, 1.2, 2, 2.1, etc.)
            sorted_sections = sorted(section_ids, key=lambda x: [int(n) for n in x.split('.')])
            
            for section_id in sorted_sections:
                section_data = self.books[book_name].get(section_id, {})
                title = section_data.get('title', 'Unknown')
                print(f"   • Section {section_id}: {title}")
        
        print(f"\n{'='*80}\n")
    
    def get_section_content(self, book_name: str, section_id: str) -> str:
        """Retrieve the full content of a specific section."""
        if book_name not in self.books:
            return f"Book '{book_name}' not found."
        
        if section_id not in self.books[book_name]:
            return f"Section '{section_id}' not found in '{book_name}'."
        
        section_data = self.books[book_name][section_id]
        return f"Section {section_id}: {section_data['title']}\n\n{section_data['content']}"
    
    def list_all_sections(self, book_name: str = ''):
        """List all sections from a book or all books."""
        if book_name:
            if book_name not in self.books:
                print(f"Book '{book_name}' not found.")
                return
            books_to_list = {book_name: self.books[book_name]}
        else:
            books_to_list = self.books
        
        for bname, sections in books_to_list.items():
            print(f"\n📚 {bname}")
            print(f"{'='*60}")
            
            sorted_sections = sorted(sections.keys(), key=lambda x: [int(n) for n in x.split('.')])
            
            for section_id in sorted_sections:
                title = sections[section_id]['title']
                print(f"{section_id:8s} {title}")


def main():
    """Main execution function."""
    if len(sys.argv) < 2:
        print("Usage: python script.py <pdf_path1> <pdf_path2> ... [pdf_path4]")
        print("\nExample:")
        print("  python script.py book1.pdf book2.pdf book3.pdf book4.pdf")
        sys.exit(1)
    
    # Initialize indexer
    indexer = PDFBookIndexer()
    
    # Process all PDF files
    pdf_paths = sys.argv[1:]
    for pdf_path in pdf_paths:
        if not Path(pdf_path).exists():
            print(f"Warning: File not found: {pdf_path}")
            continue
        indexer.process_book(pdf_path)
    
    # Build the index
    indexer.build_index()
    
    # List all sections from all books
    print("\n" + "="*80)
    print("ALL SECTIONS")
    print("="*80)
    indexer.list_all_sections()
    
    # Interactive search
    print("\n" + "="*80)
    print("INTERACTIVE SEARCH")
    print("="*80)
    print("Enter keywords to search (or 'quit' to exit)")
    print("Commands:")
    print("  - Type a keyword to search")
    print("  - 'list <book_name>' to list sections")
    print("  - 'content <book_name> <section_id>' to view section content")
    print("  - 'quit' to exit\n")
    
    while True:
        try:
            query = input("Search> ").strip()
            
            if not query:
                continue
            
            if query.lower() == 'quit':
                print("Goodbye!")
                break
            
            if query.lower().startswith('list'):
                parts = query.split(maxsplit=1)
                book_name = parts[1] if len(parts) > 1 else ''
                indexer.list_all_sections(book_name)
            
            elif query.lower().startswith('content'):
                parts = query.split()
                if len(parts) >= 3:
                    book_name = parts[1]
                    section_id = parts[2]
                    print("\n" + indexer.get_section_content(book_name, section_id))
                else:
                    print("Usage: content <book_name> <section_id>")
            
            else:
                indexer.display_search_results(query)
        
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"Error: {e}")


if __name__ == "__main__":
    main()