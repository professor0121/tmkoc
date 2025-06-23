import React from 'react';

const AccommodationForm = ({ formData, onInputChange, validationErrors }) => {
  const accommodationTypes = [
    {
      value: 'budget',
      label: 'Budget',
      description: 'Basic accommodations with essential amenities',
      features: ['Clean rooms', 'Basic amenities', 'Shared facilities']
    },
    {
      value: 'midRange',
      label: 'Mid-Range',
      description: 'Comfortable accommodations with good amenities',
      features: ['Private bathroom', 'Air conditioning', 'Room service', 'WiFi']
    },
    {
      value: 'luxury',
      label: 'Luxury',
      description: 'Premium accommodations with luxury amenities',
      features: ['Spacious rooms', 'Premium amenities', 'Concierge service', 'Spa access']
    }
  ];

  const roomTypes = [
    { value: 'standard', label: 'Standard Room' },
    { value: 'deluxe', label: 'Deluxe Room' },
    { value: 'suite', label: 'Suite' },
    { value: 'family', label: 'Family Room' },
    { value: 'connecting', label: 'Connecting Rooms' }
  ];

  const calculateMinRooms = () => {
    const adults = parseInt(formData.adults) || 1;
    return Math.ceil(adults / 2);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Accommodation Preferences</h3>
      
      {/* Accommodation Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Accommodation Type *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accommodationTypes.map((type) => (
            <div
              key={type.value}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                formData.accommodationType === type.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onInputChange('accommodationType', type.value)}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="accommodationType"
                  value={type.value}
                  checked={formData.accommodationType === type.value}
                  onChange={(e) => onInputChange('accommodationType', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 font-medium text-gray-900">
                  {type.label}
                </label>
              </div>
              <p className="text-sm text-gray-600 mb-2">{type.description}</p>
              <ul className="text-xs text-gray-500 space-y-1">
                {type.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {validationErrors.accommodationType && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.accommodationType}</p>
        )}
      </div>

      {/* Room Type and Number of Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
            Room Type *
          </label>
          <select
            id="roomType"
            value={formData.roomType}
            onChange={(e) => onInputChange('roomType', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.roomType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {roomTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {validationErrors.roomType && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.roomType}</p>
          )}
        </div>

        <div>
          <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Rooms *
          </label>
          <input
            type="number"
            id="rooms"
            min={calculateMinRooms()}
            max="10"
            value={formData.rooms}
            onChange={(e) => onInputChange('rooms', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.rooms ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.rooms && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.rooms}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Minimum {calculateMinRooms()} room(s) required for {formData.adults} adult(s)
          </p>
        </div>
      </div>

      {/* Room Configuration Guide */}
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-medium text-blue-900 mb-2">Room Configuration Guide</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• Standard/Deluxe rooms typically accommodate 2 adults</p>
          <p>• Family rooms can accommodate 2 adults + 2 children</p>
          <p>• Suites offer more space and can accommodate larger groups</p>
          <p>• Connecting rooms are ideal for families with children</p>
        </div>
      </div>

      {/* Accommodation Summary */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="font-medium text-gray-900 mb-2">Accommodation Summary</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium">Type:</span> {
              accommodationTypes.find(t => t.value === formData.accommodationType)?.label
            }
          </p>
          <p>
            <span className="font-medium">Room Type:</span> {
              roomTypes.find(t => t.value === formData.roomType)?.label
            }
          </p>
          <p>
            <span className="font-medium">Number of Rooms:</span> {formData.rooms}
          </p>
          <p>
            <span className="font-medium">Total Capacity:</span> {
              formData.roomType === 'family' 
                ? `${formData.rooms * 4} people (${formData.rooms * 2} adults + ${formData.rooms * 2} children)`
                : `${formData.rooms * 2} adults`
            }
          </p>
        </div>
      </div>

      {/* Additional Preferences */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Additional Preferences</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="smokingRoom"
              checked={formData.smokingRoom || false}
              onChange={(e) => onInputChange('smokingRoom', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="smokingRoom" className="ml-2 block text-sm text-gray-700">
              Smoking room preferred
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="accessibleRoom"
              checked={formData.accessibleRoom || false}
              onChange={(e) => onInputChange('accessibleRoom', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="accessibleRoom" className="ml-2 block text-sm text-gray-700">
              Accessible room required
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="highFloor"
              checked={formData.highFloor || false}
              onChange={(e) => onInputChange('highFloor', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="highFloor" className="ml-2 block text-sm text-gray-700">
              High floor preferred
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="quietRoom"
              checked={formData.quietRoom || false}
              onChange={(e) => onInputChange('quietRoom', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="quietRoom" className="ml-2 block text-sm text-gray-700">
              Quiet room preferred
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationForm;
