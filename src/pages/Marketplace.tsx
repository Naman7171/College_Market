import React from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { ListingFilters } from '../components/marketplace/ListingFilters';
import { SearchBar } from '../components/marketplace/SearchBar';
import { ListingCard } from '../components/marketplace/ListingCard';
import { Button } from '../components/common/Button';

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
  {
    id: '2',
    title: 'Study Desk',
    description: 'Sturdy wooden desk perfect for studying. Includes built-in lamp and drawer.',
    price: 80,
    category: 'Furniture',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80'],
    condition: 'Good',
    createdAt: '2024-03-09T15:30:00Z',
    seller: {
      id: '2',
      name: 'Emma Smith',
      email: 'emma@university.edu',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: '3',
    title: 'MacBook Pro 2019',
    description: '13-inch, 16GB RAM, 512GB SSD. Perfect for programming and design work.',
    price: 800,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'],
    condition: 'Excellent',
    createdAt: '2024-03-08T09:15:00Z',
    seller: {
      id: '3',
      name: 'Mike Roberts',
      email: 'mike@university.edu',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    }
  }
];

export const Marketplace = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Marketplace"
        description="Buy and sell items within your college community"
        action={
          <Button variant="primary">
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
            {mockListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onContact={() => console.log('Contact seller:', listing.seller.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};