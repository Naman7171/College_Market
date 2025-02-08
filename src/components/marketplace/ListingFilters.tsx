import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../common/Button';

interface PriceRange {
  min: number;
  max: number;
}

interface FiltersState {
  priceRange: PriceRange;
  categories: string[];
  conditions: string[];
  location: string;
  rating: number | null;
}

interface ListingFiltersProps {
  onFilterChange?: (filters: FiltersState) => void;
  className?: string;
}

const categories = [
  'Electronics',
  'Books',
  'Fashion',
  'Home',
  'Sports',
  'Other'
];

const conditions = ['New', 'Like New', 'Good', 'Fair'];

// Suggested price ranges by category
const suggestedPriceRanges = {
  Electronics: [
    { label: 'Budget', range: [0, 100] },
    { label: 'Mid-range', range: [100, 500] },
    { label: 'Premium', range: [500, 2000] }
  ],
  Books: [
    { label: 'Used textbooks', range: [20, 50] },
    { label: 'New textbooks', range: [50, 200] },
    { label: 'Premium editions', range: [200, 500] }
  ],
  Fashion: [
    { label: 'Basic', range: [5, 30] },
    { label: 'Casual', range: [30, 100] },
    { label: 'Designer', range: [100, 500] }
  ],
  Home: [
    { label: 'Accessories', range: [10, 50] },
    { label: 'Small furniture', range: [50, 200] },
    { label: 'Large furniture', range: [200, 1000] }
  ],
  Sports: [
    { label: 'Equipment', range: [20, 100] },
    { label: 'Gear', range: [100, 300] },
    { label: 'Professional', range: [300, 1000] }
  ],
  Other: [
    { label: 'Budget', range: [0, 50] },
    { label: 'Mid-range', range: [50, 200] },
    { label: 'Premium', range: [200, 1000] }
  ]
};

export const ListingFilters = ({ onFilterChange, className = '' }: ListingFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: { min: 0, max: 1000 },
    categories: [],
    conditions: [],
    location: '',
    rating: null,
  });

  const [tempPriceRange, setTempPriceRange] = useState(filters.priceRange);
  const [selectedCategory, setSelectedCategory] = useState<string>('Other');

  useEffect(() => {
    // Update max price range based on selected category
    const categoryRanges = suggestedPriceRanges[selectedCategory as keyof typeof suggestedPriceRanges];
    const maxPrice = Math.max(...categoryRanges.map(range => range.range[1]));
    setTempPriceRange(prev => ({
      ...prev,
      max: Math.min(prev.max, maxPrice)
    }));
  }, [selectedCategory]);

  const handlePriceChange = (value: string) => {
    const numValue = parseInt(value);
    const categoryRanges = suggestedPriceRanges[selectedCategory as keyof typeof suggestedPriceRanges];
    const maxPrice = Math.max(...categoryRanges.map(range => range.range[1]));
    
    setTempPriceRange(prev => ({
      min: 0,
      max: Math.min(numValue, maxPrice)
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategory(category);
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [category];
      
      return {
        ...prev,
        categories: newCategories
      };
    });
  };

  const handleConditionToggle = (condition: string) => {
    setFilters(prev => {
      const newConditions = prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition];
      
      return {
        ...prev,
        conditions: newConditions
      };
    });
  };

  const handleSuggestedRangeClick = (range: number[]) => {
    setTempPriceRange({
      min: range[0],
      max: range[1]
    });
  };

  const applyFilters = () => {
    setFilters(prev => ({
      ...prev,
      priceRange: tempPriceRange
    }));
    onFilterChange?.(filters);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const clearFilters = () => {
    const defaultFilters = {
      priceRange: { min: 0, max: 1000 },
      categories: [],
      conditions: [],
      location: '',
      rating: null,
    };
    setFilters(defaultFilters);
    setTempPriceRange(defaultFilters.priceRange);
    setSelectedCategory('Other');
    onFilterChange?.(defaultFilters);
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={selectedCategory === category}
                onChange={() => handleCategoryToggle(category)}
                className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-full focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            ₹{tempPriceRange.min} - ₹{tempPriceRange.max}
          </div>

          {/* Suggested price ranges */}
          <div className="space-y-2">
            {suggestedPriceRanges[selectedCategory as keyof typeof suggestedPriceRanges].map((range, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedRangeClick(range.range)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors
                  ${tempPriceRange.max === range.range[1]
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
              >
                {range.label} (₹{range.range[0]} - ₹{range.range[1]})
              </button>
            ))}
          </div>

          {/* Slider */}
          <div className="relative pt-2">
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 rounded-full transition-all duration-150"
                style={{
                  width: `${(tempPriceRange.max / suggestedPriceRanges[selectedCategory as keyof typeof suggestedPriceRanges][2].range[1]) * 100}%`
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max={suggestedPriceRanges[selectedCategory as keyof typeof suggestedPriceRanges][2].range[1]}
              value={tempPriceRange.max}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="absolute top-0 w-full h-1 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Conditions */}
      <div>
        <h3 className="font-medium mb-4">Condition</h3>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <label key={condition} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.conditions.includes(condition)}
                onChange={() => handleConditionToggle(condition)}
                className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-medium mb-4">Location</h3>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          placeholder="Enter location"
          className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
      <div>
          <h3 className="font-medium mb-2">Categories</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          variant="secondary"
          onClick={clearFilters}
          className="flex-1"
        >
          Clear All
        </Button>
        <Button
          variant="primary"
          onClick={applyFilters}
          className="flex-1"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  // Mobile view
  if (window.innerWidth < 768) {
    return (
      <div className={className}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            <span>Filters</span>
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {isOpen && (
          <Card className="mt-2 p-4">
            {filterContent}
          </Card>
        )}
      </div>
    );
  }

  // Desktop view
    return (
    <Card className={`p-4 sticky top-20 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold">Filters</h2>
        <Filter className="w-5 h-5" />
      </div>
      {filterContent}
    </Card>
  );
};
