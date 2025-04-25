import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon, AcademicCapIcon, ClockIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

function MachineLearning() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleAddReview = () => {
    navigate('/course-reviews?course=CS401');
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
    name: "Introduction to Machine Learning",
    code: "CS401",
    instructor: "Dr. Sarah Johnson",
    rating: 4.8,
    totalReviews: 156,
    difficulty: "Advanced",
    workload: "Heavy",
    prerequisites: "Linear Algebra, Statistics, Python Programming",
    description: "This course provides a thorough introduction to the fundamental concepts and techniques of machine learning. Students will explore supervised and unsupervised learning methods, feature engineering, model evaluation, and practical applications. The course balances theoretical foundations with hands-on implementation using Python and popular ML libraries including scikit-learn, TensorFlow, and PyTorch.",
    mainImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    topics: [
      "Introduction to ML & Data Preparation",
      "Linear Regression & Gradient Descent",
      "Logistic Regression & Classification",
      "Decision Trees & Random Forests",
      "Support Vector Machines",
      "Neural Networks Fundamentals",
      "Unsupervised Learning & Clustering",
      "Dimensionality Reduction",
      "Model Evaluation & Validation",
      "Ethical Considerations in ML"
    ],
    skills: [
      { name: "Data Analysis", level: 90 },
      { name: "Predictive Modeling", level: 85 },
      { name: "Python Programming", level: 80 },
      { name: "Feature Engineering", level: 75 },
      { name: "Model Evaluation", level: 88 }
    ]
  };
  
  // All course reviews
  const allReviews = [
    {
      id: 1,
      author: "ML_Enthusiast",
      date: "1 week ago",
      rating: 5,
      review: "Dr. Johnson is fantastic! The projects are very practical and give great hands-on experience with real-world ML problems. I particularly enjoyed the final project where we got to apply various techniques to actual datasets. The professor's industry experience really shines through in how she structures the material.",
      helpful: 43
    },
    {
      id: 2,
      author: "Data_Science_Minor",
      date: "2 weeks ago",
      rating: 4,
      review: "Heavy math content but very rewarding. The programming assignments can be challenging if you're not comfortable with Python, but the TAs are helpful during office hours. Make sure you have a solid foundation in linear algebra before taking this course.",
      helpful: 31
    },
    {
      id: 3,
      author: "FutureDataScientist",
      date: "1 month ago",
      rating: 5,
      review: "One of the best courses I've taken! Dr. Johnson explains complex concepts clearly and the assignments reinforce the material well. The emphasis on both theory and practical implementation gives you a complete understanding of machine learning fundamentals.",
      helpful: 52
    },
    {
      id: 4,
      author: "PythonNewbie",
      date: "1 month ago",
      rating: 3,
      review: "The content is excellent, but I struggled with the programming assignments as my Python skills weren't strong enough. I'd recommend taking an intro Python course before this if you're not already comfortable with it. That said, I learned a ton and the professor is very knowledgeable.",
      helpful: 28
    },
    {
      id: 5,
      author: "GradStudent22",
      date: "2 months ago",
      rating: 5,
      review: "Perfect balance of theory and practice. The mathematics is well-explained and the programming assignments are structured to reinforce your understanding. I especially appreciated how the course covered the intuition behind algorithms before diving into implementation details.",
      helpful: 37
    },
    {
      id: 6,
      author: "AIResearcher",
      date: "3 months ago",
      rating: 5,
      review: "This course provided an excellent foundation for my further studies in AI. The professor is clearly passionate about the subject and brings in cutting-edge research examples. The projects are challenging but designed to gradually build your skills throughout the semester.",
      helpful: 45
    }
  ];

  // Display only first 3 reviews if showAllReviews is false
  const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 3);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Course Image */}
        <div className="relative h-80 bg-gradient-to-r from-green-600 to-blue-500 overflow-hidden">
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
                className={`whitespace-nowrap font-medium px-1 py-1 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('syllabus')}
                className={`whitespace-nowrap font-medium px-1 py-1 border-b-2 transition-colors ${activeTab === 'syllabus' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Syllabus
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`whitespace-nowrap font-medium px-1 py-1 border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
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
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full"
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
                      className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start">
                        <AcademicCapIcon className="h-8 w-8 text-green-500 mr-4" />
                        <div>
                          <h3 className="font-bold text-gray-800">Difficulty</h3>
                          <p className="text-gray-600">{courseDetails.difficulty}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start">
                        <ClockIcon className="h-8 w-8 text-blue-500 mr-4" />
                        <div>
                          <h3 className="font-bold text-gray-800">Workload</h3>
                          <p className="text-gray-600">{courseDetails.workload}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-cyan-500"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start">
                        <ChartBarIcon className="h-8 w-8 text-cyan-500 mr-4" />
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
                        <div className="bg-green-100 text-green-800 h-8 w-8 rounded-full flex items-center justify-center font-bold mr-4">
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
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
                              <div className="bg-green-100 text-green-800 h-10 w-10 rounded-full flex items-center justify-center font-bold mr-3">
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
                          className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
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
                className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl shadow-sm p-6 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-bold mb-3">Share Your Experience</h3>
                <p className="mb-4 text-green-100">Help other students by sharing your experience with this course.</p>
                <button
                  onClick={handleAddReview}
                  className="w-full bg-white text-green-600 font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Write a Review
                </button>
              </motion.div>
              
              {/* Instructor Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">About the Instructor</h3>
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mr-4">
                    SJ
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{courseDetails.instructor}</p>
                    <p className="text-gray-600 text-sm">Associate Professor</p>
                    <p className="text-gray-600 text-sm">Computer Science Department</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Dr. Johnson is a leading researcher in machine learning with previous experience at major 
                  tech companies. Her research focuses on interpretable machine learning models and fairness 
                  in AI systems. She has published extensively in top ML conferences.
                </p>
              </div>
              
              {/* Related Courses */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Related Courses</h3>
                <div className="space-y-4">
                  <motion.div 
                    className="group p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <p className="font-medium text-gray-800 group-hover:text-green-700">Artificial Intelligence</p>
                    <p className="text-sm text-gray-600">CS501 • Prof. James Wilson</p>
                  </motion.div>
                  <motion.div 
                    className="group p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <p className="font-medium text-gray-800 group-hover:text-green-700">Data Structures & Algorithms</p>
                    <p className="text-sm text-gray-600">CS201 • Prof. Michael Chen</p>
                  </motion.div>
                  <motion.div 
                    className="group p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <p className="font-medium text-gray-800 group-hover:text-green-700">Database Systems</p>
                    <p className="text-sm text-gray-600">CS402 • Dr. Lisa Wang</p>
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

export default MachineLearning; 