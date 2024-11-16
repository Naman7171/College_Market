import React from 'react';
import { Card } from '../common/Card';
import { MessageCircle, Heart } from 'lucide-react';
import type { Listing } from '../../types';

interface ListingCardProps {
  listing: Listing;
  onContact?: () => void;
}

export const ListingCard = ({ listing, onContact }: ListingCardProps) => {
  return (
    <Card>
      <div className="relative">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {listing.description}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-bold text-indigo-600">
            ${listing.price}
          </span>
          <span className="text-sm text-gray-500">{listing.condition}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src={listing.seller.avatar}
              alt={listing.seller.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {listing.seller.name}
            </span>
          </div>
          <button
            onClick={onContact}
            className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <MessageCircle className="w-4 h-4" />
            Contact
          </button>
        </div>
      </div>
    </Card>
  );
};