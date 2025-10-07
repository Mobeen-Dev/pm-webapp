import fitz  # PyMuPDF
import sys
import fitz  # PyMuPDF

def find_section_page(pdf_path: str, section_title: str, skip_pages: int = 0):
    """
    Locate the page number where a section header appears in a PDF.
    If not found, progressively shortens the search text (from right, then from left).

    Args:
        pdf_path (str): Path to the PDF file.
        section_title (str): Full section title, e.g. '6.2.1 The three project interests'.
        skip_pages (int): Number of pages to skip from the beginning (default: 0).

    Returns:
        int or None: The page number (1-indexed) where the section appears, or None if not found.
    """
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    print(f"🔍 Searching for '{section_title}' (skipping first {skip_pages} of {total_pages} pages)...")

    def search_in_pdf(search_text):
        """Search PDF for given text (case-insensitive)."""
        for page_num, page in enumerate(doc, start=1): # type: ignore
            if page_num <= skip_pages:
                continue
            text = page.get_text("text").lower()
            if search_text.lower() in text:
                print(f"✅ Found '{search_text}' on page {page_num}")
                return page_num
        return None

    # Initial direct search
    page_found = search_in_pdf(section_title)
    if page_found:
        return page_found, section_title

    # Split into words for gradual shrinking
    words = section_title.split()
    if len(words) <= 1:
        print("⚠️ Not enough words to shrink search.")
        return None, ''

    # Try shrinking from the right side first
    for i in range(len(words) - 1, 0, -1):
        shrunk_text = " ".join(words[:i])
        print(f"🔎 Retrying with shorter text (right-trim): '{shrunk_text}'")
        page_found = search_in_pdf(shrunk_text)
        if page_found:
            return page_found, shrunk_text

    # If still not found, try skipping the first word (left-trim)
    for i in range(1, len(words)):
        shrunk_text = " ".join(words[i:])
        print(f"🔎 Retrying with shorter text (left-trim): '{shrunk_text}'")
        page_found = search_in_pdf(shrunk_text)
        if page_found:
            return page_found, shrunk_text

    print(f"❌ Could not find '{section_title}' or any shortened version in the PDF.")
    return None, ''



# -----------------------------
# Example usage
# -----------------------------
section_title = "4.3.2  Project asdkl asdf log123"
pdf_path = "./Data/book2.pdf"  # Replace with your actual PDF path

