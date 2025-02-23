import React, { useState, useRef } from 'react';
import { Upload, X, Share2, Eye } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Checkbox } from '../common/Checkbox';
import type { ForumPost, User } from '../../types';

interface CreatePostFormProps {
  onSubmit: (post: Omit<ForumPost, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'replies'>) => void;
  onPreview?: (post: Partial<ForumPost>) => void;
}

const categories = [
  { value: 'general', label: 'General Discussion' },
  { value: 'academic', label: 'Academic' },
  { value: 'events', label: 'Events' },
  { value: 'housing', label: 'Housing' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'lost-found', label: 'Lost & Found' }
];

const tags = [
  'Question',
  'Discussion',
  'Announcement',
  'Help Needed',
  'Tips',
  'Resources',
  'Social',
  'Important'
];

export const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, onPreview }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [] as string[],
    location: '',
    isAnonymous: false,
    allowComments: true,
    isPinned: false,
    images: [] as string[]
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    const files = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length > 5) {
      setErrors(prev => ({
        ...prev,
        images: 'Maximum 5 images allowed'
      }));
      return;
    }

    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setSelectedFiles(prev => [...prev, ...files]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newPreviewUrls]
    }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const newPost = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        author: mockUser,
        images: formData.images,
        location: formData.location,
        isAnonymous: formData.isAnonymous,
        allowComments: formData.allowComments,
        isPinned: formData.isPinned
      };

      onSubmit(newPost);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview({
        ...formData,
        author: mockUser
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter your post title"
          error={errors.title}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full p-2 
            bg-white dark:bg-gray-800 
            border border-gray-300 dark:border-gray-600 
            rounded-lg 
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-primary-500 focus:border-transparent
            transition-all duration-200"
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="w-full px-3 py-2 
            bg-white dark:bg-gray-800 
            border border-gray-300 dark:border-gray-600 
            rounded-lg 
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:ring-2 focus:ring-primary-500 focus:border-transparent
            transition-all duration-200
            min-h-[200px]"
          placeholder="Write your post content..."
          required
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Checkbox
              key={tag}
              label={tag}
              checked={formData.tags.includes(tag)}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  tags: e.target.checked
                    ? [...prev.tags, tag]
                    : prev.tags.filter(t => t !== tag)
                }));
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <Input
          label="Location (Optional)"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="Add a location to your post"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Images</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {previewUrls.length < 5 && (
            <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 aspect-square">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                multiple
              />
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Add Photos
                </span>
              </div>
            </label>
          )}
        </div>
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images}</p>
        )}
      </div>

      <div className="space-y-4">
        <Checkbox
          label="Post Anonymously"
          checked={formData.isAnonymous}
          onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
          description="Your name won't be visible to other users"
        />

        <Checkbox
          label="Allow Comments"
          checked={formData.allowComments}
          onChange={(e) => setFormData(prev => ({ ...prev, allowComments: e.target.checked }))}
          description="Others can comment on your post"
        />

        <Checkbox
          label="Pin to Profile"
          checked={formData.isPinned}
          onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
          description="Post will be pinned to the top of your profile"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handlePreview}
          className="flex items-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex items-center"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          Create Post
        </Button>
      </div>
    </form>
  );
};