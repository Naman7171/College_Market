import React, { useState } from 'react';
import { X, Upload, ChevronRight, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface ListingWizardProps {
  onClose: () => void;
  onSubmit: (listing: any) => void;
}

const categories = {
  'Electronics': {
    'Phones & Tablets': ['Smartphones', 'Tablets', 'Accessories'],
    'Computers': ['Laptops', 'Desktops', 'Components', 'Accessories'],
    'Audio': ['Headphones', 'Speakers', 'Microphones'],
  },
  'Books': {
    'Textbooks': ['Science', 'Engineering', 'Business', 'Arts'],
    'Academic': ['Research Papers', 'Study Guides'],
    'Other': ['Fiction', 'Non-Fiction'],
  },
  'Fashion': {
    'Clothing': ['Tops', 'Bottoms', 'Outerwear', 'Dresses'],
    'Shoes': ['Sneakers', 'Formal', 'Athletic'],
    'Accessories': ['Bags', 'Jewelry', 'Watches'],
  },
  'Home': {
    'Furniture': ['Chairs', 'Desks', 'Beds', 'Storage'],
    'Decor': ['Wall Art', 'Lighting', 'Rugs'],
    'Appliances': ['Small Appliances', 'Kitchen', 'Cleaning'],
  },
};

const conditions = [
  { value: 'new', label: 'New', description: 'Never used, original packaging' },
  { value: 'like-new', label: 'Like New', description: 'Used once or twice, perfect condition' },
  { value: 'good', label: 'Good', description: 'Minor wear, fully functional' },
  { value: 'fair', label: 'Fair', description: 'Visible wear, works well' },
];

export const ListingWizard = ({ onClose, onSubmit }: ListingWizardProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    mainCategory: '',
    subCategory: '',
    specificType: '',
    title: '',
    description: '',
    price: '',
    condition: '',
    location: '',
    images: [] as File[],
    imageUrls: [] as string[],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const newImageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files],
      imageUrls: [...prev.imageUrls, ...newImageUrls],
    }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(formData.imageUrls[index]);
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.mainCategory && formData.subCategory && formData.specificType;
      case 2:
        return formData.title && formData.description && formData.price;
      case 3:
        return formData.condition && formData.location && formData.images.length > 0;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {step === 1 ? 'Select Category' : 
               step === 2 ? 'Item Details' : 
               'Additional Information'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3].map((num) => (
                  <React.Fragment key={num}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= num ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {num}
                    </div>
                    {num < 3 && (
                      <div className={`w-16 h-1 ${
                        step > num ? 'bg-primary-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Main Category</label>
                  <select
                    value={formData.mainCategory}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      mainCategory: e.target.value,
                      subCategory: '',
                      specificType: ''
                    }))}
                    className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {Object.keys(categories).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {formData.mainCategory && (
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Sub Category</label>
                    <select
                      value={formData.subCategory}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        subCategory: e.target.value,
                        specificType: ''
                      }))}
                      className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Sub Category</option>
                      {Object.keys(categories[formData.mainCategory as keyof typeof categories]).map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}

                {formData.subCategory && (
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Specific Type</label>
                    <select
                      value={formData.specificType}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        specificType: e.target.value
                      }))}
                      className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Type</option>
                      {categories[formData.mainCategory as keyof typeof categories][formData.subCategory].map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Input
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a descriptive title"
                  required
                />

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white min-h-[120px] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe your item in detail"
                    required
                  />
                </div>

                <Input
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Enter price"
                  required
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Condition</label>
                  <div className="space-y-2">
                    {conditions.map(({ value, label, description }) => (
                      <label key={value} className="flex items-start p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                          type="radio"
                          name="condition"
                          value={value}
                          checked={formData.condition === value}
                          onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                          className="mt-1"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">{label}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter your location"
                  required
                />

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Photos ({formData.images.length}/5)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {formData.imageUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {formData.images.length < 5 && (
                      <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 aspect-square">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          multiple
                        />
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">Add Photo</span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            {step > 1 ? (
              <Button
                variant="secondary"
                onClick={() => setStep(step - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            <Button
              variant="primary"
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  handleSubmit();
                }
              }}
              disabled={!validateStep()}
            >
              {step < 3 ? (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                'List Item'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