page = find_section_page(pdf_path, section_title[:-2])
print("📄 Page number:", page)
sys.exit()
# Search Index
section_ids = ['1', '1.7', '10.2.2', '10.3.1.1', '10.4.5', '11.1', '11.2.3', '11.2.4', '11.2.5', '11.2.6.2', '11.2.7', '11.3.1', '11.3.1.1', '11.3.1.2', '11.3.1.4', '11.3.2.2', '11.4.5', '11.6', '120', '1257.7', '15.4.2', '1509.2.1', '17.7', '18.7', '18711.2', '19.7', '2.2', '20311.4.4', '20411.5', '23714.7', '24915.7', '26016.7', '3.4', '303', '311', '312', '363.2.2', '54', '6.2.4.6', '635.3.1.3', '7.3.3.2', '8.3.1.1.2', '8.4.3.2', '8.4.5', '9.3.2', '9.3.2.2', '9.3.2.6']
hierarchy_list = ['1  High-Le vel Requir ements Gathering Complete', '1.1  Introduction', '1.1.1  Purpose of this book', '1.1.1.1  Specialist aspects of project work', '1.1.1.2  Detailed project management techniques', '1.2  Structure of the official book', '1.3  What is a project?', '1.4  What is project management?', '1.5  The project context', '1.5.2  Commercial context', '1.5.4  Sustainability context', '1.5.5  Scale', '1.6  Features and benefits of PRINCE2 12', '1.7  Example scenarios', '2  The scope of a plan is defined by the set of products to be delivered. Scope tolerance (if used) should be in the form of a note or reference to', '2.1  Ensure continued business justification', '2.2  Learn from experience', '2.3  Define roles, responsibilities, and relationships 24', '2.4  Manage by exception', '2.5  Manage by stages 27', '2.6  Focus on products', '2.7  Tailor to suit the project', '3  2 2', '3.1  Context', '3.2  Leading successful change', '3.2.1  Projects require change management', '3.2.3  Culture', '3.3  Leading successful teams 39', '3.3.1  Leading across organizational boundaries', '3.3.2  Building effective teams', '3.3.3  Bringing the team together', '3.4  Communication', '3.5  People are central to the method', '3.5.2  People and PRINCE2 practices', '4  More specific stage level sustainability tolerances may be set by the project board when authorizing a stage or by the project manager when', '4.1  The PRINCE2 practices', '4.2  Applying the practices', '4.3  Management products', '4.3.1  Project initiation documentation', '4.3.2  Project log', '4.4  Format of the practice chapters', '5  Business case 55', '5.1  Purpose', '5.2  Guidance for effective business case management 58', '5.2.1  Business case lifecycle', '5.2.2  Aligning products to business objectives and', '5.2.3  Establishing business justification', '5.3  Techniques', '5.3.1  PRINCE2 technique for business case management', '5.3.1.1  Develop', '5.3.1.2  Check', '5.3.1.4  Confirm', '5.3.2.1  Investment appraisal', '5.3.2.3  Best, expected, and worst-case scenarios for benefits', '5.4  Applying the practice', '5.4.1  Organizational context', '5.4.2  Commercial context', '5.4.3  Delivery method', '5.4.4  Sustainability', '5.4.5  Scale', '5.5  Management products to support the practice 68', '5.6  Focus of key roles for the practice 71', '5.7  Key relationships with principles', '6  ●Unique   Every project is unique. An organization may undertake many similar projects and establish', '6.1  Purpose', '6.2  Guidance for effective organizing', '6.2.1  The three project interests', '6.2.2  Organizational levels', '6.2.3  Project management team structure', '6.2.4  PRINCE2 roles', '6.2.4.2  Senior user', '6.2.4.3  Senior supplier', '6.2.4.4  Project board', '6.2.4.5  Project manager', '6.2.4.6  Team manager', '6.2.4.7  Project assurance', '6.2.4.8  Project support', '6.3  Techniques', '6.3.1  PRINCE2 technique for organizational design and', '6.3.1.2  Design the project ecosystem', '6.3.1.3  Develop the project ecosystem', '6.3.1.5  Transition the project into the organizational ecosystem', '6.3.2  Supporting techniques', '6.3.2.1  Delivery models', '6.3.2.2  RACI chart', '6.4  Applying the practice', '6.4.1  Organizational context', '6.4.2  Commercial context', '6.4.3  Delivery method', '6.4.5  Scale', '6.5  Management products to support the', '6.6  Focus of key roles for the practice', '6.7  Key relationships with principles 95', '7  .3.3  Supporting techniques', '7.1  Purpose', '7.1.1  Plans enable understanding and communication', '7.1.2  Plans enable control', '7.2  Guidance for effective planning', '7.2.1  Planning horizon', '7.2.2.1  Project plan', '7.2.2.2  Stage plan', '7.2.2.4  Exception plan', '7.2.3.2  The length of stages', '7.2.4  Tolerances in planning', '7.3  Techniques 107', '7.3.3.1  Prioritizing', '7.3.3.2  Scheduling', '7.4  Applying the practice  118', '7.4.1  Organizational context', '7.4.2  Commercial context', '7.4.3  Delivery method', '7.4.4  Sustainability', '7.4.5  Scale', '7.5  Management products to support the practice 121', '7.6  Focus of key roles for the practice 124', '7.7  Key relationships with principles 125', '8  Quality 127', '8.1  Purpose', '8.1.2  Product-based quality', '8.2  Guidance for effective quality management', '8.2.1  Quality planning', '8.2.1.1  User’s quality expectations', '8.2.1.3  Describing products', '8.2.1.4  Product sustainability', '8.2.1.5  Quality responsibilities', '8.2.1.6  Quality in subordinate plans', '8.2.2  Quality control', '8.3  Techniques', '8.3.1  PRINCE2 techniques for quality management', '8.3.1.1  Planning quality', '8.3.1.1.1  Gathering user inputs', '8.3.1.1.2  Creating product descriptions', '8.3.1.1.3  Describing the quality management approach', '8.3.1.2  Controlling quality', '8.3.1.3  Accepting products', '8.4  Applying the practice  140', '8.4.1  Organizational context', '8.4.2  Commercial context', '8.4.3.1  Linear-sequential projects', '8.4.3.2  Iterative-incremental projects', '8.4.4  Sustainability', '8.4.5  Scale', '8.5  Management products to support the practice 143', '8.6  Focus of key roles for the practice', '8.7  Key relationships with principles', '9  Risk 147', '9.1  Purpose', '9.2  Guidance for effective risk management', '9.2.2  Risk analysis', '9.2.3  Risk control', '9.2.3.1  Risk responses', '9.2.3.2  Risk owners and risk action owners', '9.2.3.3  Risk budget', '9.2.4  Risk culture', '9.3  Techniques 155', '9.3.1  PRINCE2 technique for risk management', '9.3.1.1  Identify', '9.3.1.1.1  Define context and objectives', '9.3.1.1.2  Identify threats and opportunities', '9.3.1.2  Assess', '9.3.1.2.1  Prioritize risks', '9.3.1.2.2  Assess combined risk profile', '9.3.1.4  Implement', '9.3.1.5  Communicate', '9.3.2  Supporting techniques', '9.3.2.1  Cause and effect diagrams', '9.3.2.2  Horizon scanning/PESTLE/SWOT analysis', '9.3.2.3  Prompt lists', '9.3.2.4  Pre-mortem', '9.3.2.6  Use of data', '9.4  Applying the practice', '9.4.1  Organizational context', '9.4.3  Delivery method', '9.4.4  Sustainability', '9.5  Management products to support the', '9.6  Focus of key roles for the practice 164', '9.7  Key relationships with principles 165', '10  74', '10.1  Purpose', '10.2  Guidance for effective issue management', '10.2.1  Baselines', '10.2.2  Issue resolution', '10.2.5  Change budget', '10.3  Techniques', '10.3.1  PRINCE2 Technique for issue management', '10.3.1.1  Capturing issues', '10.3.1.3  Recommending resolution', '10.3.1.4  Deciding on changes', '10.3.1.5  Implementing changes', '10.4  Applying the practice', '10.4.1  Organizational context', '10.4.2  Commercial context', '10.4.3  Delivery method', '10.4.3.1  Linear-sequential projects', '10.4.4  Sustainability', '10.4.5  Scale', '10.5  Management products to support the', '10.6  Focus of key roles for the practice', '10.7  Key relationships with principles', '11  Progress 185', '11.1  Purpose', '11.2  Guidance for effective progress management 187', '11.2.1  Management levels and tolerances for progress', '11.2.2  Types of control', '11.2.3  Reviewing progress and lessons', '11.2.4  Reporting progress and lessons', '11.2.5  Forecasting', '11.2.6  Escalating', '11.2.6.1  Work package level exceptions', '11.2.6.2  Stage level exceptions', '11.2.6.3  Project level exceptions', '11.2.7  Use of data and systems in progress management', '11.3  Techniques: progress management  196', '11.3.1  PRINCE2 technique for exception management', '11.3.1.1  Step 1From the work package data, the team manager forecasts that one or more of the products in the work', '11.3.1.2  Step 2If the issue will affect the stage (or project) tolerances to the point that they are forecast to be breached,', '11.3.1.3  Step 3The project board or project executive have several options that they could take. They may:', '11.3.1.4  Step 4', '11.3.1.5  Step 5The project board or project executive will assess the exception plan and may take a number of options.', '11.3.1.6  Step 6', '11.3.2.1  Dashboards', '11.3.2.2  Daily stand-ups', '11.3.2.4  Peer review', '11.3.2.5  Burn charts', '11.3.2.7  Kanban board', '11.4  Applying the progress practice  202', '11.4.1  Organizational context', '11.4.2  Commercial context', '11.4.3  Delivery method', '11.4.5  Scale', '11.5  Management products to support the practice 204', '11.6  Focus of key roles for the practice', '11.7  Key relationships with principles 211', '12  43 5', '12.1  The PRINCE2 journey 215', '12.1.1  Pre-project', '12.1.2  Initiation stage', '12.1.3  Subsequent stages', '12.1.5  Post-project', '12.2  The PRINCE2 process model', '12.3  Format of the process chapters', '13  14 15 16 172', '13.1  Purpose', '13.2  Objectives', '13.3  Context 221', '13.4  Activities', '13.4.1  Appoint the project executive and project', '13.4.3  Prepare the outline business case', '13.4.4  Appoint the project management team', '13.4.5  Select the project approach', '13.4.6  Assemble the project brief', '13.4.7  Plan the initiation stage', '13.4.8  Request project initiation', '13.5  Applying the process', '13.5.1  General considerations', '13.5.2  Tailoring roles in starting up a project', '13.6  Responsibilities', '13.7  Application of the practices to this process 227', '14  Directing a project 229', '14.1  Purpose', '14.2  Objectives', '14.3  Context', '14.4  Activities', '14.4.1  Authorize initiation', '14.4.2  Authorize the project', '14.4.5  Authorize project closure', '14.5  Applying the process', '14.6  Responsibilities', '14.7  Application of the practices to this process 237', '15  Initiating a project 239', '15.1  Purpose', '15.2  Objectives', '15.3  Context 241', '15.4  Activities', '15.4.1  Agree tailoring requirements', '15.4.2  Agree the management approaches', '15.4.3  Establish project controls', '15.4.5  Prepare the full business case', '15.4.6  Assemble the project initiation documentation', '15.4.7  Request project authorization', '15.5  Applying the process', '15.5.1  General considerations', '15.5.2  Tailoring roles in initiating a project', '15.6  Responsibilities', '15.7  Application of the practices to this process 249Managing Successful Projects with PRINCE2', '16.1  Purpose', '16.2  Objectives', '16.3  Context 253', '16.4  Activities', '16.4.1  Authorize a work package', '16.4.2  Evaluate work package status', '16.4.4  Evaluate stage status', '16.4.5  Capture issues and risks', '16.4.6  Take corrective action', '16.4.7  Escalate issues and risks', '16.4.8  Report highlights', '16.5  Applying the process 259', '16.5.1  General considerations', '16.5.2  Tailoring roles in controlling a stage', '16.6  Responsibilities', '16.7  Application of the practices to this process 260', '17  Managing product delivery 261', '17.1  Purpose', '17.2  Objectives', '17.3  Context 263', '17.4  Activities', '17.4.1  Accept a work package', '17.4.3  Evaluate a work package', '17.4.4  Notify work package completion', '17.5  Applying the process 266', '17.5.1  General considerations', '17.5.2  Tailoring roles in managing product delivery', '17.6  Responsibilities', '17.7  Application of the practices to this process', '18  Managing a stage boundary 269', '18.1  Purpose', '18.2  Objectives', '18.3  Context 271', '18.4  Activities', '18.4.1  Prepare the next stage plan', '18.4.2  Prepare the exception plan (if required)', '18.4.3  Update the project plan', '18.4.4  Update the business case', '18.4.5  Evaluate the stage', '18.4.6  Request the next stage', '18.5  Applying the process', '18.5.1  General considerations', '18.5.2  Tailoring roles in managing a stage boundary', '18.6  Responsibilities', '18.7  Application of the practices to this process', '19  Closing a project 277', '19.1  Purpose', '19.2  Objectives', '19.3  Context  279', '19.4  Activities', '19.4.1  Prepare planned closure', '19.4.3  Confirm project acceptance', '19.4.4  Evaluate the project', '19.4.5  Request project closure', '19.5  Applying the process 283', '19.5.1  General considerations', '19.5.2  Tailoring roles in closing a project', '19.6  Responsibilities', '19.7  Application of the practices to this process', '53  1', '54  ●lessons log', '78  Team membersBusiness layer', '81  ●ensuring decisions are being made in line with the project board guidance and tolerances', '81.5.1  Organizational context', '89  ●reports and reviews are efficient, such as in projects within a programme that have common project', '99  ●The when the sequence and estimated duration of delivery activities', '101.5.3  Delivery method', '116  ●budgets', '120  ●determining the length of releases or timeboxes and defining these as stages', '121  ●Duration  The longer a project’s lifecycle, the more likely that project plans will need to adapt to', '121.6  Features and benefits of PRINCE2', '131  ●eliciting user requirements and detailing them in terms of quality specifications in product', '170  ●How products and their versions are identified', '225  ●Review the project management team structure and role descriptions to identify any additional roles', '236  ●Confirm the updated business case by comparing the actual and forecast benefits, costs, and risks', '242.3  Define roles, responsibilities, and relationships', '243  ●Consult with project assurance to check that any proposed tailoring will meet the needs of the', '246  ●Consult with project assurance to check that the proposed project plan meets the needs of the', '272.5  Manage by stages', '275  ●Review the lessons logged to date and include them in the end stage report. This is particularly', '303  ●Probability   an estimate of how likely it is for the risk event to occur', '309  ●Check and monitor the business case against external events and project progress.', '310  ●Ensure that risks associated with the business case are identified, assessed, and controlled. Make', '311  ●Monitor progress against stage plans. Review the impact of issues and risks on the continued', '312  ●Provide administrative support for quality controls, risk controls, change management activities,', '363.2.2  Stakeholders', '393.3  Leading successful teams', '463.5.1  People and PRINCE2 principles', '483.5.3  People and PRINCE2 processes', '585.2  Guidance for effective business case', '635.3.1.3  Maintain', '645.3.2  Supporting techniques', '655.3.2.2  Multi-case model', '685.5  Management products to support the', '715.6  Focus of key roles for the practice', '796.2.4.1  Project executive', '836.2.5  Work breakdown structure', '846.3.1.1  Understand the organizational ecosystem', '866.3.1.4  Manage the ongoing changes to the project ecosystem', '916.4.4  Sustainability', '956.7  Key relationships with principles', '1017.2.2  Levels of plans', '1037.2.2.3  Team plan', '1077.2.5  Product-based planning', '1107.3.2.2  Creating a product breakdown structure', '1157.3.2.8  Preparing the budget', '1187.4  Applying the practice', '1247.6  Focus of key roles for the practice', '1257.7  Key relationships with principles', '1298.1.1  Key quality terminology', '1328.2.1.2  Quality tolerances', '1358.2.3  Quality assurance', '1398.3.2  Supporting techniques', '1408.4  Applying the practice', '1418.4.3  Delivery method', '1438.5  Management products to support the', '1509.2.1  Risk planning', '1559.3  Techniques', '1579.3.1.3  Plan', '1609.3.2.5  The Swiss cheese model', '1619.4.2  Commercial context', '1629.4.5  Scale', '1649.6  Focus of key roles for the practice', '1659.7  Key relationships with principles', '17210.2.3  Change control', '17310.2.4  Delegating authority for changes', '17510.3.1.2  Assessing issues', '17710.3.2  Supporting techniques', '17910.4.3.2  Iterative-incremental projects', '18711.2  Guidance for effective progress management', '19611.3  Techniques: progress management', '19811.3.2  Supporting techniques', '20011.3.2.3  Earned value management', '20111.3.2.6  Retrospectives', '20211.4  Applying the progress practice', '20311.4.4  Sustainability', '20411.5  Management products to support the', '21111.7  Key relationships with principles', '21512.1  The PRINCE2 journey', '21612.1.4  Final stage', '22113.3  Context', '22313.4.2  Assess previous lessons', '22713.7  Application of the practices to this process', '23414.4.3  Give ongoing direction', '23514.4.4  Authorize a stage or exception plan', '23714.7  Application of the practices to this process', '24115.3  Context', '24515.4.4  Prepare the project plan', '24915.7  Application of the practices to this process', '25316.3  Context', '25616.4.3  Receive completed work package', '25916.5  Applying the process', '26016.7  Application of the practices to this process', '26517.4.2  Execute a work package', '27118.3  Context', '27919.3  Context', '28119.4.2  Prepare premature closure', '28319.5  Applying the process']

def match_sections(hierarchy_list, section_ids):
    """
    Match section IDs to entries in the hierarchy list.
    Returns:
        dict[str, dict[str, int | str]] like:
        {
            "10.3.1.1": {
                "title": "10.3.1.1  Details",
                "index": 3
            }
        }
    """
    matches = {}

    for entry in hierarchy_list:
        # Split "1.1  Title" → ("1.1", "Title")
        parts = entry.split("  ", 1)
        if len(parts) < 2:
            continue
        sid, title = parts

        if sid in section_ids:
            matches[sid] = {
                "title": entry,
            }

    return matches

result = match_sections(hierarchy_list, section_ids)
print(result)







