import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
      image: imagePreview || undefined
    };

    try {
      onSubmit(newPost);
      setTitle('');
      setContent('');
      setCategory('general');
      setSelectedImage(null);
      setImagePreview('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Post</h2>

      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter your post title"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            hover:border-gray-300 dark:hover:border-gray-600
            min-h-[120px]
            shadow-sm
            transition-all duration-200"
          placeholder="Write your post content..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            hover:border-gray-300 dark:hover:border-gray-600
            shadow-sm
            transition-all duration-200"
        >
          <option value="general">General</option>
          <option value="technical">Technical</option>
          <option value="housing">Housing</option>
          <option value="events">Events</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Image (optional)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </Button>
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
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