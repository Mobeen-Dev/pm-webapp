from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CORS configuration (allow your frontend origin during dev)
origins = [
    "http://localhost:5173",  # Frontend dev server
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Can also use ["*"] for development & origins for Deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# uvicorn server:app --reload

@app.post("/data")
async def get_data():
    # Fake data from backend
    return {
        "pmbok": {
            "name": "PMBOK Guide",
            "icon": "BookOpen",  # Optional: Just a string identifier
            "color": "indigo",
            "sections": [
                {
                    "id": 1,
                    "number": "1",
                    "title": "Introduction to Project Management",
                    "count": 15,
                    "subsections": [
                        {"section": "1.1", "page": 12, "title": "What is a Project?"},
                        {
                            "section": "1.2",
                            "page": 15,
                            "title": "What is Project Management?",
                        },
                        {
                            "section": "1.3",
                            "page": 18,
                            "title": "The Relationship Between Portfolio, Program, and Project Management",
                        },
                        {
                            "section": "1.4",
                            "page": 22,
                            "title": "Project Management Office",
                        },
                        {
                            "section": "1.5",
                            "page": 25,
                            "title": "Relationship Between Project Management, Operations Management, and Organizational Strategy",
                        },
                    ],
                },
                {
                    "id": 2,
                    "number": "2",
                    "title": "The Environment in Which Projects Operate",
                    "count": 12,
                    "subsections": [
                        {
                            "section": "2.1",
                            "page": 38,
                            "title": "Enterprise Environmental Factors",
                        },
                        {
                            "section": "2.2",
                            "page": 42,
                            "title": "Organizational Process Assets",
                        },
                        {
                            "section": "2.3",
                            "page": 45,
                            "title": "Organizational Systems",
                        },
                        {
                            "section": "2.4",
                            "page": 48,
                            "title": "Organizational Culture and Style",
                        },
                    ],
                },
                {
                    "id": 3,
                    "number": "3",
                    "title": "The Role of the Project Manager",
                    "count": 18,
                    "subsections": [
                        {
                            "section": "3.1",
                            "page": 52,
                            "title": "Definition of a Project Manager",
                        },
                        {
                            "section": "3.2",
                            "page": 55,
                            "title": "The Project Manager's Sphere of Influence",
                        },
                        {
                            "section": "3.3",
                            "page": 58,
                            "title": "Project Manager Competences",
                        },
                        {
                            "section": "3.4",
                            "page": 62,
                            "title": "Performing Integration",
                        },
                        {"section": "3.5", "page": 65, "title": "Leadership Skills"},
                        {
                            "section": "3.6",
                            "page": 68,
                            "title": "Technical Project Management Skills",
                        },
                    ],
                },
                {
                    "id": 4,
                    "number": "4",
                    "title": "Project Integration Management",
                    "count": 22,
                    "subsections": [
                        {
                            "section": "4.1",
                            "page": 75,
                            "title": "Develop Project Charter",
                        },
                        {
                            "section": "4.2",
                            "page": 82,
                            "title": "Develop Project Management Plan",
                        },
                        {
                            "section": "4.3",
                            "page": 88,
                            "title": "Direct and Manage Project Work",
                        },
                        {
                            "section": "4.4",
                            "page": 94,
                            "title": "Manage Project Knowledge",
                        },
                        {
                            "section": "4.5",
                            "page": 98,
                            "title": "Monitor and Control Project Work",
                        },
                        {
                            "section": "4.6",
                            "page": 105,
                            "title": "Perform Integrated Change Control",
                        },
                        {
                            "section": "4.7",
                            "page": 112,
                            "title": "Close Project or Phase",
                        },
                    ],
                },
                {
                    "id": 5,
                    "number": "5",
                    "title": "Project Scope Management",
                    "count": 20,
                    "subsections": [
                        {
                            "section": "5.1",
                            "page": 130,
                            "title": "Plan Scope Management",
                        },
                        {
                            "section": "5.2",
                            "page": 135,
                            "title": "Collect Requirements",
                        },
                        {"section": "5.3", "page": 142, "title": "Define Scope"},
                        {"section": "5.4", "page": 148, "title": "Create WBS"},
                        {"section": "5.5", "page": 155, "title": "Validate Scope"},
                        {"section": "5.6", "page": 160, "title": "Control Scope"},
                    ],
                },
            ],
        },
        "agile": {
            "name": "Agile Practices",
            "icon": "FileText",
            "color": "cyan",
            "sections": [
                {
                    "id": 1,
                    "number": "1",
                    "title": "Agile Mindset and Principles",
                    "count": 14,
                    "subsections": [
                        {"section": "1.1", "page": 8, "title": "The Agile Manifesto"},
                        {
                            "section": "1.2",
                            "page": 12,
                            "title": "12 Principles Behind the Agile Manifesto",
                        },
                        {
                            "section": "1.3",
                            "page": 16,
                            "title": "Values and Principles",
                        },
                        {
                            "section": "1.4",
                            "page": 20,
                            "title": "Agile vs Traditional Approaches",
                        },
                        {"section": "1.5", "page": 24, "title": "When to Use Agile"},
                    ],
                },
                {
                    "id": 2,
                    "number": "2",
                    "title": "Scrum Framework",
                    "count": 25,
                    "subsections": [
                        {
                            "section": "2.1",
                            "page": 32,
                            "title": "Scrum Theory and Values",
                        },
                        {"section": "2.2", "page": 36, "title": "Scrum Team Structure"},
                        {"section": "2.3", "page": 40, "title": "Product Owner Role"},
                        {"section": "2.4", "page": 45, "title": "Scrum Master Role"},
                        {"section": "2.5", "page": 50, "title": "Development Team"},
                        {"section": "2.6", "page": 55, "title": "Scrum Events"},
                        {"section": "2.7", "page": 60, "title": "Sprint Planning"},
                        {"section": "2.8", "page": 65, "title": "Daily Scrum"},
                    ],
                },
                {
                    "id": 3,
                    "number": "3",
                    "title": "Kanban Method",
                    "count": 16,
                    "subsections": [
                        {"section": "3.1", "page": 75, "title": "Kanban Principles"},
                        {"section": "3.2", "page": 80, "title": "Visualizing Work"},
                        {
                            "section": "3.3",
                            "page": 85,
                            "title": "Limiting Work in Progress",
                        },
                        {"section": "3.4", "page": 90, "title": "Managing Flow"},
                        {
                            "section": "3.5",
                            "page": 95,
                            "title": "Making Policies Explicit",
                        },
                    ],
                },
                {
                    "id": 4,
                    "number": "4",
                    "title": "Extreme Programming (XP)",
                    "count": 19,
                    "subsections": [
                        {"section": "4.1", "page": 105, "title": "XP Values"},
                        {"section": "4.2", "page": 110, "title": "XP Practices"},
                        {"section": "4.3", "page": 115, "title": "Pair Programming"},
                        {
                            "section": "4.4",
                            "page": 120,
                            "title": "Test-Driven Development",
                        },
                        {
                            "section": "4.5",
                            "page": 125,
                            "title": "Continuous Integration",
                        },
                        {"section": "4.6", "page": 130, "title": "Refactoring"},
                    ],
                },
                {
                    "id": 5,
                    "number": "5",
                    "title": "Scaling Agile",
                    "count": 21,
                    "subsections": [
                        {"section": "5.1", "page": 142, "title": "SAFe Framework"},
                        {"section": "5.2", "page": 148, "title": "LeSS Framework"},
                        {"section": "5.3", "page": 154, "title": "Disciplined Agile"},
                        {"section": "5.4", "page": 160, "title": "Nexus Framework"},
                        {"section": "5.5", "page": 166, "title": "Scrum of Scrums"},
                    ],
                },
            ],
        },
        "leadership": {
            "name": "Leadership & Strategy",
            "icon": "BookOpen",
            "color": "purple",
            "sections": [
                {
                    "id": 1,
                    "number": "1",
                    "title": "Leadership Fundamentals",
                    "count": 17,
                    "subsections": [
                        {"section": "1.1", "page": 10, "title": "What is Leadership?"},
                        {
                            "section": "1.2",
                            "page": 15,
                            "title": "Leadership vs Management",
                        },
                        {"section": "1.3", "page": 20, "title": "Leadership Styles"},
                        {
                            "section": "1.4",
                            "page": 25,
                            "title": "Situational Leadership",
                        },
                        {
                            "section": "1.5",
                            "page": 30,
                            "title": "Transformational Leadership",
                        },
                        {"section": "1.6", "page": 35, "title": "Servant Leadership"},
                    ],
                },
                {
                    "id": 2,
                    "number": "2",
                    "title": "Team Building and Motivation",
                    "count": 23,
                    "subsections": [
                        {
                            "section": "2.1",
                            "page": 45,
                            "title": "Building High-Performance Teams",
                        },
                        {
                            "section": "2.2",
                            "page": 50,
                            "title": "Team Development Stages",
                        },
                        {"section": "2.3", "page": 55, "title": "Motivation Theories"},
                        {
                            "section": "2.4",
                            "page": 60,
                            "title": "Maslow's Hierarchy of Needs",
                        },
                        {
                            "section": "2.5",
                            "page": 65,
                            "title": "Herzberg's Two-Factor Theory",
                        },
                        {
                            "section": "2.6",
                            "page": 70,
                            "title": "McGregor's Theory X and Y",
                        },
                        {"section": "2.7", "page": 75, "title": "Conflict Resolution"},
                    ],
                },
                {
                    "id": 3,
                    "number": "3",
                    "title": "Strategic Thinking",
                    "count": 19,
                    "subsections": [
                        {
                            "section": "3.1",
                            "page": 88,
                            "title": "Strategic Planning Process",
                        },
                        {"section": "3.2", "page": 94, "title": "SWOT Analysis"},
                        {
                            "section": "3.3",
                            "page": 100,
                            "title": "Porter's Five Forces",
                        },
                        {"section": "3.4", "page": 106, "title": "Balanced Scorecard"},
                        {"section": "3.5", "page": 112, "title": "OKRs and KPIs"},
                    ],
                },
                {
                    "id": 4,
                    "number": "4",
                    "title": "Communication and Influence",
                    "count": 20,
                    "subsections": [
                        {
                            "section": "4.1",
                            "page": 125,
                            "title": "Effective Communication",
                        },
                        {"section": "4.2", "page": 130, "title": "Active Listening"},
                        {
                            "section": "4.3",
                            "page": 135,
                            "title": "Stakeholder Management",
                        },
                        {"section": "4.4", "page": 140, "title": "Negotiation Skills"},
                        {
                            "section": "4.5",
                            "page": 145,
                            "title": "Influence Without Authority",
                        },
                        {"section": "4.6", "page": 150, "title": "Presentation Skills"},
                    ],
                },
                {
                    "id": 5,
                    "number": "5",
                    "title": "Change Management",
                    "count": 18,
                    "subsections": [
                        {
                            "section": "5.1",
                            "page": 162,
                            "title": "Understanding Change",
                        },
                        {
                            "section": "5.2",
                            "page": 168,
                            "title": "Kotter's 8-Step Process",
                        },
                        {"section": "5.3", "page": 174, "title": "ADKAR Model"},
                        {
                            "section": "5.4",
                            "page": 180,
                            "title": "Overcoming Resistance",
                        },
                        {
                            "section": "5.5",
                            "page": 186,
                            "title": "Leading Through Change",
                        },
                    ],
                },
            ],
        },
    }

