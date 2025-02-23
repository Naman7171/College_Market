import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { PageContainer } from '../components/layout/PageContainer';
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
    <PageContainer>
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

      <div className="mt-6">
        {lostItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">No lost items reported yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.itemName}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium mr-2">Location:</span>
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium mr-2">Date Lost:</span>
                    {new Date(item.dateLost).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium mr-2">Contact:</span>
                    {item.contactInfo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};
