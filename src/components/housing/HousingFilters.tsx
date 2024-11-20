import React from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Filter } from 'lucide-react';

const propertyTypes = ['Apartment', 'House', 'Room', 'Shared'];
const amenities = [
  'WiFi',
  'Air Conditioning',
  'Laundry',
  'Parking',
  'Gym',
  'Pool',
  'Furnished',
  'Utilities Included'
];

export const HousingFilters = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Filters</h2>
        <Filter className="w-5 h-5" />
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Property Type</h3>
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2 mb-2">
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
              <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
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
          <h3 className="font-medium mb-2">Bedrooms</h3>
          <select className="w-full p-2 
            bg-white dark:bg-gray-800 
            border border-gray-300 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            transition-colors duration-200">
            <option value="">Any</option>
            <option value="0">Studio</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3+</option>
          </select>
        </div>

        <div>
          <h3 className="font-medium mb-2">Amenities</h3>
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2 mb-2">
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
              <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="font-medium mb-2">More Filters</h3>
          <label className="flex items-center space-x-2 mb-2">
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
            <span className="text-sm text-gray-700 dark:text-gray-300">Pets Allowed</span>
          </label>
          <label className="flex items-center space-x-2 mb-2">
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
            <span className="text-sm text-gray-700 dark:text-gray-300">Available Now</span>
          </label>
        </div>
      </div>
    </Card>
  );
};