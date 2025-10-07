import sys
import json
from pathlib import Path
from create_index import PDFBookIndexer

def main():
    if len(sys.argv) < 3:
        print("Usage: python pdf_index_loader.py <index_folder> <query>")
        sys.exit(1)

    index_folder = Path(sys.argv[1])
    query = " ".join(sys.argv[2:])

    if not index_folder.exists():
        print(f"❌ Folder '{index_folder}' not found.")
        sys.exit(1)

    pkl_files = list(index_folder.glob("*.pkl"))
    if not pkl_files:
        print("⚠️ No .pkl index files found.")
        sys.exit(0)

    print(f"🔍 Searching '{query}' across {len(pkl_files)} indexes...\n")

    all_results = {}

    for pkl_file in pkl_files:
        print(f"📖 Loading index → {pkl_file.name}")
        indexer = PDFBookIndexer()
        indexer.load_index(str(pkl_file))
        indexer.print_section_hierarchy()

        # sys.exit()
        # results = indexer.display_search_results(query, match_all=True)
        
        # # results = indexer.search(query)
        # print(len(results))
        # all_results[pkl_file.stem] = results

    # # Display results nicely
    # for index_name, result_list in all_results.items():
    #     print(f"\n=== Results from {index_name} ===")
    #     if not result_list:
    #         print("  No matches found.")
    #     else:
    #         for r in result_list:
    #             print(f"📘 {r['section']}")
    #             for snippet in r['snippets']:
    #                 print(f"   ↳ {snippet[:150]}...")
    #             print("")

    # # Optionally return as JSON
    # output_json = json.dumps(all_results, indent=2)
    # print("\n--- JSON Output ---\n")
    # print(output_json)

if __name__ == "__main__":
    main()