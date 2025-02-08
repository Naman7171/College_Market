import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';
import { Plus } from 'lucide-react';
import { LostItemForm } from '../components/lostAndFound/LostItemForm';
import { Modal } from '../components/common/Modal';
import type { LostItem } from '../types';

export const LostAndFound = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lostItems, setLostItems] = useState<LostItem[]>([]);

  const handleAddItem = (newItem: Omit<LostItem, 'id'>) => {
    const itemWithId = { ...newItem, id: Date.now().toString() };
    setLostItems(prevItems => [itemWithId, ...prevItems]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Lost and Found"
        description="Report and find lost items on campus"
        action={
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Report Lost Item
          </Button>
        }
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LostItemForm onSubmit={handleAddItem} />
      </Modal>

      <div>
        {/* Placeholder for displaying lost items */}
        {lostItems.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No lost items reported yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                {/* Add more details here */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
