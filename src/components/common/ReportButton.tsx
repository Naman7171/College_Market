import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ReportButtonProps {
  itemId: string;
  itemType: 'listing' | 'post' | 'housing';
  onReport: (reason: string) => void;
}

const reportReasons = [
  'Spam or misleading',
  'Inappropriate content',
  'Suspicious pricing',
  'Scam or fraud',
  'Harassment',
  'Other'
];

export const ReportButton = ({ itemId, itemType, onReport }: ReportButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!selectedReason) return;
    onReport(selectedReason);
    setIsModalOpen(false);
    setSelectedReason('');
    setDescription('');
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
      >
        <AlertTriangle className="w-4 h-4" />
        Report
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-full max-w-md p-6">
          <h2 className="text-xl font-semibold mb-4">Report {itemType}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Help us maintain a safe marketplace by reporting suspicious or inappropriate content.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Reason for reporting
              </label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  border border-gray-200 dark:border-gray-700 
                  rounded-lg 
                  text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition-all duration-200"
              >
                <option value="">Select a reason</option>
                {reportReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Additional details (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  border border-gray-200 dark:border-gray-700 
                  rounded-lg 
                  text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition-all duration-200
                  min-h-[100px]"
                placeholder="Provide any additional information that might help us investigate"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedReason}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};