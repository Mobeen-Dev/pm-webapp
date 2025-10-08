import os
import pickle
import sys
import json
from pathlib import Path
from create_index import PDFBookIndexer
import json
import os
import re
import pathlib
import urllib.parse


def get_book_file_url():
    # Build absolute path from current working directory
    file_path = os.path.abspath(os.path.join(os.getcwd(), "../public/book"))

    # Convert the absolute path to a file:// URL
    file_url = pathlib.Path(file_path).as_uri()

    return file_url


def clean_section_title(raw_title: str) -> str:
    """
    Clean and format section titles based on numbering pattern.

    Rules:
    1. Remove leading numeric section identifiers like "1.", "2.3", etc.
    2. If title is number-only (e.g. "2.2.1"), convert to "Chapter 2 Section 2 Subsection 1".
    3. If long text after number, keep the first meaningful part for readability.
    """

    title = raw_title.strip()

    # --- CASE 3: Pure numeric sections like "2.2" or "2.2.1.3"
    if re.fullmatch(r"[\d.]+", title):
        parts = title.split(".")
        labels = [
            "Chapter",
            "Section",
            "Subsection",
            "Sub-subsection",
            "Sub-sub-subsection",
        ]
        readable = " ".join(
            f"{labels[i] if i < len(labels) else f'Level{i + 1}'} {p}"
            for i, p in enumerate(parts)
        )
        return readable

    # --- Remove starting numbering (CASE 1 & 2)
    cleaned = re.sub(r"^[\d.]+\s+", "", title).strip()

    # --- If it’s a long name with “–” or “and” etc, shorten it (CASE 2)
    # Keep text before first "–" or before "and"
    if "–" in cleaned:
        cleaned = cleaned.split("–")[0].strip()
    elif "—" in cleaned:
        cleaned = cleaned.split("—")[0].strip()
    elif " and " in cleaned.lower():
        cleaned = cleaned.split(" and ")[0].strip()

    # Capitalize first letter properly if needed
    cleaned = cleaned[0].upper() + cleaned[1:] if cleaned else cleaned

    return cleaned


def build_amt_structure(hierarchy_dict, book_sections):
    amt_sections = []
    section_lookup = {item["section_id"]: item for item in book_sections}

    for idx, (main_section, sub_ids) in enumerate(hierarchy_dict.items(), start=1):
        main_data = section_lookup.get(main_section)
        title = main_data["startText"] if main_data else main_section
        page = main_data["PageNumber"] if main_data else None

        subsections = []

        # CASE 1: Single self-reference
        if len(sub_ids) == 1 and sub_ids[0] == main_section:
            if main_data:
                subsections.append(
                    {"section": main_section, "page": page, "title": title}
                )
        else:
            # CASE 2: Real child sections
            for sid in sub_ids:
                sub_data = section_lookup.get(sid)
                if sub_data:
                    subsections.append(
                        {
                            "section": sid,
                            "page": sub_data["PageNumber"],
                            "title": sub_data["startText"],
                        }
                    )
                else:
                    # Still include child reference if not in section_lookup (to prevent zero subsections)
                    subsections.append({"section": sid, "page": None, "title": sid})

        amt_sections.append(
            {
                "id": idx,
                "number": main_section,
                "title": clean_section_title(title),
                "count": len(subsections),
                "subsections": subsections,
            }
        )

    return amt_sections


path = get_book_file_url()
stucture: dict[str, dict] = {
    "PMBook": {
        "name": "PMBOK Guide",
        "icon": "BookOpen",
        "color": "indigo",
    },
    "PRINCE2": {
        "name": "PRINCE 2",
        "icon": "FileText",
        "color": "cyan",
    },
    "ISO": {
        "name": "ISO",
        "icon": "BookOpen",
        "color": "purple",
    },
    # "Path": {"route": path},
}


def main(query: str, strict_mode: bool):
    # if len(sys.argv) < 3:
    #     print("Usage: python pdf_index_loader.py <index_folder> <query>")
    #     sys.exit(1)

    index_folder = Path("./Data/index")
    final_index_folder = Path("./Data/final_index")
    # query = " ".join(sys.argv[3:])

    if not index_folder.exists():
        print(f"❌ Folder '{index_folder}' not found.")
        sys.exit(1)

    pkl_files = sorted(index_folder.glob("*.pkl"), key=lambda x: x.name.lower())
    if not pkl_files:
        print("⚠️ No .pkl index files found.")
        sys.exit(0)

    print(f"🔍 Searching '{query}' across {len(pkl_files)} indexes...\n")

    for index, pkl_file in enumerate(pkl_files):
        file_name = str(pkl_file.name)
        base_name = file_name.split("_")[0]
        print("BASE NAME ",base_name)
        print(f"📖 Loading index → {pkl_file.name}")
        indexer = PDFBookIndexer()
        indexer.load_index(str(pkl_file))

        section_ids = indexer.search2(query, match_all=strict_mode)
        # print(section_ids)
        section_ids = section_ids.get(base_name, None)
        if not section_ids:
            if index == 0:
                stucture["PMBook"]["sections"] = []
            elif index == 1:
                stucture["PRINCE2"]["sections"] = []
            elif index == 2:
                stucture["ISO"]["sections"] = []
            continue
        hierarchy_sections = indexer.return_hierarchy(section_ids)
        final_index_path = final_index_folder / f"{base_name}_fileIndex.pkl"

        final_index = None
        with open(final_index_path, "rb") as f:
            final_index = pickle.load(f)

        # Build list of dicts for matched section IDs
        buffer:int = 0
        if base_name == "book1":
            buffer = 80
        if base_name == "book3":
            buffer = 1
        results = [
            {
                "section_id": sid,
                "startText": final_index.get(sid, {}).get("startText", "Not Found"),
                "PageNumber": buffer+int(final_index.get(sid, {}).get("PageNumber", 1)),
            }
            for sid in section_ids
        ]

        # Build and save
        result = build_amt_structure(hierarchy_sections, results)

        if index == 0:
            stucture["PMBook"]["sections"] = result
        elif index == 1:
            stucture["PRINCE2"]["sections"] = result
        elif index == 2:
            stucture["ISO"]["sections"] = result
        # # os.makedirs("final_index", exist_ok=True)
        # with open(f"{base_name}_amt.json", "w", encoding="utf-8") as f:
        #     json.dump({"sections": result}, f, ensure_ascii=False, indent=2)

        print(f"✅ AMT structured JSON saved → final_index/{base_name}_amt.json")

        # function which will use section_ids list into [{where key = id[i] and : value = pkl load respective using filename and value againsta that key}]

    return stucture

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
    main("success", True)
