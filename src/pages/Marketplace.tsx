import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { ListingFilters } from '../components/marketplace/ListingFilters';
import { SearchBar } from '../components/marketplace/SearchBar';
import { ListingCard } from '../components/marketplace/ListingCard';
import { ListingWizard } from '../components/marketplace/ListingWizard';
import { Button } from '../components/common/Button';
import type { Listing } from '../types';

const mockListings = [
  {
    id: '1',
    title: 'Calculus Textbook',
    description: 'Calculus: Early Transcendentals 8th Edition. Like new condition, no highlights or marks.',
    price: 45,
    category: 'Textbooks',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'],
    condition: 'Like New',
    createdAt: '2024-03-10T12:00:00Z',
    seller: {
      id: '1',
      name: 'John Doe',
      email: 'john@university.edu',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
    }
  },
  // ... other listings
];

export const Marketplace = () => {
  const [showListingWizard, setShowListingWizard] = useState(false);
  const [listings, setListings] = useState<Listing[]>(mockListings);

  const handleCreateListing = (listingData: any) => {
    const newListing: Listing = {
      id: Date.now().toString(),
      ...listingData,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    };
    setListings(prev => [newListing, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Marketplace"
        description="Buy and sell items within your college community"
        action={
          <Button
            variant="primary"
            onClick={() => setShowListingWizard(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            List Item
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <ListingFilters />
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <SearchBar />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onContact={() => console.log('Contact seller:', listing.seller.name)}
              />
            ))}
          </div>
        </div>
      </div>

      {showListingWizard && (
        <ListingWizard
          onClose={() => setShowListingWizard(false)}
          onSubmit={handleCreateListing}
        />
      )}
    </div>
  );
};
