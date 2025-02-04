import React from 'react';
import { Calendar, MapPin, Users, Clock, Edit2, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import type { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

export const EventCard = ({ event, onEdit, onDelete, onToggleStatus }: EventCardProps) => {
  const isActive = event.status === 'active';
  const isPast = new Date(event.date) < new Date();

  return (
    <Card className={`${isPast ? 'opacity-75' : ''}`}>
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${event.visibility === 'public' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
            }
          `}>
            {event.visibility}
          </span>
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${isActive
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
            }
          `}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{event.title}</h3>
          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100 rounded text-sm">
            {event.type}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
            {' - '}
            {new Date(event.endDate).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4 mr-2" />
            {event.attendees.length} / {event.maxAttendees} registered
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <img
              src={event.organizer.avatar}
              alt={event.organizer.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <span className="text-sm font-medium block">
                {event.organizer.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {event.organizer.email}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onToggleStatus}
              className="p-2"
            >
              {isActive ? (
                <ToggleRight className="w-5 h-5" />
              ) : (
                <ToggleLeft className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onEdit}
              className="p-2"
            >
              <Edit2 className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={onDelete}
              className="p-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};