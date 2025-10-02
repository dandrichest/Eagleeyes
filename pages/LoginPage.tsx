import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const { error: errorMessage, user } = await login(email, password);
    setIsLoading(false);
    if (user) {
      if (user.role === Role.ADMIN) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(errorMessage || 'An unknown error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
            <img src="./assets/images/logo.svg" alt="Eagles Eye Technology Logo" className="h-16 w-auto mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary">Login to your Account</h2>
            <p className="text-gray-500">Welcome back!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
           <div className="text-sm text-center text-gray-500">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-secondary hover:underline">
                Register now
              </Link>
            </p>
          </div>
          <div className="text-xs text-gray-500 text-center border-t pt-4 mt-4">
            <p>Customer: <strong>customer@example.com</strong> / <strong>password123</strong></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;