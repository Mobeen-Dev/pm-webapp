import os
import pickle
import sys
import json
from pathlib import Path
from create_index import PDFBookIndexer


def main():
    final_index_folder = os.path.join(os.getcwd(), "final_index")
    os.makedirs(final_index_folder, exist_ok=True)

    if len(sys.argv) < 3:
        print("Usage: python pdf_index_loader.py <index_folder> <query>")
        sys.exit(1)

    index_folder = Path(sys.argv[1])
    data_folder = Path(sys.argv[2])
    query = " ".join(sys.argv[3:])

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
        book_wise_result = {}

        file_name = str(pkl_file.name)
        base_name = file_name.split("_")[0]

        print(f"📖 Loading index → {pkl_file.name}")
        indexer = PDFBookIndexer()
        indexer.load_index(str(pkl_file))
                
        # Get hierarchy and all section IDs
        hierarchy_list = indexer.get_section_hierarchy_list()
        
        # section_ids = indexer.search2(query) 
        
        # Build Another Index
        section_ids = indexer.get_all_section_ids()

        match_data = indexer.match_sections(hierarchy_list, section_ids)
        # print(section_ids)
        file_name = base_name + ".pdf"
        pdf_path = os.path.join(data_folder, file_name)
        print(pdf_path)
        for section_id, data in match_data.items():
            page_number, title = indexer.find_section_page(pdf_path, data["title"])
            if page_number:
                book_wise_result[section_id] = {
                    "startText": title,
                    "PageNumber": int(page_number),
                }
        print(book_wise_result)
         # --- Save results ---
        output_pkl_path = os.path.join(final_index_folder, f"{base_name}_fileIndex.pkl")
        output_json_path = os.path.join(final_index_folder, f"{base_name}_fileIndex.json")
        
        print(f"💾 Saving: {output_pkl_path}")
        print(f"💾 Saving: {output_json_path}")
        
        # Save as Pickle
        with open(output_pkl_path, "wb") as pkl_out:
            pickle.dump(book_wise_result, pkl_out)

        # Save as JSON (human-readable)
        with open(output_json_path, "w", encoding="utf-8") as json_out:
            json.dump(book_wise_result, json_out, ensure_ascii=False, indent=4)
    

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
