import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon, AcademicCapIcon, ClockIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

function DataStructures() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleAddReview = () => {
    navigate('/course-reviews?course=CS201');
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
    name: "Data Structures & Algorithms",
    code: "CS201",
    instructor: "Prof. Michael Chen",
    rating: 4.6,
    totalReviews: 203,
    difficulty: "Moderate to Challenging",
    workload: "Medium",
    prerequisites: "Introduction to Programming",
    description: "A comprehensive exploration of fundamental data structures and algorithms that form the backbone of computer science. This course covers array-based structures, linked structures, trees, graphs, sorting, searching, and algorithm analysis. Students will implement these structures in practical programming assignments while learning to analyze algorithm efficiency using Big O notation.",
    mainImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    topics: [
      "Algorithm Analysis & Big O Notation",
      "Arrays & Lists",
      "Stacks & Queues",
      "Linked Lists",
      "Trees & Binary Search Trees",
      "Heaps & Priority Queues",
      "Hash Tables",
      "Graphs & Graph Algorithms",
      "Sorting Algorithms",
      "Advanced Algorithm Design"
    ],
    skills: [
      { name: "Problem Solving", level: 95 },
      { name: "Algorithm Design", level: 90 },
      { name: "Data Structure Implementation", level: 85 },
      { name: "Time & Space Complexity Analysis", level: 80 },
      { name: "Optimization Techniques", level: 75 }
    ]
  };
  
  // All course reviews
  const allReviews = [
    {
      id: 1,
      author: "CS_Major",
      date: "1 week ago",
      rating: 5,
      review: "Excellent course that forms the foundation of computer science. Prof. Chen explains complex concepts clearly with helpful visualizations. The assignments are challenging but well-designed to reinforce the material. Definitely put in the work to understand these concepts as they'll be used in almost every CS course afterward.",
      helpful: 48
    },
    {
      id: 2,
      author: "AlgoEnthusiast",
      date: "2 weeks ago",
      rating: 5,
      review: "One of the best CS courses I've taken. The professor shows genuine interest in student learning and offers clear explanations with real-world examples. The coding assignments were challenging but extremely valuable.",
      helpful: 36
    },
    {
      id: 3,
      author: "JavaDev",
      date: "1 month ago",
      rating: 4,
      review: "Great foundation for any CS student. The course has a good balance of theory and implementation. Be prepared to spend time on the programming assignments - they require careful thought but are rewarding when completed.",
      helpful: 29
    },
    {
      id: 4,
      author: "FirstYearStudent",
      date: "1 month ago",
      rating: 3,
      review: "The content is important but very challenging for a beginner. I had to spend a lot of time in office hours and with study groups. The curve is generous though, and the professor is willing to help if you show effort.",
      helpful: 42
    },
    {
      id: 5,
      author: "SoftwareEngineer",
      date: "2 months ago",
      rating: 5,
      review: "This course directly prepared me for technical interviews. The concepts taught here appear in almost every interview I've had. Prof. Chen's emphasis on algorithm efficiency and clean implementations gave me a strong foundation that I still use in my work.",
      helpful: 53
    },
    {
      id: 6,
      author: "CompSciSophomore",
      date: "3 months ago",
      rating: 4,
      review: "Challenging but absolutely necessary course. The projects helped solidify my understanding of data structures. The exams were difficult but fair, testing conceptual understanding rather than memorization.",
      helpful: 31
    }
  ];

  // Display only first 3 reviews if showAllReviews is false
  const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 3);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Course Image */}
        <div className="relative h-80 bg-gradient-to-r from-orange-600 to-red-500 overflow-hidden">
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
                className={`whitespace-nowrap font-medium px-1 py-1 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('syllabus')}
                className={`whitespace-nowrap font-medium px-1 py-1 border-b-2 transition-colors ${activeTab === 'syllabus' ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Syllabus
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`whitespace-nowrap font-medium px-1 py-1 border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
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
                              className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full"
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
                      className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-orange-500"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start">
                        <AcademicCapIcon className="h-8 w-8 text-orange-500 mr-4" />
                        <div>
                          <h3 className="font-bold text-gray-800">Difficulty</h3>
                          <p className="text-gray-600">{courseDetails.difficulty}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start">
                        <ClockIcon className="h-8 w-8 text-red-500 mr-4" />
                        <div>
                          <h3 className="font-bold text-gray-800">Workload</h3>
                          <p className="text-gray-600">{courseDetails.workload}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-amber-500"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start">
                        <ChartBarIcon className="h-8 w-8 text-amber-500 mr-4" />
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
                        <div className="bg-orange-100 text-orange-800 h-8 w-8 rounded-full flex items-center justify-center font-bold mr-4">
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
                      className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
                              <div className="bg-orange-100 text-orange-800 h-10 w-10 rounded-full flex items-center justify-center font-bold mr-3">
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
                          className="px-6 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
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
                className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-sm p-6 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-bold mb-3">Share Your Experience</h3>
                <p className="mb-4 text-orange-100">Help other students by sharing your experience with this course.</p>
                <button
                  onClick={handleAddReview}
                  className="w-full bg-white text-orange-600 font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Write a Review
                </button>
              </motion.div>
              
              {/* Instructor Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">About the Instructor</h3>
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-orange-600 text-white flex items-center justify-center text-xl font-bold mr-4">
                    MC
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{courseDetails.instructor}</p>
                    <p className="text-gray-600 text-sm">Professor</p>
                    <p className="text-gray-600 text-sm">Computer Science Department</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Prof. Chen specializes in algorithm design and computational complexity. With over 15 years 
                  of teaching experience, he is known for his clear explanations of complex concepts and 
                  dedication to student success. He has received multiple teaching awards at the university.
                </p>
              </div>
              
              {/* Related Courses */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Related Courses</h3>
                <div className="space-y-4">
                  <motion.div 
                    className="group p-3 border border-gray-200 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <p className="font-medium text-gray-800 group-hover:text-orange-700">Introduction to Programming</p>
                    <p className="text-sm text-gray-600">CS101 • Dr. Jessica Taylor</p>
                  </motion.div>
                  <motion.div 
                    className="group p-3 border border-gray-200 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <p className="font-medium text-gray-800 group-hover:text-orange-700">Algorithms Analysis</p>
                    <p className="text-sm text-gray-600">CS301 • Prof. Michael Chen</p>
                  </motion.div>
                  <motion.div 
                    className="group p-3 border border-gray-200 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <p className="font-medium text-gray-800 group-hover:text-orange-700">Software Engineering</p>
                    <p className="text-sm text-gray-600">CS403 • Dr. Rachel Brown</p>
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

export default DataStructures; 