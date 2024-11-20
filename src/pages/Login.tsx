import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: '1',
      name: 'John Doe',
      email: 'john@university.edu',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Use your college email to access the marketplace
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-t-lg relative block w-full px-3 py-2 
                  border border-gray-200 dark:border-gray-700 
                  placeholder-gray-500 dark:placeholder-gray-400
                  text-gray-900 dark:text-white 
                  bg-white dark:bg-gray-800
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  hover:border-gray-300 dark:hover:border-gray-600
                  transition-all duration-200
                  sm:text-sm"
                placeholder="College email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-lg relative block w-full px-3 py-2 
                  border border-gray-200 dark:border-gray-700 
                  placeholder-gray-500 dark:placeholder-gray-400
                  text-gray-900 dark:text-white 
                  bg-white dark:bg-gray-800
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  hover:border-gray-300 dark:hover:border-gray-600
                  transition-all duration-200
                  sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 
                  text-indigo-600 
                  border-gray-200 dark:border-gray-700
                  rounded
                  bg-white dark:bg-gray-800
                  focus:ring-indigo-500 focus:ring-2
                  hover:border-gray-300 dark:hover:border-gray-600
                  transition-all duration-200"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 
                border border-transparent 
                text-sm font-medium rounded-lg
                text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                transition-all duration-200
                shadow-sm"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};