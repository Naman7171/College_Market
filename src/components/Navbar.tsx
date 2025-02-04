import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Bell, MessageCircle, Sun, Moon, Menu, X, Calendar } from 'lucide-react';
import { NotificationPanel } from './layout/NotificationPanel';
import { EventDropdown } from './events/EventDropdown';
import type { Event } from '../types';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Hackathon 2024',
    description: 'Join us for 24 hours of coding, innovation, and fun!',
    date: '2024-04-15T09:00:00Z',
    endDate: '2024-04-16T09:00:00Z',
    location: 'Engineering Building',
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
    eligibility: 'All students',
    status: 'active',
    visibility: 'public',
    department: 'Computer Science',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
  }
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const eventDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (eventDropdownRef.current && !eventDropdownRef.current.contains(event.target as Node)) {
        setShowEventDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed w-full z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                CollegeMarket
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/marketplace" className="nav-link">Marketplace</Link>
            <Link to="/housing" className="nav-link">Housing</Link>
            <div className="relative" ref={eventDropdownRef}>
              <button
                className="nav-link flex items-center"
                onClick={() => setShowEventDropdown(!showEventDropdown)}
              >
                Events
                <Calendar className="w-4 h-4 ml-1" />
              </button>
              {showEventDropdown && (
                <div className="absolute right-0 mt-2">
                  <EventDropdown events={mockEvents} />
                </div>
              )}
            </div>
            <Link to="/forum" className="nav-link">Community</Link>
            
            {isAuthenticated ? (
              <>
                <NotificationPanel />
                <Link to="/messages" className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </Link>
                <button 
                  onClick={logout}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Login
              </Link>
            )}
            
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/marketplace" className="mobile-nav-link block">Marketplace</Link>
            <Link to="/housing" className="mobile-nav-link block">Housing</Link>
            <Link to="/events" className="mobile-nav-link block">Events</Link>
            <Link to="/forum" className="mobile-nav-link block">Community</Link>
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="w-full text-left mobile-nav-link"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login"
                className="mobile-nav-link block"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};