import React from 'react';
import Layout from '../../components/Layout';

function MachineLearning() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Introduction to Machine Learning</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Course Details</h2>
              <p>Professor: Prof. Emily Rodriguez</p>
              <p>Course Code: CS450</p>
              <p>Average Rating: ⭐ 4.7/5</p>
              <p>Total Reviews: 38</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Quick Stats</h2>
              <p>Difficulty Level: Advanced</p>
              <p>Workload: Heavy</p>
              <p>Prerequisites: Linear Algebra, Statistics</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          
          {/* Recent Review 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">ML Enthusiast</p>
                <p className="text-sm text-gray-500">Posted: 12 hours ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐ 5/5</div>
            </div>
            <p className="mt-2">Dr. Chen is fantastic! The projects are very practical and give great hands-on experience with real-world ML problems.</p>
          </div>

          {/* Recent Review 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Data Science Minor</p>
                <p className="text-sm text-gray-500">Posted: 4 days ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐ 4/5</div>
            </div>
            <p className="mt-2">Heavy math content but very rewarding. The programming assignments can be challenging if you're not comfortable with Python.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MachineLearning; 