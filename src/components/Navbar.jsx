import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import logo from '../images/c_logo.png';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { dummyCourses } from '../data/dummyCourses';

const API_BASE_URL = "http://127.0.0.1:8000";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([
    'Machine Learning',
    'Data Structures',
    'Web Development',
    'Mobile App Development',
    'Artificial Intelligence'
  ]);
  const searchContainerRef = useRef(null);
  const notificationsRef = useRef(null);

  // Dummy notifications data
  const notifications = [
    {
      id: 1,
      type: 'course_update',
      title: 'Course Update',
      message: 'Web Development (CS301) has been updated with new assignments',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'new_review',
      title: 'New Review',
      message: 'A new review was posted for Machine Learning (CS401)',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'leaderboard',
      title: 'Leaderboard Update',
      message: 'Weekly leaderboard has been updated. Data Structures is now #1!',
      time: '2 days ago',
      read: true
    }
  ];

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!token || !user) {
      setCurrentUser(null);
      return;
    }
    
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    // Load recent searches from localStorage
    const loadedRecentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(loadedRecentSearches);

    // Close search on click outside
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Filter courses based on search query
    if (searchQuery.trim()) {
      const filteredResults = dummyCourses.filter(course => 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      navigate('/login');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const updatedRecentSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
  };
  
  const navigateToCourse = (course) => {
    // Navigate using the course code which matches the route paths in App.jsx
    setIsSearchOpen(false);
    navigate(`/course/${course.code.toLowerCase()}`);
  };

  // Function to get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'course_update':
        return <span className="text-blue-500 text-lg">📘</span>;
      case 'new_review':
        return <span className="text-green-500 text-lg">📝</span>;
      case 'leaderboard':
        return <span className="text-yellow-500 text-lg">🏆</span>;
      default:
        return <span className="text-gray-500 text-lg">📣</span>;
    }
  };

  // Function to check if a path is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed w-full top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="PeerViewed Logo" className="h-8 md:h-10 w-auto object-contain" />
              <h1 className="text-xl md:text-2xl font-bold text-teal-600">Coursevibe</h1>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <div ref={searchContainerRef} className="relative flex items-center h-full">
              {isSearchOpen ? (
                <div className="absolute right-0 top-[calc(100%+0.5rem)] w-[32rem] bg-white rounded-lg shadow-xl z-50">
                  <div className="p-4">
                    <div className="flex items-center border-2 border-teal-500 rounded-lg px-3 py-2">
                      <FaSearch className="text-teal-500 mr-3" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        className="flex-1 outline-none text-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button
                        onClick={() => setIsSearchOpen(false)}
                        className="ml-2 text-teal-500 hover:text-teal-700 transition-colors"
                      >
                        <IoMdClose size={20} />
                      </button>
                    </div>

                    <div className="mt-4">
                      {searchQuery && searchResults.length > 0 ? (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 mb-2">Search Results</h3>
                          {searchResults.map((course) => (
                            <div
                              key={course.id}
                              onClick={() => {
                                handleSearch(course.name);
                                navigateToCourse(course);
                              }}
                              className="flex justify-between items-center px-4 py-2 hover:bg-teal-50 rounded cursor-pointer transition-colors"
                            >
                              <div>
                                <div className="font-medium text-gray-900">{course.name}</div>
                                <div className="text-sm text-gray-500">{course.instructor} • {course.code}</div>
                              </div>
                              <div className="flex items-center text-yellow-400">
                                <span className="text-sm font-medium mr-1">{course.rating}</span>
                                <span>★</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {recentSearches.length > 0 && (
                            <div className="mb-4">
                              <h3 className="text-sm font-semibold text-gray-600 mb-2">Recent Searches</h3>
                              {recentSearches.map((search, index) => (
                                <div
                                  key={index}
                                  className="px-4 py-2 hover:bg-teal-50 rounded cursor-pointer transition-colors"
                                  onClick={() => handleSearch(search)}
                                >
                                  {search}
                                </div>
                              ))}
                            </div>
                          )}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">Trending Courses</h3>
                            {trendingSearches.map((search, index) => {
                              const course = dummyCourses.find(c => c.name.includes(search));
                              return (
                                <div
                                  key={index}
                                  className="flex justify-between items-center px-4 py-2 hover:bg-teal-50 rounded cursor-pointer transition-colors"
                                  onClick={() => {
                                    handleSearch(search);
                                    if (course) navigateToCourse(course);
                                  }}
                                >
                                  <div className="font-medium text-gray-900">{search}</div>
                                  {course && (
                                    <div className="flex items-center text-yellow-400">
                                      <span className="text-sm font-medium mr-1">{course.rating}</span>
                                      <span>★</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-teal-600 hover:text-teal-700 transition-colors p-1 flex items-center"
                >
                  <FaSearch className="w-5 h-5" />
                </button>
              )}
            </div>

            <Link 
              to="/" 
              className={`text-teal-600 hover:text-teal-700 transition-colors hidden md:block font-medium ${
                isActive('/') ? 'border-b-2 border-teal-600' : ''
              }`}
            >
              Home
            </Link>

            <Link 
              to="/student-dashboard" 
              className={`text-teal-600 hover:text-teal-700 transition-colors hidden md:block font-medium ${
                isActive('/student-dashboard') ? 'border-b-2 border-teal-600' : ''
              }`}
            >
              Dashboard
            </Link>
            
            <Link 
              to="/feedback-forms" 
              className={`text-teal-600 hover:text-teal-700 transition-colors hidden md:block font-medium ${
                isActive('/feedback-forms') ? 'border-b-2 border-teal-600' : ''
              }`}
            >
              Forms
            </Link>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                className="text-teal-600 hover:text-teal-700 transition-colors relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <BellIcon className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${notification.read ? 'opacity-75' : ''}`}
                        >
                          <div className="flex">
                            <div className="mr-3 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div>
                              <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="ml-2 h-2 w-2 bg-teal-500 rounded-full self-start mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 text-center">
                    <button 
                      className="text-sm text-teal-600 hover:text-teal-700"
                      onClick={() => setIsNotificationsOpen(false)}
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {currentUser ? (
              <div className="relative">
                <button 
                  className="text-teal-600 hover:text-teal-700 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="w-8 h-8 bg-teal-600 hover:bg-teal-700 transition-colors rounded-full flex items-center justify-center text-white">
                    <span>{currentUser.initials}</span>
                  </div>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-teal-600 hover:bg-teal-700 transition-colors text-white py-2 px-4 rounded-lg text-sm font-medium">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;