import React from 'react';
import { Bell, X } from 'lucide-react';
import { Card } from '../common/Card';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'message' | 'alert' | 'update';
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Message',
    message: 'Sarah sent you a message about the textbook',
    type: 'message',
    timestamp: '5m ago',
    read: false,
  },
  {
    id: '2',
    title: 'System Alert',
    message: 'Scheduled maintenance tonight at 2 AM EST',
    type: 'alert',
    timestamp: '1h ago',
    read: false,
  },
  {
    id: '3',
    title: 'Listing Update',
    message: 'Your item "MacBook Pro" has 3 new interested buyers',
    type: 'update',
    timestamp: '2h ago',
    read: true,
  },
];

export const NotificationPanel = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-80 z-50"
        >
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Notifications</h3>
                <button className="text-sm text-indigo-600">Mark all as read</button>
              </div>
              <div className="space-y-4">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.read ? 'bg-gray-50 dark:bg-gray-700' : 'bg-indigo-50 dark:bg-indigo-900'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {notification.timestamp}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full text-center text-sm text-indigo-600 mt-4">
                View all notifications
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};