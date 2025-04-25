import React from 'react';
import Layout from '../../components/Layout';

function SoftwareEngineering() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Software Engineering</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Course Details</h2>
              <p>Professor: Dr. Rachel Brown</p>
              <p>Course Code: CS403</p>
              <p>Average Rating: ⭐ 4.5/5</p>
              <p>Total Reviews: 189</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Quick Stats</h2>
              <p>Difficulty Level: Intermediate</p>
              <p>Workload: Medium-Heavy (7-9 hours/week)</p>
              <p>Prerequisites: Object-Oriented Programming, Data Structures</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          
          {/* Recent Review 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Daniel K.</p>
                <p className="text-sm text-gray-500">Posted: 1 week ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐ 4/5</div>
            </div>
            <p className="mt-2">Great team projects and real-world software development experience. Dr. Brown brings in guest speakers from industry which adds a lot of value.</p>
          </div>

          {/* Recent Review 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Future Developer</p>
                <p className="text-sm text-gray-500">Posted: 1 month ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐ 5/5</div>
            </div>
            <p className="mt-2">This course is a must for any CS major. The Agile methodology experience and project management skills I gained are directly applicable to my internship.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SoftwareEngineering; 