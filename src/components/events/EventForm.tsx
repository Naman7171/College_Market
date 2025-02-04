import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Image as ImageIcon, Eye, X } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { EventCard } from './EventCard';
import type { Event } from '../../types';

interface EventFormProps {
  event?: Event | null;
  isPreview?: boolean;
  onSubmit: (event: Event) => void;
  onPreview: () => void;
  onCancel: () => void;
}

const eventTypes = [
  'hackathon',
  'workshop',
  'seminar',
  'conference',
  'cultural',
  'sports',
  'other'
];

const departments = [
  'Computer Science',
  'Engineering',
  'Business',
  'Arts',
  'Science',
  'Research Department',
  'Student Affairs'
];

export const EventForm = ({ event, isPreview, onSubmit, onPreview, onCancel }: EventFormProps) => {
  const [formData, setFormData] = useState<Partial<Event>>(event || {
    title: '',
    description: '',
    date: '',
    endDate: '',
    location: '',
    type: '',
    category: '',
    maxAttendees: 0,
    registrationDeadline: '',
    eligibility: '',
    status: 'active',
    visibility: 'public',
    department: '',
    image: '',
    organizer: {
      id: '1',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@university.edu',
      role: 'faculty',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.location?.trim()) newErrors.location = 'Location is required';
    if (!formData.type) newErrors.type = 'Event type is required';
    if (!formData.maxAttendees || formData.maxAttendees <= 0) {
      newErrors.maxAttendees = 'Valid maximum attendees is required';
    }
    if (!formData.registrationDeadline) {
      newErrors.registrationDeadline = 'Registration deadline is required';
    }
    if (!formData.eligibility?.trim()) newErrors.eligibility = 'Eligibility criteria is required';
    if (!formData.department) newErrors.department = 'Department is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit(formData as Event);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isPreview && formData) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Preview Event</h2>
          <Button variant="outline" onClick={onPreview}>
            <X className="w-4 h-4 mr-2" />
            Close Preview
          </Button>
        </div>
        <EventCard
          event={formData as Event}
          onEdit={() => {}}
          onDelete={() => {}}
          onToggleStatus={() => {}}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold mb-4">
        {event ? 'Edit Event' : 'Create New Event'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-3 py-2 
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            transition-all duration-200"
          required
        >
          <option value="">Select Event Type</option>
          {eventTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            transition-all duration-200
            min-h-[100px]"
          required
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="datetime-local"
          label="Start Date & Time"
          name="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
        />

        <Input
          type="datetime-local"
          label="End Date & Time"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          error={errors.endDate}
          required
        />
      </div>

      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Building name, room number, or online platform"
        error={errors.location}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          label="Maximum Participants"
          name="maxAttendees"
          value={formData.maxAttendees}
          onChange={handleChange}
          min="1"
          error={errors.maxAttendees}
          required
        />

        <Input
          type="datetime-local"
          label="Registration Deadline"
          name="registrationDeadline"
          value={formData.registrationDeadline}
          onChange={handleChange}
          error={errors.registrationDeadline}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full px-3 py-2 
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            transition-all duration-200"
          required
        >
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <select
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
          className="w-full px-3 py-2 
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            transition-all duration-200"
          required
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      <Input
        label="Eligibility Criteria"
        name="eligibility"
        value={formData.eligibility}
        onChange={handleChange}
        placeholder="Who can attend this event?"
        error={errors.eligibility}
        required
      />

      <Input
        label="Event Banner URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
        error={errors.image}
      />

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" variant="outline" onClick={onPreview}>
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button type="submit" variant="primary">
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
};