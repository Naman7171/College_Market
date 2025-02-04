import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Users, Clock, Filter, Eye, Edit2, Trash2 } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { EventForm } from '../components/events/EventForm';
import { EventCard } from '../components/events/EventCard';
import { EventFilters } from '../components/events/EventFilters';
import type { Event } from '../types';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Hackathon 2024',
    description: 'Join us for 24 hours of coding, innovation, and fun! Build solutions for real-world problems.',
    date: '2024-04-15T09:00:00Z',
    endDate: '2024-04-16T09:00:00Z',
    location: 'Engineering Building, Room 201',
    type: 'hackathon',
    organizer: {
      id: '1',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@university.edu',
      role: 'faculty',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    },
    category: 'Technology',
    attendees: [],
    maxAttendees: 100,
    registrationDeadline: '2024-04-10T23:59:59Z',
    eligibility: 'All undergraduate students',
    status: 'active',
    visibility: 'public',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    department: 'Computer Science'
  },
  {
    id: '2',
    title: 'Research Workshop Series',
    description: 'Learn essential research methodologies and paper writing techniques.',
    date: '2024-04-20T14:00:00Z',
    endDate: '2024-04-20T17:00:00Z',
    location: 'Online (Zoom)',
    type: 'workshop',
    organizer: {
      id: '2',
      name: 'Prof. Michael Brown',
      email: 'michael.brown@university.edu',
      role: 'faculty',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
    },
    category: 'Academic',
    attendees: [],
    maxAttendees: 50,
    registrationDeadline: '2024-04-18T23:59:59Z',
    eligibility: 'Graduate students and faculty',
    status: 'active',
    visibility: 'public',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    department: 'Research Department'
  }
];

export const Events = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    department: 'all',
    status: 'active'
  });

  const handleCreateEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      attendees: []
    };
    setEvents(prev => [newEvent, ...prev]);
    setIsModalOpen(false);
  };

  const handleEditEvent = (eventData: Event) => {
    setEvents(prev => prev.map(event => 
      event.id === eventData.id ? eventData : event
    ));
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const handleToggleStatus = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, status: event.status === 'active' ? 'inactive' : 'active' }
        : event
    ));
  };

  const filteredEvents = events.filter(event => {
    if (filters.type !== 'all' && event.type !== filters.type) return false;
    if (filters.department !== 'all' && event.department !== filters.department) return false;
    if (filters.status !== 'all' && event.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Events"
        description="Manage and discover campus events"
        action={
          <Button 
            variant="primary"
            onClick={() => {
              setSelectedEvent(null);
              setIsPreviewMode(false);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <EventFilters
            filters={filters}
            onChange={setFilters}
          />
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={() => {
                  setSelectedEvent(event);
                  setIsPreviewMode(false);
                  setIsModalOpen(true);
                }}
                onDelete={() => handleDeleteEvent(event.id)}
                onToggleStatus={() => handleToggleStatus(event.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
          setIsPreviewMode(false);
        }}
      >
        <EventForm
          event={selectedEvent}
          isPreview={isPreviewMode}
          onSubmit={selectedEvent ? handleEditEvent : handleCreateEvent}
          onPreview={() => setIsPreviewMode(!isPreviewMode)}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
            setIsPreviewMode(false);
          }}
        />
      </Modal>
    </div>
  );
};