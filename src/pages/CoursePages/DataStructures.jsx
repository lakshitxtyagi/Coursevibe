import React from 'react';
import Layout from '../../components/Layout';

function DataStructures() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Data Structures and Algorithms</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Course Details</h2>
              <p>Professor: Dr. Sarah Johnson</p>
              <p>Course Code: CS201</p>
              <p>Average Rating: ⭐ 4.8/5</p>
              <p>Total Reviews: 45</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Quick Stats</h2>
              <p>Difficulty Level: Intermediate</p>
              <p>Workload: Medium</p>
              <p>Prerequisites: Programming Fundamentals</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          
          {/* Recent Review 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Anonymous Student</p>
                <p className="text-sm text-gray-500">Posted: 2 days ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐ 5/5</div>
            </div>
            <p className="mt-2">Excellent course! Dr. Johnson explains complex concepts very clearly. The assignments were challenging but helped reinforce the concepts.</p>
          </div>

          {/* Recent Review 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">CS Major '25</p>
                <p className="text-sm text-gray-500">Posted: 1 week ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐ 4/5</div>
            </div>
            <p className="mt-2">Great course content, but the pace can be a bit fast at times. Make sure to stay on top of the assignments.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DataStructures; 