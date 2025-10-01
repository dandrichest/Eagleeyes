import React, { useState } from 'react';
import { MOCK_COURSES } from '../../constants/data';
import { Course } from '../../types';

const CourseManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);

  return (
     <div>
      <h2 className="text-2xl font-semibold text-primary mb-4">Manage Courses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-light">
            <tr>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Instructor</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{course.title}</td>
                <td className="py-2 px-4 border-b">{course.instructor}</td>
                <td className="py-2 px-4 border-b">₦{course.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-600 hover:underline text-sm mr-2">Edit</button>
                  <button className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <button className="mt-6 bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-300">
            Add New Course
        </button>
    </div>
  );
};

export default CourseManager;