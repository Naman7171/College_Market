import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search listings..."
        className="w-full px-4 py-2 pl-10 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 
          rounded-lg 
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          hover:border-gray-300 dark:hover:border-gray-600
          shadow-sm
          transition-all duration-200"
      />
      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};