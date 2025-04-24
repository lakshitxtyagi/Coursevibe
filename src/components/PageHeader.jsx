import React from 'react';

const PageHeader = ({ title, description, children }) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-2 text-lg text-gray-600">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageHeader; 