import React from 'react';
import Layout from '../components/Layout';
import { BookOpenIcon, AcademicCapIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const StudentDashboard = () => {
  // Sample data - in a real app, this would come from your API
  const studentStats = {
    cgpa: 8.25,
    totalCredits: 85,
    totalCourses: 28
  };

  const enrolledCourses = {
    coreCourses: [
      { code: 'CS301', name: 'Data Structures and Algorithms', credits: 4, instructor: 'Dr. Smith' },
      { code: 'CS302', name: 'Operating Systems', credits: 4, instructor: 'Dr. Johnson' },
      { code: 'CS303', name: 'Database Management Systems', credits: 4, instructor: 'Dr. Williams' }
    ],
    programElectives: [
      { code: 'CS401', name: 'Machine Learning', credits: 3, instructor: 'Dr. Brown' },
      { code: 'CS402', name: 'Cloud Computing', credits: 3, instructor: 'Dr. Davis' }
    ],
    openElectives: [
      { code: 'HUM201', name: 'Introduction to Psychology', credits: 2, instructor: 'Dr. Wilson' },
      { code: 'MGT101', name: 'Principles of Management', credits: 2, instructor: 'Dr. Taylor' }
    ]
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* CGPA Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-teal-100">
                  <AcademicCapIcon className="h-6 w-6 text-teal-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">CGPA</h3>
                  <p className="text-2xl font-bold text-teal-600">{studentStats.cgpa}</p>
                </div>
              </div>
            </div>

            {/* Total Credits Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-teal-100">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-teal-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Credits Earned</h3>
                  <p className="text-2xl font-bold text-teal-600">{studentStats.totalCredits}</p>
                </div>
              </div>
            </div>

            {/* Total Courses Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-teal-100">
                  <BookOpenIcon className="h-6 w-6 text-teal-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Courses Completed</h3>
                  <p className="text-2xl font-bold text-teal-600">{studentStats.totalCourses}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Semester Courses</h2>
            
            {/* Core Courses */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-teal-600 mb-4">Core Courses</h3>
              <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                {enrolledCourses.coreCourses.map((course) => (
                  <div key={course.code} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-gray-900 font-medium">{course.name}</h4>
                        <p className="text-sm text-gray-500">{course.code} • {course.instructor}</p>
                      </div>
                      <span className="text-sm text-gray-600">{course.credits} Credits</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Program Electives */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-teal-600 mb-4">Program Electives</h3>
              <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                {enrolledCourses.programElectives.map((course) => (
                  <div key={course.code} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-gray-900 font-medium">{course.name}</h4>
                        <p className="text-sm text-gray-500">{course.code} • {course.instructor}</p>
                      </div>
                      <span className="text-sm text-gray-600">{course.credits} Credits</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Electives */}
            <div>
              <h3 className="text-lg font-semibold text-teal-600 mb-4">Open Electives</h3>
              <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                {enrolledCourses.openElectives.map((course) => (
                  <div key={course.code} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-gray-900 font-medium">{course.name}</h4>
                        <p className="text-sm text-gray-500">{course.code} • {course.instructor}</p>
                      </div>
                      <span className="text-sm text-gray-600">{course.credits} Credits</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard; 