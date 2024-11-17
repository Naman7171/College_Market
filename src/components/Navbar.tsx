import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Bell, MessageCircle, Sun, Moon, Menu, X } from 'lucide-react';
import { NotificationPanel } from './layout/NotificationPanel';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isDark, toggleTheme } = useThemeStore();
  const { isAuthenticated, user, logout } = useAuthStore();

  React.useEffect(() => {
    // Initialize theme on mount
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                CollegeMarket
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/marketplace" className="nav-link">Marketplace</Link>
            <Link to="/housing" className="nav-link">Housing</Link>
            <Link to="/events" className="nav-link">Events</Link>
            <Link to="/forum" className="nav-link">Community</Link>
            
            {isAuthenticated ? (
              <>
                <NotificationPanel />
                <Link to="/messages" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <MessageCircle className="w-5 h-5" />
                </Link>
                <button 
                  onClick={logout}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
            
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800">
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