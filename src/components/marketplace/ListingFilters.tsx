import React from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Filter } from 'lucide-react';

const categories = [
  'Textbooks',
  'Electronics',
  'Furniture',
  'Clothing',
  'School Supplies',
  'Other'
];

const conditions = ['New', 'Like New', 'Good', 'Fair'];

interface ListingFiltersProps {
  onFilterChange?: (filters: any) => void;
}

export const ListingFilters = ({ onFilterChange }: ListingFiltersProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Filters</h2>
        <Filter className="w-5 h-5" />
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 mb-2">
              <input 
                type="checkbox" 
                className="w-4 h-4 
                  text-indigo-600 
                  bg-white dark:bg-gray-800
                  border-gray-300 dark:border-gray-700
                  rounded
                  focus:ring-indigo-500 focus:ring-2
                  transition-colors duration-200" 
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="flex gap-2">
            <Input type="number" placeholder="Min" />
            <Input type="number" placeholder="Max" />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Condition</h3>
          {conditions.map((condition) => (
            <label key={condition} className="flex items-center space-x-2 mb-2">
              <input 
                type="checkbox" 
                className="w-4 h-4 
                  text-indigo-600 
                  bg-white dark:bg-gray-800
                  border-gray-300 dark:border-gray-700
                  rounded
                  focus:ring-indigo-500 focus:ring-2
                  transition-colors duration-200" 
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{condition}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="font-medium mb-2">Sort By</h3>
          <select className="w-full p-2 
            bg-white dark:bg-gray-800 
            border border-gray-300 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            transition-colors duration-200">
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>
    </Card>
  );
};