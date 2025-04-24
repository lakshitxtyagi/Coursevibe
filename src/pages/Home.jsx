import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon } from '@heroicons/react/24/outline';
import { dummyCourses } from '../data/dummyCourses';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const coursesPerPage = 4;
  const totalPages = Math.ceil(dummyCourses.length / coursesPerPage);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    setUsername(user || 'Guest');
  }, []);

  // Stats data
  const stats = {
    colleges: 150,
    students: 25000,
    reviews: 75000
  };

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentCourses = () => {
    const start = currentIndex * coursesPerPage;
    return dummyCourses.slice(start, start + coursesPerPage);
  };

  return (
    <Layout>
      {/* Welcome Animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center"
          >
            Hi Jason!
          </motion.h1>
        </div>
      </motion.div>

      {/* Hero Section with Course Carousel */}
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Discover Your Next Course
            </h1>
            <div className="w-24 h-1 bg-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Explore top-rated courses and make informed decisions with peer reviews
            </p>
          </div>
          
          {/* Course Carousel */}
          <div className="relative">
            <button
              onClick={prevPage}
              className="absolute -left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg text-teal-600 hover:bg-teal-50 z-10"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 lg:grid-cols-2 gap-8"
              >
                {getCurrentCourses().map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => navigate(`/course/${course.code.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="object-cover w-full h-48"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow">
                        <div className="flex items-center">
                          <span className="text-teal-600 font-semibold">{course.rating}</span>
                          <span className="text-yellow-400 ml-1">★</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                          <p className="text-gray-600">{course.instructor}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-500">{course.code} • {course.department}</p>
                        <p className="text-sm text-gray-500">{course.totalReviews} reviews</p>
                      </div>
                      {course.reviews[0] && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                          <div className="flex text-yellow-400 mb-2">
                            {[...Array(course.reviews[0].rating)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 italic">"{course.reviews[0].review}"</p>
                          <p className="text-xs text-gray-500 mt-2">
                            - {course.reviews[0].author}, {course.reviews[0].date}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <button
              onClick={nextPage}
              className="absolute -right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg text-teal-600 hover:bg-teal-50 z-10"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Course Review Button - Moved from fixed position */}
        <div className="flex justify-center mt-12 mb-16 pb-16 w-full ">
          <Link
            to="/course-reviews"
            className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            <PencilIcon className="w-auto h-5" />
            <span>Write a Course Review</span>
          </Link>
        </div>
      </div>

      {/* Enhanced Leaderboard Section */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Enhanced Leaderboard Header */}
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-lg mb-2 block">Top Rated</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Course Leaderboard
            </h2>
            <div className="w-24 h-1 bg-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the highest-rated courses loved by students
            </p>
          </div>
          
          {/* Top 3 Courses */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {dummyCourses
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {/* Medals for top 3 */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      {index === 0 && (
                        <span className="text-4xl" role="img" aria-label="gold medal">🥇</span>
                      )}
                      {index === 1 && (
                        <span className="text-4xl" role="img" aria-label="silver medal">🥈</span>
                      )}
                      {index === 2 && (
                        <span className="text-4xl" role="img" aria-label="bronze medal">🥉</span>
                      )}
                    </div>
                    <div className="flex items-center bg-teal-50 px-3 py-1 rounded-full">
                      <span className="text-teal-600 font-bold text-lg">{course.rating}</span>
                      <span className="text-yellow-400 ml-1">★</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-gray-600 mb-3">{course.instructor}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{course.code}</span>
                    <span>{course.totalReviews} reviews</span>
                  </div>

                  {/* Featured Review */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(course.reviews[0].rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic line-clamp-2">
                      "{course.reviews[0].review}"
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-4xl font-bold text-teal-600">{stats.colleges}+</p>
                <p className="mt-2 text-lg text-gray-600">Colleges</p>
              </motion.div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-4xl font-bold text-teal-600">{stats.students}+</p>
                <p className="mt-2 text-lg text-gray-600">Students</p>
              </motion.div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-4xl font-bold text-teal-600">{stats.reviews}+</p>
                <p className="mt-2 text-lg text-gray-600">Course Reviews</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
