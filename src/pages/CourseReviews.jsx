import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const API_BASE_URL = "http://127.0.0.1:8000";

const CourseReviews = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    courseCode: '',
    courseRating: 0,
    instructorRating: 0,
    review: '',
    author: 'Anonymous',
    date: new Date().toLocaleDateString(),
    validationAnswers: {
      attendance: '',
      assignments: '',
      difficulty: ''
    }
  });

  const validationQuestions = [
    {
      id: 'attendance',
      question: 'How often did you attend this course?',
      options: [
        { value: 'always', label: 'Always (90-100% attendance)' },
        { value: 'mostly', label: 'Mostly (70-90% attendance)' },
        { value: 'sometimes', label: 'Sometimes (50-70% attendance)' },
        { value: 'rarely', label: 'Rarely (less than 50% attendance)' }
      ]
    },
    {
      id: 'assignments',
      question: 'How would you rate the workload of assignments?',
      options: [
        { value: 'very_light', label: 'Very light (1-2 hours per week)' },
        { value: 'manageable', label: 'Manageable (3-5 hours per week)' },
        { value: 'heavy', label: 'Heavy (6-8 hours per week)' },
        { value: 'very_heavy', label: 'Very heavy (more than 8 hours per week)' }
      ]
    },
    {
      id: 'difficulty',
      question: 'How would you rate the overall difficulty of the course?',
      options: [
        { value: 'very_easy', label: 'Very easy' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'challenging', label: 'Challenging' },
        { value: 'very_difficult', label: 'Very difficult' }
      ]
    }
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));

    fetchReviews();
  }, []);

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
      courseRating: 0,
      instructorRating: 0,
      review: '',
      author: 'Anonymous',
      date: new Date().toLocaleDateString(),
      validationAnswers: {
        attendance: '',
        assignments: '',
        difficulty: ''
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowConfirmDialog(false);
        setShowSuccessDialog(true);
        setTimeout(() => {
          setShowSuccessDialog(false);
          resetForm();
        }, 1000);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  // Confirmation Dialog Component
  const ConfirmDialog = () => (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Submission</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to submit this review?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowConfirmDialog(false)}
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
              {/* Course Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Course</label>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  value={formData.courseCode}
                  onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                  required
                >
                  <option value="">Choose a course...</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.code}>
                      {course.name} ({course.code})
                    </option>
                  ))}
                </select>
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
                ></textarea>
              </div>

              {/* Validation Questions Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Course Experience Details</h3>
                <p className="text-sm text-gray-600">Please answer these questions to help validate your review</p>
                
                {validationQuestions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {question.question}
                    </label>
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
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
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium text-lg"
              >
                Submit Review
              </button>
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