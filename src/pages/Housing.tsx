import React from 'react';
import { Plus, MapPin, Bed, Bath, Wifi } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';
import { HousingCard } from '../components/housing/HousingCard';
import { HousingFilters } from '../components/housing/HousingFilters';
import { SearchBar } from '../components/marketplace/SearchBar';
import type { HousingListing } from '../types';

const mockListings: HousingListing[] = [
  {
    id: '1',
    title: 'Modern Studio Apartment Near Campus',
    description: 'Fully furnished studio apartment just 5 minutes walk from main campus. Perfect for students.',
    price: 800,
    type: 'apartment',
    location: '123 College Ave',
    bedrooms: 0,
    bathrooms: 1,
    amenities: ['WiFi', 'Air Conditioning', 'Laundry', 'Parking'],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80'],
    available: '2024-04-01',
    landlord: {
      id: '1',
      name: 'John Smith',
      email: 'john@property.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
    },
    createdAt: '2024-03-10T12:00:00Z',
    utilities: true,
    petsAllowed: false,
    furnished: true
  },
  {
    id: '2',
    title: '2BR Townhouse with Backyard',
    description: 'Spacious 2-bedroom townhouse with private backyard. Recently renovated kitchen and bathrooms.',
    price: 1200,
    type: 'house',
    location: '456 University Dr',
    bedrooms: 2,
    bathrooms: 1.5,
    amenities: ['Backyard', 'Dishwasher', 'Central Heating', 'Storage'],
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80'],
    available: '2024-05-01',
    landlord: {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@realty.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
    },
    createdAt: '2024-03-09T15:30:00Z',
    utilities: false,
    petsAllowed: true,
    furnished: false
  }
];

export const Housing = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Student Housing"
        description="Find your perfect home near campus"
        action={
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            List Property
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <HousingFilters />
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <SearchBar />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockListings.map((listing) => (
              <HousingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};