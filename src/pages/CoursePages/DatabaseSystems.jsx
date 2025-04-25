import React from 'react';
import Layout from '../../components/Layout';

function DatabaseSystems() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Database Systems</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Course Details</h2>
              <p>Professor: Dr. Lisa Wang</p>
              <p>Course Code: CS402</p>
              <p>Average Rating: ⭐ 4.7/5</p>
              <p>Total Reviews: 142</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Quick Stats</h2>
              <p>Difficulty Level: Intermediate</p>
              <p>Workload: Medium (6-8 hours/week)</p>
              <p>Prerequisites: Data Structures, Introduction to Programming</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          
          {/* Recent Review 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Mark R.</p>
                <p className="text-sm text-gray-500">Posted: 1 month ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐ 4/5</div>
            </div>
            <p className="mt-2">Comprehensive coverage of database concepts and practical SQL skills. Dr. Wang brings real-world examples that make the material engaging.</p>
          </div>

          {/* Recent Review 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">SQL Enthusiast</p>
                <p className="text-sm text-gray-500">Posted: 3 months ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐ 5/5</div>
            </div>
            <p className="mt-2">One of the most practical courses in the CS curriculum. The database design project gave me skills I use in my internship every day.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DatabaseSystems; 