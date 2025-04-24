import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

const CourseCarousel = ({ courses }) => {
  return (
    <div className="relative w-full">
      <div className="overflow-x-auto scrollbar-hide scroll-smooth">
        <div className="flex space-x-6 px-4 pb-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex-none w-[300px] md:w-[350px] bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02] hover:shadow-xl"
            >
              <Link to={`/course/${course.id}`}>
                <div className="relative h-48">
                  <img
                    src={course.image || 'https://via.placeholder.com/350x200'}
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white text-lg font-semibold line-clamp-2">
                      {course.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`h-5 w-5 ${
                            index < Math.floor(course.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({course.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-teal-600">
                      {course.department}
                    </span>
                    <span className="text-sm text-gray-500">
                      {course.credits} Credits
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCarousel; 