import fitz  # PyMuPDF
import re
from collections import defaultdict

def extract_book_structure(pdf_path):
    doc = fitz.open(pdf_path)

    # Store extracted hierarchy
    structure = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))

    chapter, topic, subtopic = None, None, None

    for page_num, page in enumerate(doc, start=1): # type: ignore
        blocks = page.get_text("dict")["blocks"]
        for b in blocks:
            if "lines" not in b:
                continue
            for l in b["lines"]:
                for s in l["spans"]:
                    text = s["text"].strip()
                    if not text:
                        continue

                    # Detect Chapter headings
                    if re.match(r"^(Chapter\s+\d+|CHAPTER\s+\d+|\d+\s+[A-Z][a-z]+.*)$", text):
                        chapter = text
                        topic, subtopic = None, None
                        continue

                    # Detect Topics (e.g., 1.1 Introduction, 2.3 Methods)
                    if re.match(r"^\d+\.\d+\s+.+", text):
                        topic = text
                        subtopic = None
                        continue

                    # Detect Subtopics (e.g., 1.1.1 Details)
                    if re.match(r"^\d+\.\d+\.\d+\s+.+", text):
                        subtopic = text
                        continue

                    # Otherwise → it's content belonging to last detected section
                    if chapter:
                        if topic and subtopic:
                            structure[chapter][topic][subtopic].append(text)
                        elif topic:
                            structure[chapter][topic]["_content"].append(text)
                        else:
                            structure[chapter]["_content"]["_content"].append(text)

    return structure


# Example usage:
if __name__ == "__main__":
    pdf_file = "./Data/Prince2.pdf"  # replace with actual path
    book_structure = extract_book_structure(pdf_file)

    # Pretty print the structure
    for ch, topics in book_structure.items():
        print(f"\n📘 {ch}")
        for tp, subs in topics.items():
            if tp != "_content":
                print(f"   📖 {tp}")
            for st, content in subs.items():
                if st != "_content":
                    print(f"      🔹 {st}")
                # Show preview of content
                preview = " ".join(content)[:120]
                print(f"         ➡ {preview}...")
