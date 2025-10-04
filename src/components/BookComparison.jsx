import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function BookComparison() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const topic = [
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
