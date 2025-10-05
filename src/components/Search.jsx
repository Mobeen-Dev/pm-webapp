import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, ExternalLink, FileText } from 'lucide-react';

export default function ExpandableTabsPage() {
  const [activeTab, setActiveTab] = useState('pmbok');
  const [expandedRows, setExpandedRows] = useState({});

  // Hardcore data for all 3 sections
  const tabsData = {
    pmbok: {
      name: 'PMBOK Guide',
      icon: BookOpen,
      color: 'indigo',
      sections: [
        {
          id: 1,
          number: '1',
          title: 'Introduction to Project Management',
          count: 15,
          subsections: [
            { section: '1.1', page: 12, title: 'What is a Project?' },
            { section: '1.2', page: 15, title: 'What is Project Management?' },
            { section: '1.3', page: 18, title: 'The Relationship Between Portfolio, Program, and Project Management' },
            { section: '1.4', page: 22, title: 'Project Management Office' },
            { section: '1.5', page: 25, title: 'Relationship Between Project Management, Operations Management, and Organizational Strategy' }
          ]
        },
        {
          id: 2,
          number: '2',
          title: 'The Environment in Which Projects Operate',
          count: 12,
          subsections: [
            { section: '2.1', page: 38, title: 'Enterprise Environmental Factors' },
            { section: '2.2', page: 42, title: 'Organizational Process Assets' },
            { section: '2.3', page: 45, title: 'Organizational Systems' },
            { section: '2.4', page: 48, title: 'Organizational Culture and Style' }
          ]
        },
        {
          id: 3,
          number: '3',
          title: 'The Role of the Project Manager',
          count: 18,
          subsections: [
            { section: '3.1', page: 52, title: 'Definition of a Project Manager' },
            { section: '3.2', page: 55, title: 'The Project Manager\'s Sphere of Influence' },
            { section: '3.3', page: 58, title: 'Project Manager Competences' },
            { section: '3.4', page: 62, title: 'Performing Integration' },
            { section: '3.5', page: 65, title: 'Leadership Skills' },
            { section: '3.6', page: 68, title: 'Technical Project Management Skills' }
          ]
        },
        {
          id: 4,
          number: '4',
          title: 'Project Integration Management',
          count: 22,
          subsections: [
            { section: '4.1', page: 75, title: 'Develop Project Charter' },
            { section: '4.2', page: 82, title: 'Develop Project Management Plan' },
            { section: '4.3', page: 88, title: 'Direct and Manage Project Work' },
            { section: '4.4', page: 94, title: 'Manage Project Knowledge' },
            { section: '4.5', page: 98, title: 'Monitor and Control Project Work' },
            { section: '4.6', page: 105, title: 'Perform Integrated Change Control' },
            { section: '4.7', page: 112, title: 'Close Project or Phase' }
          ]
        },
        {
          id: 5,
          number: '5',
          title: 'Project Scope Management',
          count: 20,
          subsections: [
            { section: '5.1', page: 130, title: 'Plan Scope Management' },
            { section: '5.2', page: 135, title: 'Collect Requirements' },
            { section: '5.3', page: 142, title: 'Define Scope' },
            { section: '5.4', page: 148, title: 'Create WBS' },
            { section: '5.5', page: 155, title: 'Validate Scope' },
            { section: '5.6', page: 160, title: 'Control Scope' }
          ]
        }
      ]
    },
    agile: {
      name: 'Agile Practices',
      icon: FileText,
      color: 'cyan',
      sections: [
        {
          id: 1,
          number: '1',
          title: 'Agile Mindset and Principles',
          count: 14,
          subsections: [
            { section: '1.1', page: 8, title: 'The Agile Manifesto' },
            { section: '1.2', page: 12, title: '12 Principles Behind the Agile Manifesto' },
            { section: '1.3', page: 16, title: 'Values and Principles' },
            { section: '1.4', page: 20, title: 'Agile vs Traditional Approaches' },
            { section: '1.5', page: 24, title: 'When to Use Agile' }
          ]
        },
        {
          id: 2,
          number: '2',
          title: 'Scrum Framework',
          count: 25,
          subsections: [
            { section: '2.1', page: 32, title: 'Scrum Theory and Values' },
            { section: '2.2', page: 36, title: 'Scrum Team Structure' },
            { section: '2.3', page: 40, title: 'Product Owner Role' },
            { section: '2.4', page: 45, title: 'Scrum Master Role' },
            { section: '2.5', page: 50, title: 'Development Team' },
            { section: '2.6', page: 55, title: 'Scrum Events' },
            { section: '2.7', page: 60, title: 'Sprint Planning' },
            { section: '2.8', page: 65, title: 'Daily Scrum' }
          ]
        },
        {
          id: 3,
          number: '3',
          title: 'Kanban Method',
          count: 16,
          subsections: [
            { section: '3.1', page: 75, title: 'Kanban Principles' },
            { section: '3.2', page: 80, title: 'Visualizing Work' },
            { section: '3.3', page: 85, title: 'Limiting Work in Progress' },
            { section: '3.4', page: 90, title: 'Managing Flow' },
            { section: '3.5', page: 95, title: 'Making Policies Explicit' }
          ]
        },
        {
          id: 4,
          number: '4',
          title: 'Extreme Programming (XP)',
          count: 19,
          subsections: [
            { section: '4.1', page: 105, title: 'XP Values' },
            { section: '4.2', page: 110, title: 'XP Practices' },
            { section: '4.3', page: 115, title: 'Pair Programming' },
            { section: '4.4', page: 120, title: 'Test-Driven Development' },
            { section: '4.5', page: 125, title: 'Continuous Integration' },
            { section: '4.6', page: 130, title: 'Refactoring' }
          ]
        },
        {
          id: 5,
          number: '5',
          title: 'Scaling Agile',
          count: 21,
          subsections: [
            { section: '5.1', page: 142, title: 'SAFe Framework' },
            { section: '5.2', page: 148, title: 'LeSS Framework' },
            { section: '5.3', page: 154, title: 'Disciplined Agile' },
            { section: '5.4', page: 160, title: 'Nexus Framework' },
            { section: '5.5', page: 166, title: 'Scrum of Scrums' }
          ]
        }
      ]
    },
    leadership: {
      name: 'Leadership & Strategy',
      icon: BookOpen,
      color: 'purple',
      sections: [
        {
          id: 1,
          number: '1',
          title: 'Leadership Fundamentals',
          count: 17,
          subsections: [
            { section: '1.1', page: 10, title: 'What is Leadership?' },
            { section: '1.2', page: 15, title: 'Leadership vs Management' },
            { section: '1.3', page: 20, title: 'Leadership Styles' },
            { section: '1.4', page: 25, title: 'Situational Leadership' },
            { section: '1.5', page: 30, title: 'Transformational Leadership' },
            { section: '1.6', page: 35, title: 'Servant Leadership' }
          ]
        },
        {
          id: 2,
          number: '2',
          title: 'Team Building and Motivation',
          count: 23,
          subsections: [
            { section: '2.1', page: 45, title: 'Building High-Performance Teams' },
            { section: '2.2', page: 50, title: 'Team Development Stages' },
            { section: '2.3', page: 55, title: 'Motivation Theories' },
            { section: '2.4', page: 60, title: 'Maslow\'s Hierarchy of Needs' },
            { section: '2.5', page: 65, title: 'Herzberg\'s Two-Factor Theory' },
            { section: '2.6', page: 70, title: 'McGregor\'s Theory X and Y' },
            { section: '2.7', page: 75, title: 'Conflict Resolution' }
          ]
        },
        {
          id: 3,
          number: '3',
          title: 'Strategic Thinking',
          count: 19,
          subsections: [
            { section: '3.1', page: 88, title: 'Strategic Planning Process' },
            { section: '3.2', page: 94, title: 'SWOT Analysis' },
            { section: '3.3', page: 100, title: 'Porter\'s Five Forces' },
            { section: '3.4', page: 106, title: 'Balanced Scorecard' },
            { section: '3.5', page: 112, title: 'OKRs and KPIs' }
          ]
        },
        {
          id: 4,
          number: '4',
          title: 'Communication and Influence',
          count: 20,
          subsections: [
            { section: '4.1', page: 125, title: 'Effective Communication' },
            { section: '4.2', page: 130, title: 'Active Listening' },
            { section: '4.3', page: 135, title: 'Stakeholder Management' },
            { section: '4.4', page: 140, title: 'Negotiation Skills' },
            { section: '4.5', page: 145, title: 'Influence Without Authority' },
            { section: '4.6', page: 150, title: 'Presentation Skills' }
          ]
        },
        {
          id: 5,
          number: '5',
          title: 'Change Management',
          count: 18,
          subsections: [
            { section: '5.1', page: 162, title: 'Understanding Change' },
            { section: '5.2', page: 168, title: 'Kotter\'s 8-Step Process' },
            { section: '5.3', page: 174, title: 'ADKAR Model' },
            { section: '5.4', page: 180, title: 'Overcoming Resistance' },
            { section: '5.5', page: 186, title: 'Leading Through Change' }
          ]
        }
      ]
    }
  };

  const toggleRow = (sectionId) => {
    setExpandedRows(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const currentData = tabsData[activeTab];
  const IconComponent = currentData.icon;

  const getColorClasses = (color) => {
    const colors = {
      indigo: {
        border: 'border-indigo-500',
        bg: 'bg-indigo-500',
        hover: 'hover:bg-indigo-600',
        text: 'text-indigo-600',
        bgLight: 'bg-indigo-50',
        hoverLight: 'hover:bg-indigo-100'
      },
      cyan: {
        border: 'border-cyan-500',
        bg: 'bg-cyan-500',
        hover: 'hover:bg-cyan-600',
        text: 'text-cyan-600',
        bgLight: 'bg-cyan-50',
        hoverLight: 'hover:bg-cyan-100'
      },
      purple: {
        border: 'border-purple-500',
        bg: 'bg-purple-500',
        hover: 'hover:bg-purple-600',
        text: 'text-purple-600',
        bgLight: 'bg-purple-50',
        hoverLight: 'hover:bg-purple-100'
      }
    };
    return colors[color];
  };

  const colorClasses = getColorClasses(currentData.color);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Navigation Header */}
      <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-40 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                DevHub
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                Home
              </a>
              <a href="#" className="text-white border-b-2 border-indigo-400">
                Knowledge Base
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                About
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Knowledge Base</h1>
          <p className="text-xl text-gray-600">Explore comprehensive project management resources and references</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {Object.entries(tabsData).map(([key, tab]) => {
                const TabIcon = tab.icon;
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
                        ? `${getColorClasses(tab.color).border} ${getColorClasses(tab.color).text}`
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <TabIcon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="space-y-3">
              {currentData.sections.map((section) => {
                const isExpanded = expandedRows[section.id];
                return (
                  <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                    {/* Main Row */}
                    <button
                      onClick={() => toggleRow(section.id)}
                      className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${colorClasses.bg} text-white font-semibold`}>
                          {section.number}
                        </div>
                        <div className="text-left flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses.bgLight} ${colorClasses.text}`}>
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

                    {/* Expanded Subsections */}
                    {isExpanded && (
                      <div className="bg-gray-50 border-t border-gray-200">
                        <div className="divide-y divide-gray-200">
                          {section.subsections.map((subsection, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-4 hover:bg-white transition-colors duration-150"
                            >
                              <div className="flex items-center gap-4 flex-1">
                                <span className={`px-2 py-1 rounded text-xs font-mono font-semibold ${colorClasses.text} ${colorClasses.bgLight}`}>
                                  {subsection.section}
                                </span>
                                <span className="text-gray-700 font-medium">{subsection.title}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 font-medium">Page {subsection.page}</span>
                                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${colorClasses.bg} ${colorClasses.hover} text-white text-sm font-medium transition-colors duration-200`}>
                                  <ExternalLink className="w-4 h-4" />
                                  Reference
                                </button>
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
            const totalTopics = tab.sections.reduce((sum, section) => sum + section.count, 0);
            return (
              <div key={key} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{tab.name}</p>
                    <p className="text-3xl font-bold text-gray-900">{totalTopics}</p>
                    <p className="text-sm text-gray-500 mt-1">Total Topics</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${getColorClasses(tab.color).bg} flex items-center justify-center`}>
                    <tab.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 w-full mt-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              DevHub
            </h2>
            <p className="text-gray-400 mb-8">Building the foundation for your next great leadership role.</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}