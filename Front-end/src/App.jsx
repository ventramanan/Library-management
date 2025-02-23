import React, { useState, useEffect } from 'react';
import { Search, Book, Users, Calendar, AlertCircle, ArrowUpRight, Filter, ChevronDown, Bookmark, Clock } from 'lucide-react';

const ModernLibraryDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [pendingReturns, setPendingReturns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  useEffect(() => {
    const mockData = [
      {
        memberName: "John Smith",
        bookTitle: "The Great Gatsby",
        issueDate: "2024-02-15",
        targetReturnDate: "2024-03-15",
        status: "warning",
        genre: "Fiction",
        daysLeft: 5
      },
      {
        memberName: "Emma Wilson",
        bookTitle: "1984",
        issueDate: "2024-02-18",
        targetReturnDate: "2024-03-18",
        status: "normal",
        genre: "Science Fiction",
        daysLeft: 8
      },
      {
        memberName: "Michael Brown",
        bookTitle: "To Kill a Mockingbird",
        issueDate: "2024-02-10",
        targetReturnDate: "2024-03-10",
        status: "overdue",
        genre: "Classic",
        daysLeft: -2
      }
    ];
    setPendingReturns(mockData);
  }, []);

  const stats = [
    {
      title: "Books in Circulation",
      value: "324",
      change: "+12.5%",
      icon: <Book className="h-4 w-4" />
    },
    {
      title: "Active Members",
      value: "1,245",
      change: "+3.2%",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Due Today",
      value: "28",
      change: "-5.4%",
      icon: <Clock className="h-4 w-4" />
    },
    {
      title: "Total Collections",
      value: "4,876",
      change: "+2.8%",
      icon: <Bookmark className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'warning':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'overdue':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-green-700 bg-green-50 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Library Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                New Entry
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-500">
                  {stat.icon}
                  <span className="text-sm">{stat.title}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search and Tabs */}
        <div className="mt-8 bg-white rounded-lg border border-gray-100 shadow-sm">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search by member, book, or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-2">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('all')}
                >
                  All Books
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'overdue' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('overdue')}
                >
                  Overdue
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'due' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('due')}
                >
                  Due Soon
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member & Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days Left
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingReturns.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{item.memberName}</span>
                        <span className="text-sm text-gray-500">{item.bookTitle}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.genre}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.issueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${item.daysLeft < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.daysLeft} days
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModernLibraryDashboard;