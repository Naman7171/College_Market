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
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

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
            <Link to="/events" className="nav-link">Events</Link>
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