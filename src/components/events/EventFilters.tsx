import React from 'react';
import { Filter } from 'lucide-react';
import { Card } from '../common/Card';

interface EventFiltersProps {
  filters: {
    type: string;
    department: string;
    status: string;
  };
  onChange: (filters: any) => void;
}

const eventTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'seminar', label: 'Seminar' },
  { value: 'conference', label: 'Conference' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'sports', label: 'Sports' },
  { value: 'other', label: 'Other' }
];

const departments = [
  { value: 'all', label: 'All Departments' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Business', label: 'Business' },
  { value: 'Arts', label: 'Arts' },
  { value: 'Science', label: 'Science' },
  { value: 'Research Department', label: 'Research' },
  { value: 'Student Affairs', label: 'Student Affairs' }
];

const statuses = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

export const EventFilters = ({ filters, onChange }: EventFiltersProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Filters</h2>
        <Filter className="w-5 h-5" />
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Event Type</h3>
          <select
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value })}
            className="w-full p-2 
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 
              rounded-lg 
              text-gray-900 dark:text-white
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              transition-all duration-200"
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-medium mb-2">Department</h3>
          <select
            value={filters.department}
            onChange={(e) => onChange({ ...filters, department: e.target.value })}
            className="w-full p-2 
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 
              rounded-lg 
              text-gray-900 dark:text-white
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              transition-all duration-200"
          >
            {departments.map(dept => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-medium mb-2">Status</h3>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="w-full p-2 
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 
              rounded-lg 
              text-gray-900 dark:text-white
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              transition-all duration-200"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};