import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import type { LostItem } from '../../types';

interface LostItemFormProps {
  onSubmit: (item: Omit<LostItem, 'id'>) => void;
}

export const LostItemForm: React.FC<LostItemFormProps> = ({ onSubmit }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateLost, setDateLost] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Omit<LostItem, 'id'> = {
      itemName,
      description,
      location,
      dateLost,
      contactInfo,
    };
    onSubmit(newItem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Report Lost Item</h2>

      <Input
        label="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Enter item name"
        required
      />

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 
            rounded-lg 
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            transition-all duration-200
            min-h-[100px]"
          placeholder="Describe the lost item"
          required
        />
      </div>

      <Input
        label="Location Lost"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Where was the item lost?"
        required
      />

      <Input
        type="date"
        label="Date Lost"
        value={dateLost}
        onChange={(e) => setDateLost(e.target.value)}
        required
      />

      <Input
        label="Contact Information"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        placeholder="Email or phone number"
        required
      />

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};
