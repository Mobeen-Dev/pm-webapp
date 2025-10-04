import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Pre-entered search values
  const searchSuggestions = [
    "Risk Management",
    "Quality Management",
    "Stakeholder Engagement",
    "Project Planning ",
    "Project Governance",
    "Change Management",
    "Resource Management",
  ];

  useEffect(() => {
    const filtered = searchSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setSelectedIndex(-1);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsSearchActive(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setIsSearchActive(false);
    // Handle search action here
    console.log("Searching for:", suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSuggestionClick(filteredSuggestions[selectedIndex]);
      } else if (searchTerm.trim()) {
        setIsSearchActive(false);
        console.log("Searching for:", searchTerm);
      }
    } else if (e.key === "Escape") {
      setIsSearchActive(false);
      setSelectedIndex(-1);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearchActive(false);
    setSelectedIndex(-1);
    searchRef.current?.focus();
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    console.log("UI/UX Design");
    highlightText("UI/UX Design");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Navigation Header */}
      <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-40 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                PM Codex
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Portfolio
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                About
              </a>
              <button className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-indigo-500/20">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative  w-full">
        {/* Hero Section */}
        <div className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-screen  w-full">
          {/* Background Pattern */}
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <div className="absolute top-0 w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10"></div>
            <div className="absolute inset-0 bg-white/50"></div>
          </div>

          <div className=" w-full relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="items-center flex flex-wrap">
              <div className="w-full text-center">
                {/* Main Heading */}
                <div className="mb-12">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                      Find Your
                    </span>
                    <br />
                    <span className="text-gray-800">Perfect Solution</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Unlock high-performance project delivery. Discover
                    expert-curated books and actionable solutions tailored to
                    elevate your team's success.
                  </p>
                </div>

                {/* Search Bar Container */}
                <div className="max-w-2xl mx-auto mb-12" ref={searchRef}>
                  <div className="relative">
                    {/* Search Input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsSearchActive(true)}
                        placeholder="Search for books, methodologies, PMP guides, or topics..."
                        className="w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-200"
                      />
                      {searchTerm && (
                        <button
                          onClick={clearSearch}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      )}
                    </div>

                    {/* Search Suggestions */}
                    {isSearchActive && filteredSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
                        {filteredSuggestions
                          .slice(0, 8)
                          .map((suggestion, index) => (
                            <button
                              key={suggestion}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={`w-full text-left px-6 py-3 hover:bg-indigo-50 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl ${
                                index === selectedIndex
                                  ? "bg-indigo-50 text-indigo-700"
                                  : "text-gray-700"
                              }`}
                            >
                              <div className="flex items-center">
                                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 mr-3" />
                                <span className="text-base">{suggestion}</span>
                              </div>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-indigo-600 px-6 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
                    Custom Search
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-indigo-600 px-6 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
                    View Full Library
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-indigo-600 px-6 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
                    Books Special Topics
                  </button>
                  {/* <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-indigo-600 px-6 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
                    API Integration
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-20 bg-white/50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Leverage our intuitive platform for easy access, powerful
                search, and digital tools designed to fit the demanding schedule
                of a project manager.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Blazing Fast
                </h3>
                <p className="text-gray-600">
                  Expect and receive exceptional user experience, powered by
                  expertly optimized, modern technologies.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Reliable
                </h3>
                <p className="text-gray-600">
                  Trusted by thousands of managers worldwide with 99.9% uptime
                  guarantee.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  User Friendly
                </h3>
                <p className="text-gray-600">
                  Intuitive interface designed with user experience as our top
                  priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
};

export default HomePage;
