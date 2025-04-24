import React from 'react';
import Layout from '../../components/Layout';

function WebDevelopment() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Full Stack Web Development</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Course Details</h2>
              <p>Professor: Prof. Emily Rodriguez</p>
              <p>Course Code: CS330</p>
              <p>Average Rating: ⭐ 4.7/5</p>
              <p>Total Reviews: 38</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Quick Stats</h2>
              <p>Difficulty Level: Intermediate</p>
              <p>Workload: Medium-Heavy</p>
              <p>Prerequisites: Basic Programming</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          
          {/* Recent Review 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Future Developer</p>
                <p className="text-sm text-gray-500">Posted: 12 hours ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐ 5/5</div>
            </div>
            <p className="mt-2">Amazing course! Built a full-stack application from scratch. Prof. Rodriguez is always available for help during office hours.</p>
          </div>

          {/* Recent Review 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Web Dev Newbie</p>
                <p className="text-sm text-gray-500">Posted: 4 days ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐ 4/5</div>
            </div>
            <p className="mt-2">Great introduction to modern web technologies. The final project is intense but very rewarding.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default WebDevelopment; 