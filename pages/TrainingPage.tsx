import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_COURSES } from '../constants/data';
import { Course } from '../types';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <Link to={`/training/${course.id}`} className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative h-48">
            <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm flex-grow">{course.description.substring(0, 100)}...</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-secondary">₦{course.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className="text-sm font-semibold text-primary">{course.duration}</span>
            </div>
        </div>
    </Link>
);

const TrainingPage: React.FC = () => {
  return (
    <div>
      <div className="text-center bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-primary">Training Portal</h1>
        <p className="text-gray-600 mt-2">Advance your skills with our expert-led courses in security and technology.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COURSES.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default TrainingPage;