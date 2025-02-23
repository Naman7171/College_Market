import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Upload, X, Eye } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Checkbox } from '../common/Checkbox';
import { PriceRangeSlider } from '../common/PriceRangeSlider';
import type { HousingListing } from '../../types';

interface PropertyFormProps {
  onSubmit: (data: Omit<HousingListing, 'id' | 'createdAt' | 'expiresAt'>) => void;
  onPreview: (data: Partial<HousingListing>) => void;
  onCancel: () => void;
}

const propertyTypes = ['apartment', 'house', 'room', 'shared'];
const amenities = [
  'WiFi',
  'Air Conditioning',
  'Laundry',
  'Parking',
  'Gym',
  'Pool',
  'Furnished',
  'Utilities Included',
  'Security System',
  'Balcony/Patio',
  'Dishwasher',
  'Storage Space'
];

export const PropertyForm: React.FC<PropertyFormProps> = ({
  onSubmit,
  onPreview,
  onCancel
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<HousingListing>>({
    title: '',
    description: '',
    price: 0,
    type: 'apartment',
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    images: [],
    available: '',
    utilities: false,
    petsAllowed: false,
    furnished: false,
    landlord: {
      id: '1', // This would come from auth context in a real app
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length > 10) {
      setErrors(prev => ({
        ...prev,
        images: 'Maximum 10 images allowed'
      }));
      return;
    }

    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setSelectedFiles(prev => [...prev, ...files]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newPreviewUrls]
    }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title?.trim()) newErrors.title = 'Title is required';
        if (!formData.type) newErrors.type = 'Property type is required';
        if (!formData.bedrooms || formData.bedrooms < 0) {
          newErrors.bedrooms = 'Valid number of bedrooms is required';
        }
        if (!formData.bathrooms || formData.bathrooms < 0) {
          newErrors.bathrooms = 'Valid number of bathrooms is required';
        }
        break;
      case 2:
        if (!formData.location?.trim()) newErrors.location = 'Location is required';
        if (!formData.available) newErrors.available = 'Availability date is required';
        break;
      case 3:
        if (!formData.price || formData.price <= 0) {
          newErrors.price = 'Valid price is required';
        }
        if (!formData.description?.trim()) {
          newErrors.description = 'Description is required';
        }
        break;
      case 4:
        if (!formData.images?.length) {
          newErrors.images = 'At least one image is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep()) {
      onSubmit(formData as Omit<HousingListing, 'id' | 'createdAt' | 'expiresAt'>);
    }
  };

  const handlePreview = () => {
    onPreview(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4].map((num) => (
            <React.Fragment key={num}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= num
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {num}
              </div>
              {num < 4 && (
                <div
                  className={`w-16 h-1 ${
                    step > num ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Property Details</span>
          <span>Location</span>
          <span>Pricing</span>
          <span>Photos</span>
        </div>
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <>
            <Input
              label="Property Title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              error={errors.title}
              placeholder="e.g., Spacious 2BR Apartment Near Campus"
              required
            />

            <div>
              <label className="block text-sm font-medium mb-2">
                Property Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {propertyTypes.map((type) => (
                  <Checkbox
                    key={type}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                    checked={formData.type === type}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, type: type as HousingListing['type'] }))
                    }
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                label="Bedrooms"
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bedrooms: parseInt(e.target.value)
                  }))
                }
                error={errors.bedrooms}
                min="0"
                required
              />

              <Input
                type="number"
                label="Bathrooms"
                value={formData.bathrooms}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bathrooms: parseInt(e.target.value)
                  }))
                }
                error={errors.bathrooms}
                min="0"
                step="0.5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Amenities</label>
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity) => (
                  <Checkbox
                    key={amenity}
                    label={amenity}
                    checked={formData.amenities?.includes(amenity)}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        amenities: e.target.checked
                          ? [...(prev.amenities || []), amenity]
                          : prev.amenities?.filter((a) => a !== amenity)
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              error={errors.location}
              placeholder="Full address"
              required
            />

            <Input
              type="date"
              label="Available From"
              value={formData.available}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, available: e.target.value }))
              }
              error={errors.available}
              min={new Date().toISOString().split('T')[0]}
              required
            />

            <div className="space-y-4">
              <Checkbox
                label="Utilities Included"
                checked={formData.utilities}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    utilities: e.target.checked
                  }))
                }
              />

              <Checkbox
                label="Pets Allowed"
                checked={formData.petsAllowed}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    petsAllowed: e.target.checked
                  }))
                }
              />

              <Checkbox
                label="Furnished"
                checked={formData.furnished}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    furnished: e.target.checked
                  }))
                }
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Monthly Rent (₹)
              </label>
              <PriceRangeSlider
                min={0}
                max={50000}
                step={100}
                initialMin={formData.price || 0}
                initialMax={formData.price || 10000}
                onChange={(min) =>
                  setFormData((prev) => ({ ...prev, price: min }))
                }
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value
                  }))
                }
                className="w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg 
                  text-gray-900 dark:text-white
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  transition-all duration-200
                  min-h-[150px]"
                placeholder="Describe your property..."
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
          </>
        )}

        {step === 4 && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Property Photos
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {previewUrls.map((url, index) => (
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
              {previewUrls.length < 10 && (
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
              Upload up to 10 photos. First photo will be the cover image.
            </p>
          </div>
        )}

        <div className="flex justify-between pt-6">
          {step > 1 ? (
            <Button
              variant="secondary"
              onClick={() => setStep(step - 1)}
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            {step < 4 ? (
              <Button
                variant="primary"
                onClick={() => {
                  if (validateStep()) {
                    setStep(step + 1);
                  }
                }}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit}>
                List Property
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};