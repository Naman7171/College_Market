import React from 'react';
import { Card } from '../common/Card';
import { MessageCircle, Heart } from 'lucide-react';
import { ReportButton } from '../common/ReportButton';
import { BookmarkButton } from '../common/BookmarkButton';
import { ContactButtons } from '../common/ContactButtons';
import { VerificationBadge } from '../common/VerificationBadge';
import type { Listing } from '../../types';

interface ListingCardProps {
  listing: Listing;
  onContact?: () => void;
  onReport?: (reason: string) => void;
  onBookmarkToggle?: () => void;
  isBookmarked?: boolean;
}

export const ListingCard = ({ 
  listing, 
  onContact,
  onReport,
  onBookmarkToggle,
  isBookmarked = false
}: ListingCardProps) => {
  return (
    <Card>
      <div className="relative">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <BookmarkButton
            itemId={listing.id}
            itemType="listing"
            isBookmarked={isBookmarked}
            onToggle={() => onBookmarkToggle?.()}
          />
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{listing.title}</h3>
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            ${listing.price}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {listing.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            {listing.condition}
          </span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            {listing.category}
          </span>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <img
              src={listing.seller.avatar}
              alt={listing.seller.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <span className="text-sm font-medium block">
                {listing.seller.name}
              </span>
              <VerificationBadge 
                type={listing.seller.role === 'faculty' ? 'faculty' : 'student'}
                className="mt-1"
              />
            </div>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(listing.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <ContactButtons 
            email={listing.seller.email}
            whatsapp={listing.seller.whatsapp}
          />
          <ReportButton
            itemId={listing.id}
            itemType="listing"
            onReport={(reason) => onReport?.(reason)}
          />
        </div>
      </div>
    </Card>
  );
};