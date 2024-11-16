// src/components/forum/PostQuestionForm.tsx

import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface PostQuestionFormProps {
  onAddPost: (title: string, content: string, category: string, imageUrl?: string) => void;
}

export const PostQuestionForm: React.FC<PostQuestionFormProps> = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a delay before adding the post
    setTimeout(() => {
      onAddPost(title, content, category, imageUrl);
      setTitle('');
      setContent('');
      setCategory('General');
      setImageUrl('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        required
      />
      <Input
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter post content"
        required
      />
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="General">General</option>
          <option value="Technical">Technical</option>
          <option value="Housing">Housing</option>
          <option value="Events">Events</option>
        </select>
      </div>
      <Input
        label="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter image URL"
      />
      <Button type="submit" variant="primary" isLoading={isSubmitting}>
        Post Question
      </Button>
    </form>
  );
};
