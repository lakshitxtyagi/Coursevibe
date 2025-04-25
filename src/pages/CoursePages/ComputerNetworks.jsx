import React from 'react';
import Layout from '../../components/Layout';

function ComputerNetworks() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Computer Networks</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Course Details</h2>
              <p>Professor: Prof. Robert Taylor</p>
              <p>Course Code: CS404</p>
              <p>Average Rating: ⭐ 4.6/5</p>
              <p>Total Reviews: 134</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Quick Stats</h2>
              <p>Difficulty Level: Intermediate</p>
              <p>Workload: Medium (6-8 hours/week)</p>
              <p>Prerequisites: Operating Systems, Basic Programming</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          
          {/* Recent Review 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Jennifer P.</p>
                <p className="text-sm text-gray-500">Posted: 3 weeks ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐ 5/5</div>
            </div>
            <p className="mt-2">Excellent coverage of networking protocols and practical implementations. Prof. Taylor explains complex concepts in an understandable way.</p>
          </div>

          {/* Recent Review 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Network Admin</p>
                <p className="text-sm text-gray-500">Posted: 2 months ago</p>
              </div>
              <div className="text-yellow-400">⭐⭐⭐⭐ 4/5</div>
            </div>
            <p className="mt-2">Great balance of theory and hands-on lab work. We built our own packet analyzers and learned how the internet actually works. Highly recommend!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ComputerNetworks; 