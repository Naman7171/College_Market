// src/components/forum/CommunityHeader.tsx

import React, { useState } from 'react';
import { Button } from '../common/Button';

const categories = ['General', 'Technical', 'Housing', 'Events'];

interface CommunityHeaderProps {
  onOpenCreatePostModal: () => void;
}

export const CommunityHeader: React.FC<CommunityHeaderProps> = ({ onOpenCreatePostModal }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search Questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg w-1/3"
        />

        <div className="flex space-x-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">Sort By</option>
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="primary" onClick={onOpenCreatePostModal}>
          Create Post
        </Button>
      </div>
    </div>
  );
};
