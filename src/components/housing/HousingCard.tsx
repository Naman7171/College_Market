import React from 'react';
import { MapPin, Bed, Bath, Wifi, MessageCircle } from 'lucide-react';
import { Card } from '../common/Card';
import type { HousingListing } from '../../types';

interface HousingCardProps {
  listing: HousingListing;
}

export const HousingCard = ({ listing }: HousingCardProps) => {
  return (
    <Card>
      <div className="relative">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 px-2 py-1 bg-indigo-600 text-white text-sm rounded">
          {listing.type}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{listing.title}</h3>
          <span className="text-xl font-bold text-indigo-600">
            ${listing.price}/mo
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{listing.location}</span>
        </div>

        <div className="flex gap-4 mb-3">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{listing.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-sm">{listing.bathrooms} bath</span>
          </div>
          {listing.utilities && (
            <div className="flex items-center">
              <Wifi className="w-4 h-4 mr-1" />
              <span className="text-sm">Utils</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {listing.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm"
            >
              {amenity}
            </span>
          ))}
          {listing.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
              +{listing.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src={listing.landlord.avatar}
              alt={listing.landlord.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {listing.landlord.name}
            </span>
          </div>
          <button className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            Contact
          </button>
        </div>
      </div>
    </Card>
  );
};