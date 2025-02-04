import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import { Card } from '../common/Card';
import type { Event } from '../../types';

interface EventDropdownProps {
  events: Event[];
}

export const EventDropdown = ({ events }: EventDropdownProps) => {
  const upcomingEvents = events
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <Card className="w-80 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Upcoming Events</h3>
        <Calendar className="w-5 h-5 text-gray-500" />
      </div>

      <div className="space-y-4">
        {upcomingEvents.map(event => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-sm">{event.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100">
                {event.type}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/events"
        className="flex items-center justify-center mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        View All Events
        <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </Card>
  );
};