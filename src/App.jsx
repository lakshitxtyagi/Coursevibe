import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import StudentDashboard from './pages/StudentDashboard';
import CourseReviews from './pages/CourseReviews';
import Leaderboard from './pages/Leaderboard';
import FeedbackForms from './pages/FeedbackForms';
import Search from './pages/Search';
import DataStructures from './pages/CoursePages/DataStructures';
import MachineLearning from './pages/CoursePages/MachineLearning';
import WebDevelopment from './pages/CoursePages/WebDevelopment';
import { CheckIcon } from '@heroicons/react/24/outline';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const SuccessDialog = () => (
  <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-sm w-full mx-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckIcon className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Submitted!</h3>
      <p className="text-gray-600">Thank you for sharing your feedback.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/student-dashboard" element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/course-reviews" element={
          <ProtectedRoute>
            <CourseReviews />
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        } />
        <Route path="/feedback-forms" element={
          <ProtectedRoute>
            <FeedbackForms />
          </ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        } />
        <Route path="/course/:courseId" element={
          <ProtectedRoute>
            <CourseReviews />
          </ProtectedRoute>
        } />
        <Route path="/course/cs201" element={
          <ProtectedRoute>
            <DataStructures />
          </ProtectedRoute>
        } />
        <Route path="/course/cs401" element={
          <ProtectedRoute>
            <MachineLearning />
          </ProtectedRoute>
        } />
        <Route path="/course/cs301" element={
          <ProtectedRoute>
            <WebDevelopment />
          </ProtectedRoute>
        } />

        {/* Redirect all unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 