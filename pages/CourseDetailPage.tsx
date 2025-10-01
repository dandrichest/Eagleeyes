import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_COURSES } from '../constants/data';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = MOCK_COURSES.find(c => c.id === id);

  if (!course) {
    return <div className="text-center py-10">
      <h2 className="text-2xl font-bold text-red-600">Course not found</h2>
      <Link to="/training" className="text-secondary hover:underline mt-4 inline-block">Back to Training Portal</Link>
    </div>;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">{course.title}</h1>
          <p className="text-md text-gray-500 mb-4">Instructor: {course.instructor}</p>
          <img src={course.imageUrl} alt={course.title} className="w-full h-auto object-cover rounded-lg shadow-md mb-6" />
          <h2 className="text-2xl font-bold text-primary mb-4">Course Description</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{course.description}</p>
          <h2 className="text-2xl font-bold text-primary mb-4">Course Modules</h2>
          <div className="space-y-4">
            {course.modules.map((module, index) => (
              <div key={index} className="p-4 border rounded-lg bg-light">
                <h3 className="font-semibold text-primary">{module.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-light p-6 rounded-lg shadow-md">
            <p className="text-4xl font-bold text-secondary mb-4">₦{course.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <button className="w-full bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition duration-300">
              Enroll Now
            </button>
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Duration: {course.duration}</span>
              </li>
              <li className="flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Certificate of Completion</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;