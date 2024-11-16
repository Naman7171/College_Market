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
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="text-sm">{category}</span>
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
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="text-sm">{condition}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="font-medium mb-2">Sort By</h3>
          <select className="w-full p-2 border rounded-lg">
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