import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock, DollarSign, BookOpen, Calendar, Activity, Target } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d');

  // Reader Growth Data
  const readerGrowthData = [
    { month: 'Jan', free: 1200, paid: 450, total: 1650 },
    { month: 'Feb', free: 1450, paid: 520, total: 1970 },
    { month: 'Mar', free: 1680, paid: 630, total: 2310 },
    { month: 'Apr', free: 1920, paid: 780, total: 2700 },
    { month: 'May', free: 2250, paid: 920, total: 3170 },
    { month: 'Jun', free: 2580, paid: 1150, total: 3730 },
    { month: 'Jul', free: 2890, paid: 1340, total: 4230 },
    { month: 'Aug', free: 3200, paid: 1580, total: 4780 },
    { month: 'Sep', free: 3450, paid: 1820, total: 5270 },
    { month: 'Oct', free: 3720, paid: 2100, total: 5820 },
    { month: 'Nov', free: 4050, paid: 2380, total: 6430 },
    { month: 'Dec', free: 4420, paid: 2720, total: 7140 }
  ];

  // Time Spent Data (Hours per day)
  const timeSpentData = [
    { time: '6AM', users: 120 },
    { time: '9AM', users: 850 },
    { time: '12PM', users: 1420 },
    { time: '3PM', users: 1680 },
    { time: '6PM', users: 2340 },
    { time: '9PM', users: 2890 },
    { time: '12AM', users: 980 }
  ];

  // Plan Distribution
  const planData = [
    { name: 'Free Plan', value: 4420, color: '#6366f1' },
    { name: 'Basic Plan', value: 1520, color: '#8b5cf6' },
    { name: 'Pro Plan', value: 890, color: '#06b6d4' },
    { name: 'Enterprise', value: 310, color: '#10b981' }
  ];

  // Content Performance
  const contentData = [
    { category: 'PMBOK', views: 3200, engagement: 85 },
    { category: 'Agile', views: 2800, engagement: 78 },
    { category: 'Leadership', views: 2400, engagement: 82 },
    { category: 'Risk Mgmt', views: 1900, engagement: 75 },
    { category: 'Scrum', views: 2100, engagement: 88 },
    { category: 'Strategy', views: 1600, engagement: 72 }
  ];

  // Revenue Data
  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15200 },
    { month: 'Mar', revenue: 18900 },
    { month: 'Apr', revenue: 22400 },
    { month: 'May', revenue: 26800 },
    { month: 'Jun', revenue: 31200 },
    { month: 'Jul', revenue: 35600 },
    { month: 'Aug', revenue: 40200 },
    { month: 'Sep', revenue: 45800 },
    { month: 'Oct', revenue: 51200 },
    { month: 'Nov', revenue: 57400 },
    { month: 'Dec', revenue: 64800 }
  ];

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="w-4 h-4" />
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );

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
                Analytics
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                About
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Overview</h1>
            <p className="text-lg text-gray-600">Track your platform's growth and engagement metrics</p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value="7,140"
            change={18.2}
            color="from-indigo-500 to-purple-600"
          />
          <StatCard
            icon={DollarSign}
            title="Monthly Revenue"
            value="$64.8K"
            change={12.8}
            color="from-green-500 to-emerald-600"
          />
          <StatCard
            icon={BookOpen}
            title="Active Readers"
            value="5,280"
            change={22.5}
            color="from-cyan-500 to-blue-600"
          />
          <StatCard
            icon={Clock}
            title="Avg. Time Spent"
            value="48m"
            change={8.3}
            color="from-purple-500 to-pink-600"
          />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Reader Growth Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Reader Growth</h2>
                <p className="text-sm text-gray-500">Monthly user acquisition trends</p>
              </div>
              <Activity className="w-6 h-6 text-indigo-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={readerGrowthData}>
                <defs>
                  <linearGradient id="colorFree" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="free" stroke="#6366f1" fillOpacity={1} fill="url(#colorFree)" name="Free Users" />
                <Area type="monotone" dataKey="paid" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPaid)" name="Paid Users" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Revenue Growth</h2>
                <p className="text-sm text-gray-500">Monthly recurring revenue</p>
              </div>
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Peak Usage Time */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Peak Usage Times</h2>
                <p className="text-sm text-gray-500">Active users by time of day</p>
              </div>
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeSpentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="users" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Plan Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Plan Distribution</h2>
                <p className="text-sm text-gray-500">User subscription breakdown</p>
              </div>
              <Target className="w-6 h-6 text-cyan-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Performance */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Content Performance</h2>
              <p className="text-sm text-gray-500">Views and engagement by category</p>
            </div>
            <BookOpen className="w-6 h-6 text-indigo-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="category" type="category" stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="views" fill="#6366f1" radius={[0, 8, 8, 0]} name="Views" />
              <Bar dataKey="engagement" fill="#06b6d4" radius={[0, 8, 8, 0]} name="Engagement %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <Calendar className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-lg font-semibold mb-2">Best Day</h3>
            <p className="text-3xl font-bold mb-2">Thursday</p>
            <p className="text-sm opacity-90">Highest engagement at 9 PM</p>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
            <Users className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-lg font-semibold mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold mb-2">38.2%</p>
            <p className="text-sm opacity-90">Free to Paid conversion</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <TrendingUp className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-lg font-semibold mb-2">Growth Rate</h3>
            <p className="text-3xl font-bold mb-2">+24.5%</p>
            <p className="text-sm opacity-90">Month over month</p>
          </div>
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