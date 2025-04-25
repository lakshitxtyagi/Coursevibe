import React from 'react';
import Layout from '../../components/Layout';

function MobileAppDevelopment() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Mobile App Development</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Course Details</h2>
              <p>Professor: Dr. Emily Martinez</p>
              <p>Course Code: CS405</p>
              <p>Average Rating: ⭐ 4.8/5</p>
              <p>Total Reviews: 156</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Quick Stats</h2>
              <p>Difficulty Level: Intermediate to Advanced</p>
              <p>Workload: Heavy (8-10 hours/week)</p>
              <p>Prerequisites: Object-Oriented Programming, Web Development basics</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          
          {/* Recent Review 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Ryan M.</p>
                <p className="text-sm text-gray-500">Posted: 1 month ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐ 5/5</div>
            </div>
            <p className="mt-2">Hands-on experience with both iOS and Android development. Dr. Martinez is incredibly knowledgeable and provides great feedback.</p>
          </div>

          {/* Recent Review 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Priya S.</p>
                <p className="text-sm text-gray-500">Posted: 2 months ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐ 4/5</div>
            </div>
            <p className="mt-2">Great course that balances theory and practice. The group project helped me build a portfolio-worthy app.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MobileAppDevelopment; 