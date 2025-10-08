import json
import os
import re
import os
import sys
import pathlib
import urllib.parse

def get_book_file_url():
    # Build absolute path from current working directory
    file_path = os.path.abspath(os.path.join(os.getcwd(), "../public/book"))
    
    # Convert the absolute path to a file:// URL
    file_url = pathlib.Path(file_path).as_uri()
    
    return file_url

# Example usage:
print(get_book_file_url())

sys.exit()

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
        labels = ["Chapter", "Section", "Subsection", "Sub-subsection", "Sub-sub-subsection"]
        readable = " ".join(
            f"{labels[i] if i < len(labels) else f'Level{i+1}'} {p}"
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

# Example input data
hierarchy = {
    "_book1": {
        "1.2": ["1.2"],
        "2": ["2"],
        "2.2": ["2.2.2", "2.2.4.4"],
        "2.3": ["2.3.6"],
        "2.5": ["2.5", "2.5.1", "2.5.8"],
        "2.8": ["2.8.5.4"],
        "3.4": ["3.4.3.4"],
        "3.5": ["3.5"],
        "3.6": ["3.6"],
        "4.1": ["4.1"],
        "4.2": ["4.2.6.2"],
        "4.4": ["4.4.3"],
        "4.5": ["4.5"],
        "4.6": ["4.6.9"],
    }
}

book_data = {
    "book1": [
        {
            "section_id": "1.2",
            "startText": "1.2 RELATIONSHIP OF THE PMBOK® GUIDE",
            "PageNumber": 2,
        },
        {
            "section_id": "2",
            "startText": "2 The Standard for Program Management – Fourth Edition and The Standard for Portfolio Management –",
            "PageNumber": 215,
        },
        {"section_id": "2.2.2", "startText": "2.2.2 PROJECT TEAM", "PageNumber": 18},
        {
            "section_id": "2.2.4.4",
            "startText": "2.2.4.4 Interpersonal",
            "PageNumber": 23,
        },
        {
            "section_id": "2.3.6",
            "startText": "2.3.6 ALIGNING OF DELIVERY CADENCE,",
            "PageNumber": 40,
        },
        {
            "section_id": "2.5",
            "startText": "2.5 PROJECT WORK PERFORMANCE",
            "PageNumber": 61,
        },
        {"section_id": "2.5.1", "startText": "2.5.1 PROJECT", "PageNumber": 62},
        {
            "section_id": "2.5.8",
            "startText": "2.5.8 LEARNING THROUGHOUT THE",
            "PageNumber": 68,
        },
        {"section_id": "2.8.5.4", "startText": "2.8.5.4 Risk", "PageNumber": 111},
        {
            "section_id": "3.4.3.4",
            "startText": "3.4.3.4 Implement Ongoing",
            "PageNumber": 124,
        },
        {
            "section_id": "3.5",
            "startText": "3.5 TAILORING THE PERFORMANCE",
            "PageNumber": 125,
        },
        {"section_id": "3.6", "startText": "3.6", "PageNumber": 40},
        {"section_id": "4.1", "startText": "4.1", "PageNumber": 21},
        {
            "section_id": "4.2.6.2",
            "startText": "4.2.6.2 Drexler/Sibbet Team Performance",
            "PageNumber": 144,
        },
        {"section_id": "4.4.3", "startText": "4.4.3 MEETINGS AND", "PageNumber": 155},
        {
            "section_id": "4.5",
            "startText": "4.5 METHODS APPLIED ACROSS",
            "PageNumber": 158,
        },
        {"section_id": "4.6.9", "startText": "4.6.9 OTHER", "PageNumber": 168},
    ]
}

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
                subsections.append({
                    "section": main_section,
                    "page": page,
                    "title": title
                })
        else:
            # CASE 2: Real child sections
            for sid in sub_ids:
                sub_data = section_lookup.get(sid)
                if sub_data:
                    subsections.append({
                        "section": sid,
                        "page": sub_data["PageNumber"],
                        "title": sub_data["startText"]
                    })
                else:
                    # Still include child reference if not in section_lookup (to prevent zero subsections)
                    subsections.append({
                        "section": sid,
                        "page": None,
                        "title": sid
                    })

        amt_sections.append({
            "id": idx,
            "number": main_section,
            "title": clean_section_title(title),
            "count": len(subsections),
            "subsections": subsections
        })

    return amt_sections


# Build and save
result = build_amt_structure(hierarchy["_book1"], book_data["book1"])

# os.makedirs("final_index", exist_ok=True)
with open("book1_amt.json", "w", encoding="utf-8") as f:
    json.dump({"sections": result}, f, ensure_ascii=False, indent=2)
    

print("✅ AMT structured JSON saved → final_index/book1_amt.json")
# file:///C:/ReactApps/pm-webapp/public/book3.pdf
# file:///C:/ReactApps/pm-webapp/public/book3.pdf