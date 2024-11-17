import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import type { ForumPost, User } from '../../types';

interface CreatePostFormProps {
  onSubmit: (post: Omit<ForumPost, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'replies'>) => void;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock user - in a real app, this would come from auth context
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newPost = {
      title,
      content,
      category,
      tags: [],
      author: mockUser,
    };

    try {
      onSubmit(newPost);
      setTitle('');
      setContent('');
      setCategory('general');
      setImageUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
      <h2 className="text-xl font-bold">Create New Post</h2>

      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter your post title"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
          placeholder="Write your post content..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="general">General</option>
          <option value="technical">Technical</option>
          <option value="housing">Housing</option>
          <option value="events">Events</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image (optional)
        </label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {/* Image upload logic */}}
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </Button>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-16 h-16 object-cover rounded"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" variant="primary" isLoading={isLoading}>
          Create Post
        </Button>
      </div>
    </form>
  );
};