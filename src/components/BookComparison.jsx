import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function BookComparison() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const topic = [
    {
      book_id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      color: "blue",
      overview:
        "A comprehensive guide to building good habits and breaking bad ones through small, incremental changes that compound over time.",
      similarPoints: [
        {
          pageNo: 21,
          start_text: "Systems",
          content: "Systems over goals",
        },
        {
          pageNo: 32,
          start_text: "Identity-based",
          content: "Identity-based habits",
        },
        {
          pageNo: 38,
          start_text: "The",
          content: "The 1% improvement principle",
        },
        {
          pageNo: 14,
          start_text: "Environment",
          content: "Environment design",
        },
      ],
      distinctPoints: [
        {
          pageNo: 172,
          start_text: "the",
          content: "Start with 2-minute habits",
        },
        {
          pageNo: 45,
          start_text: "and",
          content: "Use habit stacking",
        },
        {
          pageNo: 289,
          start_text: "in",
          content: "Make good habits obvious and easy",
        },
        {
          pageNo: 103,
          start_text: "of",
          content: "Track your progress daily",
        },
      ],
    },
    {
      book_id: 2,
      title: "Deep Work",
      author: "Cal Newport",
      color: "purple",
      overview:
        "Explores the power of focused concentration and provides strategies to cultivate the ability to focus without distraction on cognitively demanding tasks.",
      similarPoints: [
        "Eliminate distractions",
        "Deliberate practice",
        "Time blocking",
        "Value of solitude",
      ],
      distinctPoints: [
        "Schedule deep work blocks",
        "Create shutdown rituals",
        "Embrace boredom",
        "Quit social media strategically",
      ],
    },
    {
      book_id: 3,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      color: "emerald",
      overview:
        "A spiritual guide that emphasizes living in the present moment and freeing oneself from the mind's constant chatter and anxiety about past and future.",
      similarPoints: [
        "Present moment awareness",
        "Observing thoughts",
        "Acceptance of what is",
        "Inner stillness",
      ],
      distinctPoints: [
        "Practice conscious breathing",
        "Watch the thinker within",
        "Accept the present moment",
        "Find inner body awareness",
      ],
    },
  ];

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
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === section.id
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
              key={book.id}
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
                            href={`/book?pdfId=${book.id}&pageNum=${
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
                            href={`/book?pdfId=${book.id}&pageNum=${
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
