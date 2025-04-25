import React from 'react';
import Layout from '../../components/Layout';

function CloudComputing() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Cloud Computing</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Course Details</h2>
              <p>Professor: Prof. Thomas Anderson</p>
              <p>Course Code: CS406</p>
              <p>Average Rating: ⭐ 4.7/5</p>
              <p>Total Reviews: 145</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Quick Stats</h2>
              <p>Difficulty Level: Intermediate to Advanced</p>
              <p>Workload: Medium-Heavy (7-9 hours/week)</p>
              <p>Prerequisites: Computer Networks, Operating Systems</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          
          {/* Recent Review 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Laura B.</p>
                <p className="text-sm text-gray-500">Posted: 2 weeks ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐ 4/5</div>
            </div>
            <p className="mt-2">Great introduction to cloud services and distributed systems. The AWS practical labs are extremely valuable for industry preparation.</p>
          </div>

          {/* Recent Review 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Cloud Engineer</p>
                <p className="text-sm text-gray-500">Posted: 1 month ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐ 5/5</div>
            </div>
            <p className="mt-2">Prof. Anderson's course is incredibly relevant to today's job market. The final project where we deployed a scalable application helped me land my current job.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CloudComputing; 