import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUserData(user);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === userData.email);
    if (userIndex !== -1) {
      users[userIndex] = userData;
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Update current user
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setIsEditing(false);
  };

  if (!userData) return null;

  return (
    <Layout>
      <main className="container mx-auto my-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center">
                <span className="text-white text-3xl font-medium">{userData.initials}</span>
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-900">{userData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.college}
                    onChange={(e) => setUserData({ ...userData, college: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-900">{userData.college}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.major}
                    onChange={(e) => setUserData({ ...userData, major: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <p className="text-gray-900">{userData.major}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                {isEditing ? (
                  <select
                    value={userData.year}
                    onChange={(e) => setUserData({ ...userData, year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                  </select>
                ) : (
                  <p className="text-gray-900">Year {userData.year}</p>
                )}
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Profile; 