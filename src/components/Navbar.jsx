import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import logo from '../images/c_logo.png';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const API_BASE_URL = "http://127.0.0.1:8000";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([
    'Introduction to Computer Science',
    'Data Structures',
    'Machine Learning',
    'Web Development'
  ]);
  const searchContainerRef = useRef(null);

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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await fetch(`${API_BASE_URL}/courses/search?query=${searchQuery}`);
          if (response.ok) {
            const data = await response.json();
            setSearchResults(data);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimer);
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
                            <Link
                              key={course.id}
                              to={`/course/${course.id}`}
                              className="block px-4 py-2 hover:bg-teal-50 rounded transition-colors"
                              onClick={() => {
                                handleSearch(course.name);
                                setIsSearchOpen(false);
                              }}
                            >
                              {course.name}
                            </Link>
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
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">Trending Searches</h3>
                            {trendingSearches.map((search, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-teal-50 rounded cursor-pointer transition-colors"
                                onClick={() => handleSearch(search)}
                              >
                                {search}
                              </div>
                            ))}
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

            <button className="text-teal-600 hover:text-teal-700 transition-colors relative">
              <BellIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

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
              <div className="relative">
                <button 
                  className="text-teal-600 hover:text-teal-700 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <UserCircleIcon className="w-7 h-7" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                    <Link 
                      to="/login" 
                      className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;