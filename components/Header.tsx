
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-secondary text-white'
        : 'text-dark hover:bg-primary hover:text-white'
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex-shrink-0">
            <img src="/assets/logo.svg" alt="Eagles Eye Technology Logo" className="h-12 w-auto" />
          </NavLink>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/store" className={navLinkClass}>Store</NavLink>
            <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
            <NavLink to="/training" className={navLinkClass}>Training Portal</NavLink>
            {user?.role === Role.ADMIN && (
              <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-dark text-sm font-medium hidden sm:block">Welcome, {user.name}</span>
                <NavLink to="/my-courses" className={navLinkClass}>My Courses</NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-secondary text-white rounded-md text-sm font-medium hover:bg-opacity-80 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-opacity-80 transition"
              >
                Login / Register
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
