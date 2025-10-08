import { useState, useEffect} from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid"; // Use solid for the active icon

import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  ExternalLink,
  FileText,
} from "lucide-react";

const ICON_MAP = {
  chevrondown: ChevronDown,
  chevronright: ChevronRight,
  bookopen: BookOpen,
  externallink: ExternalLink,
  filetext: FileText,
};

export default function KnowledgeBaseSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("pmbok");
  const [expandedRows, setExpandedRows] = useState({});
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [isStrictSearch, setIsStrictSearch] = useState(false);
  const [section_id, setsection_id] = useState(1);
  useEffect(() => {
    const activeTabValue =
      activeTab === "PMBook"
        ? 1
        : activeTab === "PRINCE2"
        ? 2
        : activeTab === "ISO"
        ? 3
        : 0;

    setsection_id(activeTabValue);
  }, [activeTab]);

  const pdfPath = "http://localhost:5173/";
  const tabsData = {
    pmbok: {
      name: "PMBOK Guide",
      icon: BookOpen,
      color: "indigo",
      sections: [
        {
          id: 1,
          number: "1",
          title: "Introduction to Project Management",
          count: 15,
          subsections: [
            { section: "1.1", page: 12, title: "What is a Project?" },
            { section: "1.2", page: 15, title: "What is Project Management?" },
            {
              section: "1.3",
              page: 18,
              title:
                "The Relationship Between Portfolio, Program, and Project Management",
            },
            { section: "1.4", page: 22, title: "Project Management Office" },
            {
              section: "1.5",
              page: 25,
              title:
                "Relationship Between Project Management, Operations Management, and Organizational Strategy",
            },
          ],
        },
        {
          id: 2,
          number: "2",
          title: "The Environment in Which Projects Operate",
          count: 12,
          subsections: [
            {
              section: "2.1",
              page: 38,
              title: "Enterprise Environmental Factors",
            },
            {
              section: "2.2",
              page: 42,
              title: "Organizational Process Assets",
            },
            { section: "2.3", page: 45, title: "Organizational Systems" },
            {
              section: "2.4",
              page: 48,
              title: "Organizational Culture and Style",
            },
          ],
        },
        {
          id: 3,
          number: "3",
          title: "The Role of the Project Manager",
          count: 18,
          subsections: [
            {
              section: "3.1",
              page: 52,
              title: "Definition of a Project Manager",
            },
            {
              section: "3.2",
              page: 55,
              title: "The Project Manager's Sphere of Influence",
            },
            { section: "3.3", page: 58, title: "Project Manager Competences" },
            { section: "3.4", page: 62, title: "Performing Integration" },
            { section: "3.5", page: 65, title: "Leadership Skills" },
            {
              section: "3.6",
              page: 68,
              title: "Technical Project Management Skills",
            },
          ],
        },
        {
          id: 4,
          number: "4",
          title: "Project Integration Management",
          count: 22,
          subsections: [
            { section: "4.1", page: 75, title: "Develop Project Charter" },
            {
              section: "4.2",
              page: 82,
              title: "Develop Project Management Plan",
            },
            {
              section: "4.3",
              page: 88,
              title: "Direct and Manage Project Work",
            },
            { section: "4.4", page: 94, title: "Manage Project Knowledge" },
            {
              section: "4.5",
              page: 98,
              title: "Monitor and Control Project Work",
            },
            {
              section: "4.6",
              page: 105,
              title: "Perform Integrated Change Control",
            },
            { section: "4.7", page: 112, title: "Close Project or Phase" },
          ],
        },
        {
          id: 5,
          number: "5",
          title: "Project Scope Management",
          count: 20,
          subsections: [
            { section: "5.1", page: 130, title: "Plan Scope Management" },
            { section: "5.2", page: 135, title: "Collect Requirements" },
            { section: "5.3", page: 142, title: "Define Scope" },
            { section: "5.4", page: 148, title: "Create WBS" },
            { section: "5.5", page: 155, title: "Validate Scope" },
            { section: "5.6", page: 160, title: "Control Scope" },
          ],
        },
      ],
    },
    agile: {
      name: "PRINCE 2",
      icon: FileText,
      color: "cyan",
      sections: [
        {
          id: 1,
          number: "1",
          title: "Agile Mindset and Principles",
          count: 14,
          subsections: [
            { section: "1.1", page: 8, title: "The Agile Manifesto" },
            {
              section: "1.2",
              page: 12,
              title: "12 Principles Behind the Agile Manifesto",
            },
            { section: "1.3", page: 16, title: "Values and Principles" },
            {
              section: "1.4",
              page: 20,
              title: "Agile vs Traditional Approaches",
            },
            { section: "1.5", page: 24, title: "When to Use Agile" },
          ],
        },
        {
          id: 2,
          number: "2",
          title: "Scrum Framework",
          count: 25,
          subsections: [
            { section: "2.1", page: 32, title: "Scrum Theory and Values" },
            { section: "2.2", page: 36, title: "Scrum Team Structure" },
            { section: "2.3", page: 40, title: "Product Owner Role" },
            { section: "2.4", page: 45, title: "Scrum Master Role" },
            { section: "2.5", page: 50, title: "Development Team" },
            { section: "2.6", page: 55, title: "Scrum Events" },
            { section: "2.7", page: 60, title: "Sprint Planning" },
            { section: "2.8", page: 65, title: "Daily Scrum" },
          ],
        },
        {
          id: 3,
          number: "3",
          title: "Kanban Method",
          count: 16,
          subsections: [
            { section: "3.1", page: 75, title: "Kanban Principles" },
            { section: "3.2", page: 80, title: "Visualizing Work" },
            { section: "3.3", page: 85, title: "Limiting Work in Progress" },
            { section: "3.4", page: 90, title: "Managing Flow" },
            { section: "3.5", page: 95, title: "Making Policies Explicit" },
          ],
        },
      ],
    },
    leadership: {
      name: "ISO",
      icon: BookOpen,
      color: "purple",
      sections: [
        {
          id: 1,
          number: "1",
          title: "Leadership Fundamentals",
          count: 17,
          subsections: [
            { section: "1.1", page: 10, title: "What is Leadership?" },
            { section: "1.2", page: 15, title: "Leadership vs Management" },
            { section: "1.3", page: 20, title: "Leadership Styles" },
            { section: "1.4", page: 25, title: "Situational Leadership" },
            { section: "1.5", page: 30, title: "Transformational Leadership" },
            { section: "1.6", page: 35, title: "Servant Leadership" },
          ],
        },
        {
          id: 2,
          number: "2",
          title: "Team Building and Motivation",
          count: 23,
          subsections: [
            {
              section: "2.1",
              page: 45,
              title: "Building High-Performance Teams",
            },
            { section: "2.2", page: 50, title: "Team Development Stages" },
            { section: "2.3", page: 55, title: "Motivation Theories" },
            { section: "2.4", page: 60, title: "Maslow's Hierarchy of Needs" },
            { section: "2.5", page: 65, title: "Herzberg's Two-Factor Theory" },
            { section: "2.6", page: 70, title: "McGregor's Theory X and Y" },
            { section: "2.7", page: 75, title: "Conflict Resolution" },
          ],
        },
        {
          id: 3,
          number: "3",
          title: "Strategic Thinking",
          count: 19,
          subsections: [
            { section: "3.1", page: 88, title: "Strategic Planning Process" },
            { section: "3.2", page: 94, title: "SWOT Analysis" },
            { section: "3.3", page: 100, title: "Porter's Five Forces" },
            { section: "3.4", page: 106, title: "Balanced Scorecard" },
            { section: "3.5", page: 112, title: "OKRs and KPIs" },
          ],
        },
      ],
    },
  };

  const handleStrictSearchToggle = () => {
    // Toggle the state
    const newState = !isStrictSearch;
    setIsStrictSearch(newState);
    console.log("Strict Search Toggled:", newState);
    // Add any logic needed when the strict search setting changes
  };

  function getIconComponent(iconName) {
    // Normalize the input string to handle case differences or spaces if needed
    const normalizedName = iconName.toLowerCase().trim();

    // Return the component from the map, or null if the key doesn't exist
    return ICON_MAP[normalizedName] || null;
  }

  const performSearch = async (query) => {
    if (!query || query.trim().length === 0) {
      setError("Please enter a search term");
      return;
    }

    if (query.trim().length < 2) {
      setError("Search term must be at least 2 characters");
      return;
    }

    if (query.length > 100) {
      setError("Search term is too long");
      return;
    }

    const sanitizedQuery = query.trim().replace(/[<>{}]/g, "");

    setIsSearching(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const response = await fetch("http://localhost:8000/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: sanitizedQuery,
          strict: isStrictSearch,
        }),
      });
      const data = await response.json();

      // const data = await response.json();

      // Filter data based on search
      const filteredData = {};
      let hasResults = false;

      Object.entries(data).forEach(([key, tab]) => {
        const filteredSections = tab.sections.filter((section) => true);

        if (filteredSections.length > 0) {
          filteredData[key] = { ...tab, sections: filteredSections };
          hasResults = true;
        }
      });

      if (!hasResults) {
        setError("No results found for your search");
        setSearchResults(null);
      } else {
        setSearchResults(filteredData);
        setActiveTab(Object.keys(filteredData)[0]);
        setHasSearched(true);
      }
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    performSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setHasSearched(false);
    setSearchResults(null);
    setError(null);
    setExpandedRows({});
  };

  const toggleRow = (sectionId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getColorClasses = (color) => {
    const colors = {
      indigo: {
        border: "border-indigo-500",
        bg: "bg-indigo-500",
        hover: "hover:bg-indigo-600",
        text: "text-indigo-600",
        bgLight: "bg-indigo-50",
        hoverLight: "hover:bg-indigo-100",
      },
      cyan: {
        border: "border-cyan-500",
        bg: "bg-cyan-500",
        hover: "hover:bg-cyan-600",
        text: "text-cyan-600",
        bgLight: "bg-cyan-50",
        hoverLight: "hover:bg-cyan-100",
      },
      purple: {
        border: "border-purple-500",
        bg: "bg-purple-500",
        hover: "hover:bg-purple-600",
        text: "text-purple-600",
        bgLight: "bg-purple-50",
        hoverLight: "hover:bg-purple-100",
      },
    };
    return colors[color];
  };

  const currentData = searchResults?.[activeTab];
  const colorClasses = currentData ? getColorClasses(currentData.color) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                DevHub
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Home
              </a>
              <a href="#" className="text-white border-b-2 border-indigo-400">
                Knowledge Base
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                About
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Hero */}
      <div className="bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Knowledge Base
            </h2>
            <p className="text-xl text-gray-600">
              Search comprehensive project management resources and references
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 mx-auto max-w-4xl p-4">
            {/* 1. Inner Search Bar Container (Input, Clear, and Main Search Button) */}
            <div className="relative flex-1 max-w-2xl w-full">
              {/* Search Icon */}
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search topics, sections, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-[7.5rem] py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                disabled={isSearching}
              />

              {/* Clear Search Button */}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-[5.5rem] top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}

              {/* Main Search Button */}
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
                className={`
        absolute right-2 top-1/2 transform -translate-y-1/2
        bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white 
        disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
        px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium
      `}
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>

            {/* 2. Strict Search Toggle Button */}
            <button
              onClick={handleStrictSearchToggle}
              disabled={isSearching}
              className={`
      flex-shrink-0 h-[46px] min-w-[130px]
      flex items-center justify-center gap-1
      border px-3 py-1.5 rounded-full transition-all duration-200 text-sm font-medium
      ${
        isStrictSearch
          ? "border-indigo-600 text-indigo-600 hover:bg-indigo-50/50"
          : "border-gray-400 text-gray-700 hover:bg-gray-100/50"
      }
      disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed
    `}
              title={
                isStrictSearch
                  ? "Disable Strict Search"
                  : "Enable Strict Search"
              }
            >
              {isStrictSearch ? (
                <LockClosedIcon className="w-4 h-4" />
              ) : (
                <LockOpenIcon className="w-4 h-4" />
              )}
              {isStrictSearch ? "Strict ON" : "Strict OFF"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Reset Button */}
          {hasSearched && searchResults && (
            <div className="mt-4 text-center">
              <button
                onClick={handleReset}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors duration-200"
              >
                ← Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Searching knowledge base...</p>
          </div>
        </div>
      )}

      {/* Results Content */}
      {hasSearched && searchResults && !isSearching && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {Object.entries(searchResults).map(([key, tab]) => {
                  const TabIcon = getIconComponent(tab.icon);
                  // const TabIcon = tab.icon;
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveTab(key);
                        setExpandedRows({});
                      }}
                      className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? `${getColorClasses(tab.color).border} ${
                              getColorClasses(tab.color).text
                            }`
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <TabIcon className="w-5 h-5" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
            {/* section_id = activeTab === "PMBook" ? 1 : activeTab === "PRINCE2" ? 2 : activeTab === "ISO" ? 3 : 0; */}
            {/* Tab Content */}
            <div className="p-6">
              <div className="space-y-3">
                {currentData.sections.map((section) => {
                  const isExpanded = expandedRows[section.id];
                  return (
                    <div
                      key={section.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <button
                        onClick={() => toggleRow(section.id)}
                        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-150"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-lg ${colorClasses.bg} text-white font-semibold`}
                          >
                            {section.number.slice(0, 4)}
                          </div>
                          <div className="text-left flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {section.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-6">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses.bgLight} ${colorClasses.text}`}
                            >
                              {section.count} topics
                            </span>
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="bg-gray-50 border-t border-gray-200">
                          <div className="divide-y divide-gray-200">
                            {section.subsections.map((subsection, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-4 hover:bg-white transition-colors duration-150"
                              >
                                <div className="flex items-center gap-4 flex-1">
                                  <span
                                    className={`px-2 py-1 rounded text-xs font-mono font-semibold ${colorClasses.text} ${colorClasses.bgLight}`}
                                  >
                                    {subsection.section}
                                  </span>
                                  <span className="text-gray-700 font-medium">
                                    {subsection.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-sm text-gray-500 font-medium">
                                    Page {subsection.page}
                                  </span>
                                  <a
                                    href={`${pdfPath}book${section_id}.pdf#page=${subsection.page-1}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${colorClasses.bg} ${colorClasses.hover} text-white text-sm font-medium transition-colors duration-200`}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    Reference
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Stats Footer */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(tabsData).map(([key, tab]) => {
              const totalTopics = tab.sections.reduce(
                (sum, section) => sum + section.count,
                0
              );
              return (
                <div key={key} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{tab.name}</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {totalTopics}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Total Topics</p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg ${
                        getColorClasses(tab.color).bg
                      } flex items-center justify-center`}
                    >
                      <tab.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* Empty State */}
      {!hasSearched && !isSearching && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <MagnifyingGlassIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Start Searching the Knowledge Base
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter keywords to find relevant topics across PMBOK, PRINCE2, and
              ISO resources.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              DevHub
            </h2>
            <p className="text-gray-400 mb-8">
              Building the foundation for your next great leadership role.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
