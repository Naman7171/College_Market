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
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="text-sm">{type}</span>
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
          <select className="w-full p-2 border rounded-lg">
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
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="font-medium mb-2">More Filters</h3>
          <label className="flex items-center space-x-2 mb-2">
            <input type="checkbox" className="rounded text-indigo-600" />
            <span className="text-sm">Pets Allowed</span>
          </label>
          <label className="flex items-center space-x-2 mb-2">
            <input type="checkbox" className="rounded text-indigo-600" />
            <span className="text-sm">Available Now</span>
          </label>
        </div>
      </div>
    </Card>
  );
};