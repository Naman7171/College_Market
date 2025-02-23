import React, { useState } from 'react';
import { Upload, X, Share2 } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Checkbox } from '../common/Checkbox';
import type { LostItem } from '../../types';

interface LostItemFormProps {
  onSubmit: (item: Omit<LostItem, 'id'>) => void;
}

interface FormData extends Omit<LostItem, 'id'> {
  isUrgent?: boolean;
  reward?: string;
  status: 'lost' | 'found';
}

export const LostItemForm: React.FC<LostItemFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    itemName: '',
    description: '',
    location: '',
    dateLost: '',
    contactInfo: '',
    status: 'lost',
    isUrgent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

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
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.itemName) newErrors.itemName = 'Item name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.dateLost) newErrors.dateLost = 'Date is required';
    if (!formData.contactInfo) newErrors.contactInfo = 'Contact information is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Item Name"
        value={formData.itemName}
        onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
        error={errors.itemName}
        placeholder="Enter item name"
        required
      />

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
          placeholder="Describe the item in detail (color, brand, distinguishing features, etc.)"
          required
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <Input
        label="Location"
        value={formData.location}
        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
        error={errors.location}
        placeholder="Where was the item lost/found?"
        required
      />

      <Input
        type="datetime-local"
        label="Date & Time"
        value={formData.dateLost}
        onChange={(e) => setFormData(prev => ({ ...prev, dateLost: e.target.value }))}
        error={errors.dateLost}
        required
      />

      <div className="md:col-span-2">
        <Input
          label="Contact Information"
          value={formData.contactInfo}
          onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
          error={errors.contactInfo}
          placeholder="Email or phone number"
          required
        />
      </div>

      <div className="md:col-span-2">
        <Input
          label="Reward (Optional)"
          value={formData.reward}
          onChange={(e) => setFormData(prev => ({ ...prev, reward: e.target.value }))}
          placeholder="Enter reward amount if applicable"
        />
      </div>

      <div className="md:col-span-2">
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
        <p className="mt-2 text-sm text-gray-500">
          Upload up to 5 photos to help identify the item.
        </p>
      </div>

      <div className="md:col-span-2">
        <Checkbox
          label="Mark as Urgent"
          checked={formData.isUrgent}
          onChange={(e) => setFormData(prev => ({ ...prev, isUrgent: e.target.checked }))}
          description="This will highlight your post and notify nearby users"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-2">Status</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="lost"
              checked={formData.status === 'lost'}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'lost' | 'found' }))}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm">Lost</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="found"
              checked={formData.status === 'found'}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'lost' | 'found' }))}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm">Found</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" className="flex items-center">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button type="submit" variant="primary">
          Submit Report
        </Button>
      </div>
    </form>
  );
};