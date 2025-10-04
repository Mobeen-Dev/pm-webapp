import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";

export default function BookComparison() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [searchParams] = useSearchParams();
  const requested_topic = searchParams.get("topic") || "Risk Management";
  const topics = {
    "Risk Management": [
      {
        book_id: 1,
        title: "PMBOK Guide",
        author: "PMI",
        color: "blue", // UI theme color
        overview:
          "Covers project management standards and guidelines with a structured approach to processes including risk management.",
        similarPoints: [
          {
            pageNo: 314,
            start_text: "Risk Management Plan", // ✅ full anchor phrase
            content:
              "Risk Management Plan – a component of the project plan describing how risk management activities will be structured and performed.",
          },
        ],
        distinctPoints: [],
      },
      {
        book_id: 2,
        title: "PRINCE2",
        author: "Axelos",
        color: "purple",
        overview:
          "Focuses on principles, themes, and processes for managing projects, with dedicated guidance for risk planning, analysis, and control.",
        similarPoints: [
          {
            pageNo: 169,
            start_text: "Risk planning", // ✅ from 9.2.1 heading
            content:
              "Risk planning – use of categories and techniques (PESTLE, SWOT) to identify and prioritize risks.",
          },
          {
            pageNo: 169,
            start_text: "Risk analysis", // ✅ from 9.2.2 heading
            content:
              "Risk analysis – qualitative and quantitative assessment methods such as probability, impact, and risk matrices.",
          },
          {
            pageNo: 170,
            start_text: "Risk control", // ✅ from 9.2.3 heading
            content:
              "Risk control – includes risk responses (avoid, reduce, transfer, share, accept), risk owners, and maintaining a risk budget.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 169,
            start_text: "Insufficient staffing", // ✅ first 2–3 words of example
            content:
              "Example: insufficient staffing capacity could delay training and extend project timelines.",
          },
          {
            pageNo: 169,
            start_text: "If allowable", // ✅ first words of example
            content:
              "Example: adding discount codes in regulatory renewal emails could generate additional revenue.",
          },
          {
            pageNo: 172,
            start_text: "Scenario: example of a combination", // ✅ first words of example
            content:
              "Security risk mitigation in construction projects with health & safety meetings, inspections, and indemnification clauses.",
          },
        ],
      },
      {
        book_id: 4,
        title: "ISO 21502",
        author: "ISO",
        color: "emerald",
        overview:
          "Provides international project management guidelines, emphasizing continuous risk identification, assessment, and control.",
        similarPoints: [
          {
            pageNo: 42,
            start_text: "Risk management", // ✅ first words
            content:
              "Risk management increases likelihood of achieving project objectives by integrating risk identification, assessment, treatment, and control.",
          },
          {
            pageNo: 43,
            start_text: "Identifying risk", // ✅ from identifying risk section
            content:
              "Risks are identified throughout the life cycle and documented in a risk register, with assigned owners.",
          },
          {
            pageNo: 43,
            start_text: "Assessing risk", // ✅ from assessing risk
            content:
              "Risk assessment considers probability, consequence, and proximity, and prioritizes risks for further action.",
          },
          {
            pageNo: 43,
            start_text: "Treating risk", // ✅ from treating risk section
            content:
              "Risk treatment options: accept, avoid, mitigate, transfer, use contingency, exploit, enhance.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 43,
            start_text: "7.8.5", // ✅ from controlling risk
            content:
              "Controlling risks ensures that negative impacts are minimized and positive impacts maximized, tracking whether responses are effective.",
          },
        ],
      },
    ],
    "Quality Management": [
      {
        book_id: 1,
        title: "PMBOK Guide",
        author: "PMI",
        color: "blue",
        overview:
          "PMBOK describes quality as fulfilling requirements through conformance to acceptance criteria and fitness for use, with multiple dimensions such as performance, reliability, and sustainability.",
        similarPoints: [
          {
            pageNo: 67,
            start_text: "Quality is", // ✅ from: "Quality is the degree to which..."
            content:
              "Defines quality as the degree to which inherent characteristics meet requirements.",
          },
          {
            pageNo: 68,
            start_text: "Project teams measure quality", // ✅ from: "Project teams measure quality..."
            content:
              "Teams measure quality using requirements, metrics, and acceptance criteria.",
          },
          {
            pageNo: 68,
            start_text: "The objective of quality activities is to", // ✅ from: "The objective of quality activities..."
            content:
              "Objective is to minimize waste and maximize probability of attaining outcomes.",
          },
          {
            pageNo: 69,
            start_text: "positive outcomes,", // ✅ from: "Project deliverables that are fit for purpose..."
            content:
              "Lists outcomes of attention to quality, such as minimal defects, faster delivery, and improved productivity.",
          },
        ],
        distinctPoints: [],
      },
      {
        book_id: 2,
        title: "PRINCE2",
        author: "Axelos",
        color: "purple",
        overview:
          "PRINCE2’s quality practice focuses on documenting user requirements, setting acceptance criteria, defining product descriptions, and applying systematic quality planning, control, and assurance.",
        similarPoints: [
          {
            pageNo: 147,
            start_text: "Quality is", // ✅ from: "Quality is concerned with ensuring..."
            content:
              "Ensures project products meet user requirements and expectations.",
          },
          {
            pageNo: 148,
            start_text: "Definition: User’s", // ✅ from: "Definition: User’s quality expectations"
            content:
              "Captures expected quality from the project product in the product description.",
          },
          {
            pageNo: 148,
            start_text: "Definition: Acceptance", // ✅ from: "Definition: Acceptance criteria"
            content:
              "Acceptance criteria are measurable conditions that must be met before user approval.",
          },
          {
            pageNo: 151,
            start_text: "8.2.1.3", // ✅ from: "Definition: Product description"
            content:
              "Defines purpose, format, composition, and quality specifications of a product.",
          },
          {
            pageNo: 154,
            start_text: "Definition: Quality", // ✅ from: "Definition: Quality assurance"
            content:
              "Systematic activity providing confidence that products meet defined quality specifications.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 158,
            start_text: "8.3.2", // ✅ from: "Verification: focuses on confirming..."
            content:
              "Verification checks interim products meet specifications before final product exists.",
          },
          {
            pageNo: 158,
            start_text: "Validation", // ✅ from: "Validation: focuses on confirming..."
            content:
              "Validation confirms the finished product meets quality specs during or after delivery.",
          },
          {
            pageNo: 158,
            start_text: "Prototyping", // ✅ from: "Prototyping: produces an interim product..."
            content:
              "Prototyping enables feedback on functionality and production concerns.",
          },
        ],
      },
      {
        book_id: 4,
        title: "ISO 21502",
        author: "ISO",
        color: "emerald",
        overview:
          "ISO 21502 emphasizes integrated quality management, covering planning, assurance, and control to ensure deliverables are fit for purpose and meet acceptance criteria.",
        similarPoints: [
          {
            pageNo: 45,
            start_text: "7.11.1", // ✅ from: "The purpose of quality management..."
            content:
              "Purpose of quality management is to increase likelihood outputs are fit for purpose.",
          },
          {
            pageNo: 46,
            start_text: "7.11.2", // ✅ from: "Planning quality should determine..."
            content:
              "Quality planning identifies requirements, metrics, and standards with methods to meet them.",
          },
          {
            pageNo: 46,
            start_text: "7.11.4", // ✅ from: "Quality requirements, metrics and acceptance criteria..."
            content:
              "Requirements and criteria apply to internal, external, interim, final, and intangible deliverables.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 47,
            start_text: "Quality control should consider progress", // ✅ from: "Quality control should be used to..."
            content:
              "Control ensures deliverables meet requirements and identifies causes of defects.",
          },
        ],
      },
    ],
    "Stakeholder Engagement": [
      {
        book_id: 1,
        title: "PMBOK Guide",
        author: "PMI",
        color: "blue",
        overview:
          "PMBOK defines stakeholder engagement as strategies and actions for productive involvement, starting at project initiation and continuing through the lifecycle.",
        similarPoints: [
          {
            pageNo: 89,
            start_text: "2.1.1 Stakeholder engagement", // ✅ exact section
            content:
              "Defines stakeholder engagement as strategies and actions to promote productive involvement.",
          },
          {
            pageNo: 90,
            start_text: "2.1.1.1 Identify", // ✅ section + heading
            content:
              "High-level and detailed identification of stakeholders as a continuous activity.",
          },
          {
            pageNo: 90,
            start_text: "2.1.1.2 Understand and Analyze",
            content:
              "Analyzing power, impact, beliefs, and expectations of stakeholders, including alliances.",
          },
          {
            pageNo: 91,
            start_text: "2.1.1.3 Prioritize",
            content:
              "Prioritization of stakeholders based on power and interest; reprioritization as project evolves.",
          },
          {
            pageNo: 91,
            start_text: "2.1.1.4 Engage",
            content:
              "Working collaboratively using communication and leadership skills; push, pull, and interactive communication methods.",
          },
          {
            pageNo: 92,
            start_text: "2.1.1.5 Monitor",
            content:
              "Monitoring stakeholder attitudes, satisfaction, and updating engagement strategy as needed.",
          },
        ],
        distinctPoints: [],
      },
      {
        book_id: 2,
        title: "PRINCE2",
        author: "Axelos",
        color: "purple",
        overview:
          "PRINCE2 emphasizes identifying stakeholders across the organizational ecosystem, focusing on relationships, influence, and perspectives to drive adoption and benefits realization.",
        similarPoints: [
          {
            pageNo: 55,
            start_text: "3.2.2",
            content:
              "Projects impact users, suppliers, and business stakeholders both internal and external.",
          },
          {
            pageNo: 55,
            start_text: "Definition: Stakeholder",
            content:
              "Any individual, group, or organization that can affect or be affected by the project.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 55,
            start_text: "A strong understanding",
            content:
              "Highlights need to identify stakeholders at the interface between project and organizational ecosystem.",
          },
          {
            pageNo: 55,
            start_text: "These stakeholders",
            content:
              "Defines influencers such as executives, operational staff, technical experts, and those shaping perception.",
          },
          {
            pageNo: 55,
            start_text: "The way in",
            content:
              "Stresses relationship building via meetings and working groups to align perspectives.",
          },
        ],
      },
      {
        book_id: 4,
        title: "ISO 21502",
        author: "ISO",
        color: "emerald",
        overview:
          "ISO 21502 frames stakeholder engagement as identifying, analyzing, and involving stakeholders continuously, with planned activities to resolve issues and secure support.",
        similarPoints: [
          {
            pageNo: 47,
            start_text: "7.12.1",
            content:
              "Purpose of stakeholder engagement is to identify and address needs, interests, and concerns.",
          },
          {
            pageNo: 47,
            start_text: "7.12.2",
            content:
              "Identification of stakeholders with information on interests, influence, and involvement.",
          },
          {
            pageNo: 48,
            start_text: "7.12.3",
            content:
              "Planned engagement to resolve issues using communication, negotiation, and escalation if needed.",
          },
        ],
        distinctPoints: [],
      },
    ],
    "Project Planning ": [
      {
        book_id: 1,
        title: "PMBOK Guide",
        author: "PMI",
        color: "blue",
        overview:
          "Defines planning variables in terms of delivery, estimating, scheduling, and budgeting to structure project management processes.",
        similarPoints: [
          {
            pageNo: 127,
            start_text: "2.4.2.1",
            content:
              "Delivery – determining how deliverables will be produced and validated.",
          },
          {
            pageNo: 128,
            start_text: "2.4.2.2",
            content:
              "Estimating – using quantitative methods to predict costs, durations, and resources.",
          },
          {
            pageNo: 131,
            start_text: "2.4.2.3",
            content:
              "Scheduling – sequencing activities and assigning durations.",
          },
          {
            pageNo: 135,
            start_text: "2.4.2.4",
            content:
              "Budget – consolidating costs to establish baselines and track variances.",
          },
        ],
        distinctPoints: [],
      },
      {
        book_id: 2,
        title: "PRINCE2",
        author: "Axelos",
        color: "purple",
        overview:
          "Emphasizes product-based planning to define deliverables first, then derive schedules, budgets, risks, and work packages.",
        similarPoints: [
          {
            pageNo: 126,
            start_text: "7.3.1",
            content:
              "PRINCE2 technique – product-based planning with iterative estimating and scheduling.",
          },
          {
            pageNo: 128,
            start_text: "7.3.2.1",
            content:
              "Writing the project product description – defining major outcomes, acceptance criteria, and quality expectations.",
          },
          {
            pageNo: 129,
            start_text: "7.3.2.2",
            content:
              "Creating a product breakdown structure – decomposing products into components and external dependencies.",
          },
          {
            pageNo: 130,
            start_text: "7.3.2.4",
            content:
              "Creating a product flow diagram – sequencing products and dependencies.",
          },
          {
            pageNo: 132,
            start_text: "7.3.2.5",
            content:
              "Organizing work packages – grouping delivery activities and defining internal vs external dependencies.",
          },
          {
            pageNo: 133,
            start_text: "7.3.2.6",
            content:
              "Preparing estimates – for people, resources, duration, costs, benefits, and risks.",
          },
          {
            pageNo: 133,
            start_text: "7.3.2.7",
            content:
              "Preparing a schedule – graphical representation of tasks, resources, and milestones.",
          },
          {
            pageNo: 134,
            start_text: "7.3.2.8",
            content:
              "Preparing the budget – consolidating activity, risk, and change costs with tolerances.",
          },
          {
            pageNo: 134,
            start_text: "7.3.2.9",
            content:
              "Analysing risks – embedding risk considerations throughout the plan.",
          },
          {
            pageNo: 134,
            start_text: "7.3.2.10",
            content:
              "Documenting the plan – defining dependencies, tolerances, monitoring, budgets, and assumptions.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 135,
            start_text: "7.3.3.1",
            content:
              "Prioritizing scope and quality criteria using MoSCoW, Kano model, or product backlogs.",
          },
          {
            pageNo: 135,
            start_text: "7.3.3.2",
            content:
              "Scheduling techniques – Gantt, checklists, Kanban boards, activity flow boards.",
          },
          {
            pageNo: 136,
            start_text: "7.3.4",
            content:
              "Estimating techniques – top-down, bottom-up, comparative, parametric, analytics, and Delphi.",
          },
        ],
      },
      {
        book_id: 4,
        title: "ISO 21502",
        author: "ISO",
        color: "emerald",
        overview:
          "Provides international guidelines for collaborative and iterative project planning, emphasizing scope, resources, risks, and monitoring.",
        similarPoints: [
          {
            pageNo: 35,
            start_text: "7.2.1",
            content:
              "Planning overview – define requirements, deliverables, outputs, outcomes, and constraints.",
          },
          {
            pageNo: 36,
            start_text: "7.2.2",
            content:
              "Developing the plan – collaborative activity considering scope, resources, costs, risks, and dependencies.",
          },
          {
            pageNo: 36,
            start_text: "7.2.3",
            content:
              "Monitoring the plan – establish baselines, track progress, and forecast based on risks and assumptions.",
          },
        ],
        distinctPoints: [],
      },
    ],
    "Project Governance": [
      {
        book_id: 1,
        title: "PMBOK Guide",
        author: "PMI",
        color: "blue",
        overview:
          "Explains governance systems as frameworks of oversight, control, and decision-making that align project governance with program and organizational governance.",
        similarPoints: [
          {
            pageNo: 36,
            start_text: "2.2",
            content:
              "Organizational governance systems enable workflows, decision-making, and integration across components of the value delivery system.",
          },
          {
            pageNo: 310,
            start_text: "Project Governance",
            content:
              "Framework, functions, and processes that guide project management to achieve organizational goals.",
          },
          {
            pageNo: 40,
            start_text: "2.3.8",
            content:
              "Maintain governance – approving and supporting project recommendations while linking outcomes to strategic objectives.",
          },
        ],
        distinctPoints: [],
      },
      {
        book_id: 2,
        title: "PRINCE2",
        author: "Axelos",
        color: "purple",
        overview:
          "Focuses on organizational design and development for governance, describing how projects interface with the organizational ecosystem, transition between stages, and adapt to evolving needs.",
        similarPoints: [
          {
            pageNo: 102,
            start_text: "6.3",
            content:
              "Technique for organizational design and development to align projects with governance pathways and corporate structures.",
          },
          {
            pageNo: 103,
            start_text: "6.3.1.1",
            content:
              "Understanding the organizational ecosystem – clarifies governance responsibilities, decision pathways, and management approaches.",
          },
          {
            pageNo: 103,
            start_text: "6.3.1.2",
            content:
              "Designing the project ecosystem – determine structures, resources, practices, and culture to meet governance requirements.",
          },
          {
            pageNo: 104,
            start_text: "6.3.1.3",
            content:
              "Developing the project ecosystem – onboarding, skills assessment, training, succession planning, and maintaining culture.",
          },
          {
            pageNo: 105,
            start_text: "6.3.1.4",
            content:
              "Managing ongoing changes – adapt structures, resources, and roles to governance needs during project lifecycle.",
          },
          {
            pageNo: 105,
            start_text: "6.3.1.5",
            content:
              "Transition into organizational ecosystem – ensuring product acceptance, staff transition, and capturing lessons learned.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 104,
            start_text: "Scenario",
            content:
              "Illustration of team restructuring and governance adaptation during a transition between design and delivery stages.",
          },
        ],
      },
      {
        book_id: 4,
        title: "ISO 21502",
        author: "ISO",
        color: "emerald",
        overview:
          "Defines project governance as principles, policies, and frameworks integrated into organizational governance, built on a business case foundation.",
        similarPoints: [
          {
            pageNo: 17,
            start_text: "4.3.1",
            content:
              "Governance framework – defines policies, methods, life cycle, roles, responsibilities, and decision-making authority.",
          },
          {
            pageNo: 17,
            start_text: "4.3.2",
            content:
              "Business case as foundation – objectives, strategic alignment, metrics, risks, resources, and sustainability drive governance.",
          },
        ],
        distinctPoints: [],
      },
    ],
    "Change Management": [
      {
        book_id: 1,
        title: "PMBOK Guide",
        author: "PMI",
        color: "blue",
        overview:
          "PMBOK describes change management as a structured and iterative process to move individuals, groups, and organizations from a current state to a future state with business benefits. It includes multiple models and frameworks.",
        similarPoints: [
          {
            pageNo: 299,
            start_text: "Change Management",
            content:
              "Comprehensive, cyclic, and structured approach to transition individuals and organizations from current to future state.",
          },
          {
            pageNo: 218,
            start_text: "Managing Change",
            content:
              "Managing Change in Organizations – five-element framework: Formulate, Plan, Implement, Manage transition, Sustain change.",
          },
          {
            pageNo: 218,
            start_text: "4.2.4.2",
            content:
              "ADKAR® model – Awareness, Desire, Knowledge, Ability, Reinforcement.",
          },
          {
            pageNo: 220,
            start_text: "4.2.4.",
            content:
              "Kotter’s 8-Step Process – urgency, coalition, vision, communication, remove obstacles, short-term wins, build change, anchor in culture.",
          },
          {
            pageNo: 220,
            start_text: "4.2.4.4",
            content:
              "Satir Change Model – status quo, foreign element, chaos, transforming idea, integration, new status quo.",
          },
          {
            pageNo: 221,
            start_text: "4.2.4.5",
            content:
              "Bridges’ Transition Model – Ending/Letting go, Neutral Zone, New Beginning.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 218,
            start_text: "Managing Change in Organizations",
            content:
              "PMBOK highlights multiple change models (ADKAR, Kotter, Satir, Bridges) giving project managers options for applying structured change techniques.",
          },
        ],
      },
      {
        book_id: 2,
        title: "PRINCE2",
        author: "Axelos",
        color: "purple",
        overview:
          "PRINCE2 defines change management as the transition from current to target state, with a structured change management approach embedded in project initiation documentation.",
        similarPoints: [
          {
            pageNo: 53,
            start_text: "3.2",
            content:
              "Projects require change management – transitioning people, systems, and organizations from current to future state.",
          },
          {
            pageNo: 53,
            start_text: "Definition",
            content:
              "Change management – means by which an organization transitions from current to target state.",
          },
          {
            pageNo: 54,
            start_text: "Management product",
            content:
              "Change Management Approach – defines scope, states (current, interim, target), enabling activities, resources, responsibilities, and supporting tools.",
          },
          {
            pageNo: 337,
            start_text: "change management",
            content:
              "Change management defined as the means by which an organization transitions from current state to target state.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 54,
            start_text: "Approach",
            content:
              "PRINCE2 uniquely requires a formal documented 'Change Management Approach' within initiation documentation.",
          },
        ],
      },
      {
        book_id: 4,
        title: "ISO 21502",
        author: "ISO",
        color: "emerald",
        overview:
          "ISO 21502 distinguishes change control (managing changes to project deliverables) from broader organizational change management. It emphasizes formal frameworks for assessing, authorizing, and implementing change requests.",
        similarPoints: [
          {
            pageNo: 44,
            start_text: "7.10.1",
            content:
              "Change control provides a framework for identifying, assessing, implementing, and closing change requests.",
          },
          {
            pageNo: 45,
            start_text: "7.10.2",
            content:
              "Change control framework defines processes, procedures, and configuration management to manage changes.",
          },
          {
            pageNo: 45,
            start_text: "7.10.3",
            content:
              "Change requests must be evaluated for scope, resources, schedule, cost, quality, and risk before authorization.",
          },
          {
            pageNo: 45,
            start_text: "7.10.5",
            content:
              "Authorized changes should be communicated, implemented, and formally closed.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 45,
            start_text: "implementation of change",
            content:
              "ISO emphasizes change control (requests, logs, assessment) rather than individual/organizational transition models.",
          },
        ],
      },
    ],
    "Resource Management": [
      {
        book_id: 1,
        title: "PMBOK Guide",
        author: "PMI",
        color: "blue",
        overview:
          "PMBOK defines resource management as planning, acquiring, allocating, monitoring, and controlling both human and physical resources to ensure project success.",
        similarPoints: [
          {
            pageNo: 242,
            start_text: "Resource Management Plan",
            content:
              "Component of the project management plan describing how resources are acquired, allocated, monitored, and controlled.",
          },
          {
            pageNo: 313,
            start_text: "Resource Management Plan",
            content:
              "Repeated emphasis on resource planning as part of the overall project management plan.",
          },
          {
            pageNo: 39,
            start_text: "2.3.7 Provide Resources and Direction",
            content:
              "Leaders advocate for resources, secure decisions, remove obstacles, and align project teams with organizational goals.",
          },
          {
            pageNo: 137,
            start_text: "2.4.5 Physical Resources",
            content:
              "Physical resources include materials, equipment, software, and licenses. Planning considers logistics, lead times, supply chain, sustainability, and integration with procurement.",
          },
          {
            pageNo: 144,
            start_text: "2.5.5 Managing Physical Resources",
            content:
              "Managing resources involves logistics, estimates, deliveries, safe work environment, and integration with the master schedule to reduce waste and delays.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 40,
            start_text: "Escalation",
            content:
              "PMBOK highlights escalation paths when project teams cannot resolve resource shortages or funding issues on their own.",
          },
          {
            pageNo: 137,
            start_text: "Sustainability",
            content:
              "Explicit focus on strategic planning for procurement, bulk orders, global logistics, and sustainable management of physical assets.",
          },
        ],
      },
      {
        book_id: 2,
        title: "PRINCE2",
        author: "Axelos",
        color: "purple",
        overview:
          "PRINCE2 presents resource management through scenarios that emphasize visibility, capacity planning, and balancing cultural considerations with practical reporting.",
        similarPoints: [
          {
            pageNo: 32,
            start_text: "Scenario 1",
            content:
              "Case study: Data Knowledge develops a time-recording solution and resource utilization reports to improve visibility, capacity planning, and morale.",
          },
          {
            pageNo: 63,
            start_text: "Scenario",
            content:
              "Leaders align on resource reporting granularity (project-level vs. task-level) balancing assurance and cultural sensitivity.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 32,
            start_text: "iterative and incremental approach.",
            content:
              "Resource management solution developed iteratively with product backlog, timeboxes, pilots, and roll-outs, demonstrating PRINCE2’s flexibility.",
          },
          {
            pageNo: 63,
            start_text: "significant cultural change",
            content:
              "PRINCE2 highlights cultural impacts of resource reporting — avoiding excessive scrutiny that may lower morale.",
          },
        ],
      },
      {
        book_id: 4,
        title: "ISO 21502",
        author: "ISO",
        color: "emerald",
        overview:
          "ISO 21502 frames resource management broadly, covering people, facilities, materials, and tools. It emphasizes optimization, conflict resolution, and both human and physical resource integration.",
        similarPoints: [
          {
            pageNo: 38,
            start_text: "purpose of resources management",
            content:
              "Resources include people, facilities, equipment, infrastructure, and tools. Management ensures quality, quantity, and optimum usage.",
          },
          {
            pageNo: 39,
            start_text: "Planning the project organization",
            content:
              "Defines roles, responsibilities, and alignment with structures, policies, and project environment. Considers training, legal requirements, and competencies.",
          },
          {
            pageNo: 39,
            start_text: "Establishing the team",
            content:
              "Acquire and allocate team members, set reporting requirements, reassess composition, and consider external hires if needed.",
          },
          {
            pageNo: 39,
            start_text: "Developing the team",
            content:
              "Encourages cohesion, motivation, and growth via training, coaching, and group dynamics improvement.",
          },
          {
            pageNo: 39,
            start_text: "Managing the team",
            content:
              "Focus on motivation, conflict resolution, feedback, performance appraisal, and escalation where necessary.",
          },
          {
            pageNo: 40,
            start_text: "Physical and Material Resources",
            content:
              "Plan, manage, and control physical resources with attention to availability, cost, lead times, schedules, and risks of unavailability.",
          },
        ],
        distinctPoints: [
          {
            pageNo: 38,
            start_text: "Conflicts",
            content:
              "ISO uniquely emphasizes conflicts in resource availability due to external factors (weather, labor unrest, competing demands).",
          },
          {
            pageNo: 39,
            start_text: "Leadership",
            content:
              "Detailed focus on leadership styles (negotiation, empathy, assertiveness) for effective team management.",
          },
        ],
      },
    ],
  };
  const topic = topics[requested_topic];

  console.log(requested_topic);
  console.log(topic);

  const sections = [
    { book_id: "overview", label: "Overview" },
    { book_id: "similarPoints", label: "Similarities" },
    { book_id: "distinctPoints", label: "Unique Points" },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-900",
      accent: "bg-blue-600",
      hover: "hover:bg-blue-100",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-900",
      accent: "bg-purple-600",
      hover: "hover:bg-purple-100",
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-900",
      accent: "bg-emerald-600",
      hover: "hover:bg-emerald-100",
    },
  };

  const filteredBooks = topic.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Book Comparison
          </h1>
          <p className="text-xl text-blue-600 font-semibold mb-4">
            Topic: {requested_topic} 📘
          </p>
          {/* Search Bar */}
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search topic or sub-topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <XMarkIcon className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.book_id}
                onClick={() => setActiveSection(section.book_id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === section.book_id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.book_id}
              className={`${colorClasses[book.color].bg} border-2 ${
                colorClasses[book.color].border
              } rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105`}
            >
              {/* Book Header */}
              <div
                className={`${colorClasses[book.color].accent} p-4 text-white`}
              >
                <h2 className="text-xl font-bold mb-1">{book.title}</h2>
                <p className="text-sm opacity-90">{book.author}</p>
              </div>

              {/* Book Content */}
              <div className="p-6">
                {activeSection === "overview" && (
                  <div>
                    <h3
                      className={`font-semibold ${
                        colorClasses[book.color].text
                      } mb-3 text-lg`}
                    >
                      Overview
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {book.overview}
                    </p>
                  </div>
                )}

                {activeSection === "similarPoints" && (
                  <div>
                    <h3
                      className={`font-semibold ${
                        colorClasses[book.color].text
                      } mb-3 text-lg`}
                    >
                      Key Points
                    </h3>
                    <ul className="space-y-2">
                      {book.similarPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <span
                            className={`${
                              colorClasses[book.color].accent
                            } w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0`}
                          ></span>
                          <a
                            href={`/book?pdfId=${book.book_id}&pageNum=${
                              point.pageNo
                            }&searchText=${encodeURIComponent(
                              point.start_text
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-700 hover:underline"
                          >
                            {point.content}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeSection === "distinctPoints" && (
                  <div>
                    <h3
                      className={`font-semibold ${
                        colorClasses[book.color].text
                      } mb-3 text-lg`}
                    >
                      Practical distinctPoints
                    </h3>
                    <ul className="space-y-2">
                      {book.distinctPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className={`${colorClasses[book.color].bg} ${
                            colorClasses[book.color].hover
                          } p-3 rounded-lg border ${
                            colorClasses[book.color].border
                          } transition-colors`}
                        >
                          <a
                            href={`/book?pdfId=${book.book_id}&pageNum=${
                              point.pageNo
                            }&searchText=${encodeURIComponent(
                              point.start_text
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-700 hover:underline"
                          >
                            {point.content}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              No books found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
