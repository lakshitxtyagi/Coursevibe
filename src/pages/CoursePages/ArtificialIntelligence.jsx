import React from 'react';
import Layout from '../../components/Layout';

function ArtificialIntelligence() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Artificial Intelligence</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Course Details</h2>
              <p>Professor: Prof. James Wilson</p>
              <p>Course Code: CS501</p>
              <p>Average Rating: ⭐ 4.9/5</p>
              <p>Total Reviews: 167</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Quick Stats</h2>
              <p>Difficulty Level: Advanced</p>
              <p>Workload: Heavy (8-10 hours/week)</p>
              <p>Prerequisites: Machine Learning, Algorithms, Probability</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          
          {/* Recent Review 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Sophie T.</p>
                <p className="text-sm text-gray-500">Posted: 2 months ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐ 5/5</div>
            </div>
            <p className="mt-2">Fascinating course that covers both classical AI and modern approaches. Prof. Wilson is passionate about the subject and makes complex topics accessible.</p>
          </div>

          {/* Recent Review 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">AI Researcher</p>
                <p className="text-sm text-gray-500">Posted: 1 month ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐ 5/5</div>
            </div>
            <p className="mt-2">The best course I've taken at the university. The projects are challenging but incredibly rewarding. I built a chess AI that actually beats me!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ArtificialIntelligence; 