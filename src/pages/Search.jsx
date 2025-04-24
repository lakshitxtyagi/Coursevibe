import React, { useState } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleClearRecentSearch = (search) => {
    // Implement clear recent search
    console.log('Clearing recent search:', search);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-12 py-4 bg-white rounded-lg shadow-md text-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <svg
            className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Recent Searches */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Searches</h2>
          <div className="space-y-3">
            <RecentSearchItem
              text="Introduction to Computer Science"
              onClear={() => handleClearRecentSearch("Introduction to Computer Science")}
            />
            <RecentSearchItem
              text="Data Structures"
              onClear={() => handleClearRecentSearch("Data Structures")}
            />
          </div>
        </div>

        {/* Trending Searches */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trending Searches</h2>
          <div className="grid grid-cols-2 gap-4">
            <TrendingSearchItem text="Machine Learning" />
            <TrendingSearchItem text="Web Development" />
            <TrendingSearchItem text="Artificial Intelligence" />
            <TrendingSearchItem text="Data Science" />
          </div>
        </div>
      </div>
    </main>
  );
};

const RecentSearchItem = ({ text, onClear }) => (
  <div className="flex items-center justify-between text-gray-600 hover:text-teal-600 cursor-pointer">
    <div className="flex items-center">
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{text}</span>
    </div>
    <button
      onClick={onClear}
      className="text-gray-400 hover:text-gray-600"
    >
      ×
    </button>
  </div>
);

const TrendingSearchItem = ({ text }) => (
  <div className="flex items-center text-gray-600 hover:text-teal-600 cursor-pointer">
    <svg className="w-5 h-5 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
    <span>{text}</span>
  </div>
);

export default Search; 