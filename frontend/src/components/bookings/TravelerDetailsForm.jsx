import React from 'react';

const TravelerDetailsForm = ({ formData, onInputChange, validationErrors }) => {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Traveler Details</h3>
      
      {/* Number of Travelers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
            Adults (18+) *
          </label>
          <input
            type="number"
            id="adults"
            min="1"
            max="10"
            value={formData.adults}
            onChange={(e) => onInputChange('adults', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.adults ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.adults && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.adults}</p>
          )}
        </div>

        <div>
          <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
            Children (2-17)
          </label>
          <input
            type="number"
            id="children"
            min="0"
            max="10"
            value={formData.children}
            onChange={(e) => onInputChange('children', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="infants" className="block text-sm font-medium text-gray-700 mb-1">
            Infants (0-2)
          </label>
          <input
            type="number"
            id="infants"
            min="0"
            max="5"
            value={formData.infants}
            onChange={(e) => onInputChange('infants', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Travel Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date *
          </label>
          <input
            type="date"
            id="startDate"
            min={today}
            max={maxDateStr}
            value={formData.startDate}
            onChange={(e) => onInputChange('startDate', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.startDate && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.startDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date *
          </label>
          <input
            type="date"
            id="endDate"
            min={formData.startDate || today}
            max={maxDateStr}
            value={formData.endDate}
            onChange={(e) => onInputChange('endDate', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.endDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.endDate && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.endDate}</p>
          )}
        </div>
      </div>

      {/* Flight Requirements */}
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="flightRequired"
            checked={formData.flightRequired}
            onChange={(e) => onInputChange('flightRequired', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="flightRequired" className="ml-2 block text-sm text-gray-700">
            I need flight arrangements
          </label>
        </div>

        {formData.flightRequired && (
          <div>
            <label htmlFor="flightClass" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Flight Class
            </label>
            <select
              id="flightClass"
              value={formData.flightClass}
              onChange={(e) => onInputChange('flightClass', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
        )}
      </div>

      {/* Special Requests */}
      <div>
        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
          Special Requests (Optional)
        </label>
        <textarea
          id="specialRequests"
          rows="3"
          value={formData.specialRequests}
          onChange={(e) => onInputChange('specialRequests', e.target.value)}
          placeholder="Any special dietary requirements, accessibility needs, or other requests..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Separate multiple requests with commas
        </p>
      </div>

      {/* Traveler Summary */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="font-medium text-gray-900 mb-2">Traveler Summary</h4>
        <div className="text-sm text-gray-600">
          <p>
            Total Travelers: {parseInt(formData.adults) + parseInt(formData.children) + parseInt(formData.infants)}
          </p>
          <p>
            Adults: {formData.adults}, Children: {formData.children}, Infants: {formData.infants}
          </p>
          {formData.startDate && formData.endDate && (
            <p>
              Duration: {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))} days
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelerDetailsForm;
