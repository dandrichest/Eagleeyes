
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Course } from '../types';
import { MOCK_COURSES } from '../constants/data';

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


const MyCoursesPage: React.FC = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (user) {
      const storageKey = `eagleseye_enrollments_${user.id}`;
      const storedEnrollments = localStorage.getItem(storageKey);
      if (storedEnrollments) {
        const enrolledIds: string[] = JSON.parse(storedEnrollments);
        const courses = MOCK_COURSES.filter(course => enrolledIds.includes(course.id));
        setEnrolledCourses(courses);
      }
    }
  }, [user]);

  return (
    <div>
      <div className="text-center bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-primary">My Enrolled Courses</h1>
        <p className="text-gray-600 mt-2">Continue your learning journey with Eagles Eye Technology.</p>
      </div>
      {enrolledCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
          <Link to="/training" className="bg-secondary hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full transition duration-300">
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
