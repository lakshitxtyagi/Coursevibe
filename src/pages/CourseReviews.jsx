import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { dummyCourses } from '../data/dummyCourses';

const API_BASE_URL = "http://127.0.0.1:8000";

const CourseReviews = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [reviewStage, setReviewStage] = useState('writing'); // 'writing' or 'validation'
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    courseRating: 0,
    instructorRating: 0,
    review: '',
    author: 'Anonymous',
    date: new Date().toLocaleDateString(),
    validationAnswers: {}
  });
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // Check if API server is running
    fetch(`${API_BASE_URL}/courses`)
      .then((res) => {
        console.log("API server status:", res.status);
        if (!res.ok) {
          console.error("API server may not be running correctly");
        }
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        // Also set dummyCourses as a fallback
        if (data.length === 0) {
          setCourses(dummyCourses);
        }
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        // Use dummy courses if API fails
        setCourses(dummyCourses);
        console.log("Using dummy course data instead");
      });

    fetchReviews();
    
    // Handle click outside search results
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Check if there's a courseId from URL params or state
    const params = new URLSearchParams(location.search);
    const preselectedCourseCode = params.get('course');
    
    if (preselectedCourseCode) {
      // Find the course in dummyCourses
      const selectedCourse = dummyCourses.find(
        course => course.code.toLowerCase() === preselectedCourseCode.toLowerCase()
      );
      
      if (selectedCourse) {
        setFormData(prev => ({
          ...prev,
          courseCode: selectedCourse.code,
          courseName: selectedCourse.name
        }));
        setSearchQuery(selectedCourse.name);
      }
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location]);

  // Update search results when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredResults = dummyCourses.filter(course => 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      courseCode: '',
      courseName: '',
      courseRating: 0,
      instructorRating: 0,
      review: '',
      author: 'Anonymous',
      date: new Date().toLocaleDateString(),
      validationAnswers: {}
    });
    setReviewStage('writing');
    setDynamicQuestions([]);
    setSearchQuery('');
  };

  // Generate validation questions based on review content and ratings
  const generateValidationQuestions = () => {
    const review = formData.review.toLowerCase();
    const courseRating = formData.courseRating;
    const instructorRating = formData.instructorRating;
    
    // Generate questions based on sentiment
    let questions = [];
    
    // Negative sentiment (low ratings or negative language)
    if (courseRating <= 2 || instructorRating <= 2 || 
        containsNegativeTerms(review)) {
      questions.push({
        id: 'attendance',
        question: 'How often did you attend this course?',
        options: [
          { value: 'always', label: 'Always (90-100% attendance)' },
          { value: 'mostly', label: 'Mostly (70-90% attendance)' },
          { value: 'sometimes', label: 'Sometimes (50-70% attendance)' },
          { value: 'rarely', label: 'Rarely (less than 50% attendance)' }
        ]
      });
      
      questions.push({
        id: 'grade_expectation',
        question: 'What grade do you expect to receive in this course?',
        options: [
          { value: 'a', label: 'A or A+' },
          { value: 'b', label: 'B+ or B' },
          { value: 'c', label: 'C+ or C' },
          { value: 'd_or_lower', label: 'D+ or lower' }
        ]
      });
      
      questions.push({
        id: 'study_hours',
        question: 'How many hours per week did you dedicate to studying for this course outside of class?',
        options: [
          { value: 'minimal', label: 'Less than 2 hours' },
          { value: 'few', label: '2-5 hours' },
          { value: 'moderate', label: '5-10 hours' },
          { value: 'extensive', label: 'More than 10 hours' }
        ]
      });
    } 
    // Positive sentiment (high ratings or positive language)
    else if (courseRating >= 4 || instructorRating >= 4 || 
             containsPositiveTerms(review)) {
      questions.push({
        id: 'prior_knowledge',
        question: 'How much knowledge did you have about this subject before taking the course?',
        options: [
          { value: 'none', label: 'No prior knowledge' },
          { value: 'basic', label: 'Basic understanding' },
          { value: 'intermediate', label: 'Intermediate knowledge' },
          { value: 'advanced', label: 'Advanced knowledge' }
        ]
      });
      
      questions.push({
        id: 'career_relevance',
        question: 'How relevant is this course to your career goals?',
        options: [
          { value: 'highly_relevant', label: 'Highly relevant' },
          { value: 'somewhat_relevant', label: 'Somewhat relevant' },
          { value: 'slightly_relevant', label: 'Slightly relevant' },
          { value: 'not_relevant', label: 'Not relevant' }
        ]
      });
      
      questions.push({
        id: 'engagement',
        question: 'How engaging was the course content and teaching methods?',
        options: [
          { value: 'very_engaging', label: 'Very engaging' },
          { value: 'somewhat_engaging', label: 'Somewhat engaging' },
          { value: 'neutral', label: 'Neutral' },
          { value: 'not_engaging', label: 'Not engaging' }
        ]
      });
    } 
    // Neutral sentiment (mid-range ratings)
    else {
      questions.push({
        id: 'difficulty',
        question: 'How would you rate the overall difficulty of the course?',
        options: [
          { value: 'very_easy', label: 'Very easy' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'challenging', label: 'Challenging' },
          { value: 'very_difficult', label: 'Very difficult' }
        ]
      });
      
      questions.push({
        id: 'improvements',
        question: 'What aspect of the course could most use improvement?',
        options: [
          { value: 'content', label: 'Course content' },
          { value: 'teaching', label: 'Teaching methods' },
          { value: 'assessments', label: 'Assessments and grading' },
          { value: 'resources', label: 'Learning resources' }
        ]
      });
      
      questions.push({
        id: 'recommendation',
        question: 'Would you recommend this course to other students?',
        options: [
          { value: 'strongly_recommend', label: 'Strongly recommend' },
          { value: 'recommend', label: 'Recommend' },
          { value: 'neutral', label: 'Neutral' },
          { value: 'not_recommend', label: 'Would not recommend' }
        ]
      });
    }
    
    // Add a fourth question that's relevant to all reviews
    questions.push({
      id: 'time_commitment',
      question: 'How much time did this course require compared to your other courses?',
      options: [
        { value: 'much_less', label: 'Much less time' },
        { value: 'less', label: 'Less time' },
        { value: 'about_same', label: 'About the same' },
        { value: 'more', label: 'More time' },
        { value: 'much_more', label: 'Much more time' }
      ]
    });
    
    return questions;
  };
  
  // Helper functions to analyze review text
  const containsNegativeTerms = (text) => {
    const negativeTerms = [
      'bad', 'poor', 'terrible', 'awful', 'horrible', 'waste', 'useless',
      'difficult', 'hard', 'confusing', 'unclear', 'disappointing', 'worst',
      'boring', 'frustrated', 'frustrating', 'disorganized', 'not helpful'
    ];
    
    return negativeTerms.some(term => text.includes(term));
  };
  
  const containsPositiveTerms = (text) => {
    const positiveTerms = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
      'helpful', 'clear', 'organized', 'engaging', 'interesting', 'best',
      'enjoyed', 'informative', 'valuable', 'insightful', 'useful'
    ];
    
    return positiveTerms.some(term => text.includes(term));
  };

  const handleDoneReview = () => {
    // Generate questions based on review content
    const questions = generateValidationQuestions();
    setDynamicQuestions(questions);
    
    // Initialize validation answers object with empty values
    const newValidationAnswers = {};
    questions.forEach(q => {
      newValidationAnswers[q.id] = '';
    });
    
    setFormData({
      ...formData,
      validationAnswers: newValidationAnswers
    });
    
    // Move to validation stage
    setReviewStage('validation');
  };

  const handleSelectCourse = (course) => {
    setFormData({
      ...formData,
      courseCode: course.code,
      courseName: course.name
    });
    setSearchQuery(course.name);
    setIsSearchFocused(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      // Transform formData to match the API's expected format
      const apiFormData = {
        courseCode: formData.courseCode,
        rating: formData.courseRating, // Use courseRating as the main rating
        review: formData.review,
        author: formData.author,
        date: formData.date,
        // Include validation answers in the API request
        validationData: formData.validationAnswers
      };

      console.log("Sending data to API:", apiFormData);

      const response = await fetch(`${API_BASE_URL}/reviews/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiFormData),
      });
      
      console.log("API response status:", response.status);
      
      if (response.ok) {
        setShowConfirmDialog(false);
        setShowSuccessDialog(true);
        setTimeout(() => {
          setShowSuccessDialog(false);
          resetForm();
          navigate('/');
        }, 2000);
      } else {
        let errorMessage = "Server returned an error";
        try {
          const errorData = await response.json();
          console.error("Server error:", errorData);
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          console.error("Could not parse error response:", e);
        }
        
        setShowConfirmDialog(false);
        alert(`Failed to submit review: ${errorMessage}`);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setShowConfirmDialog(false);
      alert(`Failed to submit review: ${err.message}`);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmDialog(false);
  };

  // Confirmation Dialog Component
  const ConfirmDialog = () => (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Submission</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to submit this review?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancelSubmit}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmSubmit}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  // Success Dialog Component
  const SuccessDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-sm w-full mx-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Submitted!</h3>
        <p className="text-gray-600">Thank you for sharing your feedback.</p>
        <p className="text-gray-500 text-sm mt-2">You'll be redirected to the home page shortly...</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-8">
              <h1 className="text-3xl font-bold text-white">Write a Course Review</h1>
              <p className="text-teal-100 mt-2">Share your experience to help other students</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Course Selection - Autocomplete Search */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Course</label>
                <div ref={searchRef} className="relative">
                  <div className="flex items-center border-2 border-gray-300 focus-within:border-teal-500 rounded-lg px-3 py-2">
                    <FaSearch className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Search for a course..."
                      className="flex-1 outline-none text-gray-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      disabled={reviewStage === 'validation'}
                      required
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setFormData({
                            ...formData,
                            courseCode: '',
                            courseName: ''
                          });
                        }}
                        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={reviewStage === 'validation'}
                      >
                        <IoMdClose size={20} />
                      </button>
                    )}
                  </div>
                  
                  {/* Search Results Dropdown */}
                  {isSearchFocused && searchResults.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {searchResults.map((course) => (
                        <div
                          key={course.id}
                          onClick={() => handleSelectCourse(course)}
                          className="flex justify-between items-center px-4 py-3 hover:bg-teal-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{course.name}</div>
                            <div className="text-sm text-gray-500">{course.instructor} • {course.code}</div>
                          </div>
                          <div className="flex items-center text-yellow-400">
                            <span className="text-sm font-medium mr-1">{course.rating}</span>
                            <span>★</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* No Results Message */}
                  {isSearchFocused && searchQuery && searchResults.length === 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-lg p-4 text-center text-gray-500">
                      No courses found matching "{searchQuery}"
                    </div>
                  )}
                  
                  {/* Selected Course Display */}
                  {formData.courseCode && (
                    <div className="mt-2 p-2 bg-teal-50 rounded-lg border border-teal-100 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-teal-800">{formData.courseName}</div>
                        <div className="text-sm text-teal-600">{formData.courseCode}</div>
                      </div>
                      {reviewStage === 'writing' && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setFormData({
                              ...formData,
                              courseCode: '',
                              courseName: ''
                            });
                          }}
                          className="text-teal-600 hover:text-teal-800 transition-colors"
                        >
                          <IoMdClose size={20} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Course Rating */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Course Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, courseRating: rating })}
                      className="focus:outline-none transition-transform hover:scale-110"
                      disabled={reviewStage === 'validation'}
                    >
                      {rating <= formData.courseRating ? (
                        <StarIcon className="h-8 w-8 text-yellow-400" />
                      ) : (
                        <StarOutline className="h-8 w-8 text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instructor Rating */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Instructor Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, instructorRating: rating })}
                      className="focus:outline-none transition-transform hover:scale-110"
                      disabled={reviewStage === 'validation'}
                    >
                      {rating <= formData.instructorRating ? (
                        <StarIcon className="h-8 w-8 text-yellow-400" />
                      ) : (
                        <StarOutline className="h-8 w-8 text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Your Review</label>
                <textarea 
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Share your experience with this course and its instructor..."
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  required
                  disabled={reviewStage === 'validation'}
                ></textarea>
                
                {reviewStage === 'writing' && formData.review.length >= 10 && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleDoneReview}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Dynamic Validation Questions Section */}
              {reviewStage === 'validation' && (
                <div className="space-y-6 bg-teal-50 p-6 rounded-lg border border-teal-100">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Please Answer a Few Quick Questions</h3>
                    <p className="text-sm text-gray-600 mt-1">Your answers help us better understand the context of your review</p>
                  </div>
                  
                  {dynamicQuestions.map((question) => (
                    <div key={question.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {question.question}
                      </label>
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer bg-white">
                            <input
                              type="radio"
                              name={question.id}
                              value={option.value}
                              checked={formData.validationAnswers[question.id] === option.value}
                              onChange={(e) => setFormData({
                                ...formData,
                                validationAnswers: {
                                  ...formData.validationAnswers,
                                  [question.id]: e.target.value
                                }
                              })}
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                              required
                            />
                            <span className="text-sm text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Back to Review Button */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setReviewStage('writing')}
                      className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                    >
                      Edit Review
                    </button>
                    
                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                      disabled={Object.values(formData.validationAnswers).some(v => !v)}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Render dialogs */}
        {showConfirmDialog && <ConfirmDialog />}
        {showSuccessDialog && <SuccessDialog />}
      </div>
    </Layout>
  );
};

export default CourseReviews;