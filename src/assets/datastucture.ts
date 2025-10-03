type Book = {
  id: number;
  title: string;
  author: string;
  color: string; // e.g., "blue", "green", used for UI styling
  overview: string;

  similarPoints: {
    pageNo: number;       // page number where the point occurs
    start_text: string;   // keyword or phrase to highlight
    content: string;      // description of the point
  }[];

  distinctPoints: {
    pageNo: number;
    start_text: string;
    content: string;
  }[];
};

// 📘 JSON Reference Template

[
  {
    "id": 1,
    "title": "Atomic Habits",
    "author": "James Clear",
    "color": "blue",
    "overview": "A comprehensive guide to building good habits and breaking bad ones through small, incremental changes that compound over time.",
    "similarPoints": [
      {
        "pageNo": 21,
        "start_text": "Systems",
        "content": "Systems over goals"
      },
      {
        "pageNo": 32,
        "start_text": "Identity-based",
        "content": "Identity-based habits"
      },
      {
        "pageNo": 38,
        "start_text": "The",
        "content": "The 1% improvement principle"
      },
      {
        "pageNo": 14,
        "start_text": "Environment",
        "content": "Environment design"
      }
    ],
    "distinctPoints": [
      {
        "pageNo": 172,
        "start_text": "the",
        "content": "Start with 2-minute habits"
      },
      {
        "pageNo": 45,
        "start_text": "and",
        "content": "Use habit stacking"
      },
      {
        "pageNo": 289,
        "start_text": "in",
        "content": "Make good habits obvious and easy"
      },
      {
        "pageNo": 103,
        "start_text": "of",
        "content": "Track your progress daily"
      }
    ]
  }
]
