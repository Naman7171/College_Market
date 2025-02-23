import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

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
    { label: 'Under ₹100', range: [0, 100] },
    { label: '₹100 to ₹500', range: [100, 500] },
    { label: '₹500 to ₹2000', range: [500, 2000] },
    { label: 'Over ₹2000', range: [2000, Infinity] }
  ],
  Books: [
    { label: 'Under ₹50', range: [0, 50] },
    { label: '₹50 to ₹200', range: [50, 200] },
    { label: '₹200 to ₹500', range: [200, 500] },
    { label: 'Over ₹500', range: [500, Infinity] }
  ],
  Fashion: [
    { label: 'Under ₹30', range: [0, 30] },
    { label: '₹30 to ₹100', range: [30, 100] },
    { label: '₹100 to ₹500', range: [100, 500] },
    { label: 'Over ₹500', range: [500, Infinity] }
  ],
  Home: [
    { label: 'Under ₹50', range: [0, 50] },
    { label: '₹50 to ₹200', range: [50, 200] },
    { label: '₹200 to ₹1000', range: [200, 1000] },
    { label: 'Over ₹1000', range: [1000, Infinity] }
  ],
  Sports: [
    { label: 'Under ₹100', range: [0, 100] },
    { label: '₹100 to ₹300', range: [100, 300] },
    { label: '₹300 to ₹1000', range: [300, 1000] },
    { label: 'Over ₹1000', range: [1000, Infinity] }
  ],
  Other: [
    { label: 'Under ₹50', range: [0, 50] },
    { label: '₹50 to ₹200', range: [50, 200] },
    { label: '₹200 to ₹1000', range: [200, 1000] },
    { label: 'Over ₹1000', range: [1000, Infinity] }
  ]
};

export const ListingFilters = ({ onFilterChange, className = '' }: ListingFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: { min: 0, max: Infinity }, // Initialize with no upper limit
    categories: [],
    conditions: [],
    location: '',
    rating: null,
  });

  const [tempPriceRange, setTempPriceRange] = useState(filters.priceRange);
  const [selectedCategory, setSelectedCategory] = useState<string>('Other');

  useEffect(() => {
    // Apply filters whenever they change
    onFilterChange?.(filters);
  }, [filters, onFilterChange]);

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
      max: range[1],
    });
    setFilters(prev => ({
      ...prev,
      priceRange: { min: range[0], max: range[1] }
    }));
  };

  const handleCustomPriceChange = () => {
    setFilters(prev => ({
      ...prev,
      priceRange: tempPriceRange
    }));
  };

  const clearFilters = () => {
    const defaultFilters = {
      priceRange: { min: 0, max: Infinity },
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
      <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          {/* Suggested price ranges */}
          <div className="space-y-2">
            {suggestedPriceRanges[selectedCategory as keyof typeof suggestedPriceRanges].map((range, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedRangeClick(range.range)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors
                  ${(filters.priceRange.min === range.range[0] && filters.priceRange.max === range.range[1])
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Custom price range input */}
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={tempPriceRange.min === 0 ? '' : tempPriceRange.min}
              onChange={(e) => setTempPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
              className="w-24"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              value={tempPriceRange.max === Infinity ? '' : tempPriceRange.max}
              onChange={(e) => setTempPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || Infinity }))}
              className="w-24"
            />
            <Button
              variant="secondary"
              onClick={handleCustomPriceChange}
              size="sm"
              className="py-1"
            >
              Go
            </Button>
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
