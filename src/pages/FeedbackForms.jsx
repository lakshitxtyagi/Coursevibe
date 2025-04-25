import React, { useState } from 'react';
import Layout from '../components/Layout';

const FeedbackForms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseCode, setCourseCode] = useState('');

  return (
    <Layout>
      {/* Header Section with Teal Gradient */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-8 mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Feedback Forms</h1>
          <p className="text-teal-100">Complete feedback forms for your courses</p>
        </div>
      </div>

      <main className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Find Course Feedback Forms</h2>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search by course name"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Course code"
                  className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
                <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Feedback Forms</h2>
            <div className="space-y-4">
              <FeedbackCard
                course="Machine Learning (CS401)"
                professor="Prof. Sarah Johnson"
                type="Mid-semester feedback form"
                dueDate="December 15, 2024"
              />
              <FeedbackCard
                course="Data Structures (CS201)"
                professor="Prof. Michael Chen"
                type="End-semester feedback form"
                dueDate="December 20, 2024"
              />
              <FeedbackCard
                course="Algorithms (CS301)"
                professor="Prof. David Lee"
                type="Course improvement survey"
                dueDate="December 18, 2024"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

const FeedbackCard = ({ course, professor, type, dueDate }) => (
  <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h3 className="font-medium text-gray-900">{course}</h3>
        <p className="text-sm text-gray-600">{professor}</p>
        <div className="mt-2 text-sm text-gray-500">
          <p>{type}</p>
          <p className="text-xs mt-1">Due: {dueDate}</p>
        </div>
      </div>
      <a
        href="#"
        className="mt-4 md:mt-0 bg-teal-600 text-white px-4 py-1 rounded-md text-sm hover:bg-teal-700 transition-colors"
      >
        Open Form
      </a>
    </div>
  </div>
);

export default FeedbackForms; 