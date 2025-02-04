import React from 'react';
import { Bookmark } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface BookmarkButtonProps {
  itemId: string;
  itemType: 'listing' | 'housing';
  isBookmarked?: boolean;
  onToggle: () => void;
}

export const BookmarkButton = ({ 
  itemId, 
  itemType, 
  isBookmarked = false, 
  onToggle 
}: BookmarkButtonProps) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full transition-colors duration-200 
        ${isBookmarked 
          ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400' 
          : 'bg-white/80 text-gray-600 hover:bg-gray-100 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-700'
        }`}
      aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      <Bookmark 
        className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} 
      />
    </button>
  );
};