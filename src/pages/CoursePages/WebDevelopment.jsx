import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon, AcademicCapIcon, ClockIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

function WebDevelopment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleAddReview = () => {
    navigate('/course-reviews?course=CS301');
  };
  
  // Fade-in animation for section loading
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Course details
  const courseDetails = {
    name: "Full Stack Web Development",
    code: "CS301",
    instructor: "Prof. Emily Rodriguez",
    rating: 4.7,
    totalReviews: 38,
    difficulty: "Intermediate",
    workload: "Medium-Heavy",
    prerequisites: "Basic Programming",
    description: "This comprehensive course covers all aspects of modern web development, from building responsive front-end interfaces to developing robust back-end services. Students will gain practical experience with HTML, CSS, JavaScript, React, Node.js, and database technologies while working on real-world projects throughout the semester.",
    mainImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    topics: [
      "HTML5 & CSS3 Fundamentals",
      "JavaScript & Modern ES6+ Features",
      "React.js & Component Architecture",
      "Node.js & Express Backend Development",
      "MongoDB & Database Design",
      "RESTful API Development",
      "Authentication & Authorization",
      "Responsive Web Design",
      "Progressive Web Applications",
      "Testing & Deployment"
    ],
    skills: [
      { name: "Frontend Development", level: 90 },
      { name: "Backend Development", level: 85 },
      { name: "Database Management", level: 75 },
      { name: "API Design", level: 80 },
      { name: "UI/UX Fundamentals", level: 70 }
    ]
  };
  
  // All course reviews
  const allReviews = [
    {
      id: 1,
      author: "Future Developer",
      date: "12 hours ago",
      rating: 5,
      review: "Amazing course! Built a full-stack application from scratch. Prof. Rodriguez is always available for help during office hours. The course materials are very well organized and the pace is perfect for someone with some programming background. I especially enjoyed the group project where we got to build our own web application from scratch. Highly recommended!",
      helpful: 24
    },
    {
      id: 2,
      author: "Web Dev Newbie",
      date: "4 days ago",
      rating: 4,
      review: "Great introduction to modern web technologies. The final project is intense but very rewarding. I struggled a bit with the Node.js section but the TAs were helpful during office hours.",
      helpful: 18
    },
    {
      id: 3,
      author: "CodeMaster42",
      date: "2 weeks ago",
      rating: 5,
      review: "This course changed my career path! I was skeptical about web development before, but the hands-on approach and real-world projects made me fall in love with it. Professor Rodriguez explains complex concepts in an accessible way.",
      helpful: 32
    },
    {
      id: 4,
      author: "JS_Enthusiast",
      date: "1 month ago",
      rating: 4,
      review: "The JavaScript deep dives were fantastic. I already had some web dev experience, but I learned so many new techniques and best practices. The only downside was that sometimes the lectures went a bit fast for beginners.",
      helpful: 15
    },
    {
      id: 5,
      author: "DevNewcomer",
      date: "1 month ago",
      rating: 3,
      review: "Content is great but be prepared for a heavy workload. The assignments took me much longer than expected, and sometimes the requirements weren't completely clear. The professor is knowledgeable but expect to do a lot of independent learning.",
      helpful: 27
    },
    {
      id: 6,
      author: "FullStackLearner",
      date: "2 months ago",
      rating: 5,
      review: "The best technical course I've taken at the university! The balance between theory and practice is perfect. I especially appreciated how the course covers both frontend and backend technologies coherently. The progressive project approach helped me build something impressive for my portfolio.",
      helpful: 41
    }
  ];

  // Display only first 3 reviews if showAllReviews is false
  const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 3);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Course Image */}
        <div className="relative h-80 bg-gradient-to-r from-blue-600 to-teal-500 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img 
            src={courseDetails.mainImage} 
            alt={courseDetails.name} 
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg w-full max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-2">{courseDetails.name}</h1>
              <div className="flex items-center mb-2">
                <div className="bg-yellow-400 text-gray-900 font-bold px-2 py-1 rounded-lg text-sm flex items-center mr-3">
                  <StarIcon className="h-4 w-4 mr-1" />
                  {courseDetails.rating}
                </div>
                <span className="text-white">{courseDetails.totalReviews} reviews</span>
              </div>
              <p className="text-white text-opacity-90">
                Instructor: {courseDetails.instructor} • Course Code: {courseDetails.code}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="sticky top-20 bg-white shadow-md z-10">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto space-x-8 py-4">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`whitespace-nowrap font-medium px-1 py-1 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('syllabus')}
                className={`whitespace-nowrap font-medium px-1 py-1 border-b-2 transition-colors ${activeTab === 'syllabus' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Syllabus
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`whitespace-nowrap font-medium px-1 py-1 border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Reviews
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="space-y-6"
                >
                  {/* Course Description */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {courseDetails.description}
                    </p>
                  </div>
                  
                  {/* Skills You'll Gain */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Skills You'll Gain</h2>
                    <div className="space-y-4">
                      {courseDetails.skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-800">{skill.name}</span>
                            <span className="text-gray-500">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <motion.div 
                              className="bg-gradient-to-r from-blue-600 to-teal-500 h-2.5 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quick Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div 
                      className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start">
                        <AcademicCapIcon className="h-8 w-8 text-blue-500 mr-4" />
                        <div>
                          <h3 className="font-bold text-gray-800">Difficulty</h3>
                          <p className="text-gray-600">{courseDetails.difficulty}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-teal-500"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start">
                        <ClockIcon className="h-8 w-8 text-teal-500 mr-4" />
                        <div>
                          <h3 className="font-bold text-gray-800">Workload</h3>
                          <p className="text-gray-600">{courseDetails.workload}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start">
                        <ChartBarIcon className="h-8 w-8 text-purple-500 mr-4" />
                        <div>
                          <h3 className="font-bold text-gray-800">Prerequisites</h3>
                          <p className="text-gray-600">{courseDetails.prerequisites}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {/* Syllabus Tab */}
              {activeTab === 'syllabus' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Course Syllabus</h2>
                  
                  <div className="space-y-6">
                    {courseDetails.topics.map((topic, index) => (
                      <motion.div 
                        key={index}
                        className="flex p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="bg-teal-100 text-teal-800 h-8 w-8 rounded-full flex items-center justify-center font-bold mr-4">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{topic}</h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Student Reviews</h2>
                    <button
                      onClick={handleAddReview}
                      className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <PencilSquareIcon className="h-5 w-5 mr-2" />
                      Add Review
                    </button>
                  </div>
                  
                  {/* Rating Summary Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="text-center mb-6 md:mb-0 md:mr-8">
                        <div className="text-5xl font-bold text-gray-800">{courseDetails.rating}</div>
                        <div className="flex justify-center my-2">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i} 
                              className={`h-6 w-6 ${i < Math.floor(courseDetails.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <div className="text-gray-600">{courseDetails.totalReviews} reviews</div>
                      </div>
                      
                      <div className="w-full md:border-l md:pl-8 md:border-gray-200">
                        <div className="space-y-3">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count = allReviews.filter(r => r.rating === star).length;
                            const percentage = (count / allReviews.length) * 100;
                            
                            return (
                              <div key={star} className="flex items-center">
                                <div className="w-20 text-sm text-gray-600">{star} stars</div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                                  <motion.div 
                                    className="bg-yellow-400 h-2.5 rounded-full" 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.8 }}
                                  ></motion.div>
                                </div>
                                <div className="w-16 text-sm text-right text-gray-600">{count}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {displayedReviews.map((review, index) => (
                      <motion.div 
                        key={review.id}
                        className="bg-white rounded-xl shadow-sm p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center">
                              <div className="bg-teal-100 text-teal-800 h-10 w-10 rounded-full flex items-center justify-center font-bold mr-3">
                                {review.author.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold">{review.author}</p>
                                <p className="text-sm text-gray-500">Posted: {review.date}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{review.review}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          <span>{review.helpful} people found this helpful</span>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Show More/Less Button */}
                    {allReviews.length > 3 && (
                      <div className="text-center pt-4">
                        <button
                          onClick={() => setShowAllReviews(!showAllReviews)}
                          className="px-6 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                        >
                          {showAllReviews ? 'Show Less Reviews' : `Show All Reviews (${allReviews.length})`}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Add Review Card */}
              <motion.div 
                className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl shadow-sm p-6 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-bold mb-3">Share Your Experience</h3>
                <p className="mb-4 text-teal-100">Help other students by sharing your experience with this course.</p>
                <button
                  onClick={handleAddReview}
                  className="w-full bg-white text-teal-600 font-medium px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  Write a Review
                </button>
              </motion.div>
              
              {/* Instructor Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">About the Instructor</h3>
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold mr-4">
                    ER
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{courseDetails.instructor}</p>
                    <p className="text-gray-600 text-sm">Associate Professor</p>
                    <p className="text-gray-600 text-sm">Computer Science Department</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Prof. Rodriguez has over 10 years of industry experience as a full-stack developer 
                  before joining academia. Her research focuses on modern web technologies and user experience design.
                </p>
              </div>
              
              {/* Related Courses */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Related Courses</h3>
                <div className="space-y-4">
                  <motion.div 
                    className="group p-3 border border-gray-200 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <p className="font-medium text-gray-800 group-hover:text-teal-700">Mobile App Development</p>
                    <p className="text-sm text-gray-600">CS405 • Prof. Emily Martinez</p>
                  </motion.div>
                  <motion.div 
                    className="group p-3 border border-gray-200 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <p className="font-medium text-gray-800 group-hover:text-teal-700">Database Systems</p>
                    <p className="text-sm text-gray-600">CS402 • Dr. Lisa Wang</p>
                  </motion.div>
                  <motion.div 
                    className="group p-3 border border-gray-200 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <p className="font-medium text-gray-800 group-hover:text-teal-700">Cloud Computing</p>
                    <p className="text-sm text-gray-600">CS406 • Prof. Thomas Anderson</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default WebDevelopment; 