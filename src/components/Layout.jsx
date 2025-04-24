import React from 'react';
import Navbar from './Navbar';
import Helpdesk from './Helpdesk';

const Layout = ({ children }) => {
  // Get current route
  const currentPath = window.location.pathname;
  
  // Always show navbar and helpdesk
  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <Navbar />
      <div className="pt-32 md:pt-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {children}
        </div>
      </div>
      <Helpdesk />
    </div>
  );
};

export default Layout;
