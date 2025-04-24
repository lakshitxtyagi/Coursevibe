import React from 'react';

const Leaderboard = () => {
  return (
    <main className="container mx-auto my-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Top Courses Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Rated Courses</h2>
          <div className="space-y-4">
            <CourseCard 
              rank={1}
              course="Machine Learning (4)"
              instructor="Prof. Sarah Johnson"
              rating={4.9}
              reviews={128}
              review="Excellent course! The professor explains complex concepts clearly."
            />
            <CourseCard 
              rank={2}
              course="Data Structures (4)"
              instructor="Prof. Michael Chen"
              rating={4.8}
              reviews={95}
              review="Very well-structured course with practical assignments."
            />
          </div>
        </div>

        {/* Top Instructors Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Rated Instructors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InstructorCard 
              name="Prof. Sarah Johnson"
              subjects="Machine Learning, AI"
              rating={4.9}
              initials="SJ"
              review="Amazing professor who truly cares about student learning."
            />
            <InstructorCard 
              name="Prof. Michael Chen"
              subjects="Data Structures, Algorithms"
              rating={4.8}
              initials="MC"
              review="Clear explanations and excellent teaching methods."
            />
          </div>
        </div>
      </div>
    </main>
  );
};

const CourseCard = ({ rank, course, instructor, rating, reviews, review }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0">
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0">
          <span className="text-2xl font-bold text-teal-600 mr-4">#{rank}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{course}</h3>
            <p className="text-sm text-gray-600">{instructor}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
              ))}
              <span className="ml-2 text-gray-600">{rating}/5.0 ({reviews} reviews)</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">"{review}"</p>
        </div>
      </div>
    </div>
  </div>
);

const InstructorCard = ({ name, subjects, rating, initials, review }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
        {initials}
      </div>
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{subjects}</p>
        <div className="flex items-center justify-center sm:justify-start mt-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            ))}
            <span className="ml-2 text-gray-600">{rating}/5.0</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-2">"{review}"</p>
      </div>
    </div>
  </div>
);

export default Leaderboard; 