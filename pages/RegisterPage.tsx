import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
    setError('');
    setIsLoading(true);
    const errorMessage = await register(name, email, password);
    setIsLoading(false);
    if (!errorMessage) {
      navigate('/'); // Redirect to home page on successful registration
    } else {
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
            <img src="./assets/images/logo.svg" alt="Eagles Eye Technology Logo" className="h-16 w-auto mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary">Create an Account</h2>
            <p className="text-gray-500">Join us today!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
            />
          </div>
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
              autoComplete="new-password"
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
          <div className="text-sm text-center text-gray-500">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-secondary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;