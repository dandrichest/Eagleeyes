
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../context/CartContext';
import { Role } from '../types';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
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
            <img src="./assets/logo.svg" alt="Eagles Eye Technology Logo" className="h-12 w-auto" />
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
                {user.role === Role.CUSTOMER && <NavLink to="/my-courses" className={navLinkClass}>My Courses</NavLink>}
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
            {user?.role === Role.CUSTOMER && (
              <NavLink to="/cart" className="relative p-2 text-dark hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">
                    {itemCount}
                  </span>
                )}
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;