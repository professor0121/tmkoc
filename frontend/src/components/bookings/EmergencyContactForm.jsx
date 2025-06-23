import React from 'react';

const EmergencyContactForm = ({ formData, onInputChange, validationErrors }) => {
  const relationships = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'friend', label: 'Friend' },
    { value: 'colleague', label: 'Colleague' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact Information</h3>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Important Information
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Please provide emergency contact details for someone who is NOT traveling with you. 
                This person should be easily reachable in case of an emergency during your trip.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={(e) => onInputChange('emergencyContactName', e.target.value)}
            placeholder="Enter full name"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.emergencyContactName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.emergencyContactName && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.emergencyContactName}</p>
          )}
        </div>

        <div>
          <label htmlFor="emergencyContactRelationship" className="block text-sm font-medium text-gray-700 mb-1">
            Relationship *
          </label>
          <select
            id="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={(e) => onInputChange('emergencyContactRelationship', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.emergencyContactRelationship ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select relationship</option>
            {relationships.map((rel) => (
              <option key={rel.value} value={rel.value}>
                {rel.label}
              </option>
            ))}
          </select>
          {validationErrors.emergencyContactRelationship && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.emergencyContactRelationship}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={(e) => onInputChange('emergencyContactPhone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.emergencyContactPhone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.emergencyContactPhone && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.emergencyContactPhone}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Include country code for international numbers
          </p>
        </div>

        <div>
          <label htmlFor="emergencyContactEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="emergencyContactEmail"
            value={formData.emergencyContactEmail}
            onChange={(e) => onInputChange('emergencyContactEmail', e.target.value)}
            placeholder="emergency@example.com"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.emergencyContactEmail ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.emergencyContactEmail && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.emergencyContactEmail}</p>
          )}
        </div>
      </div>

      {/* Alternative Contact (Optional) */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Alternative Contact (Optional)</h4>
        <p className="text-sm text-gray-600 mb-4">
          Provide a second emergency contact for additional security.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="altEmergencyContactName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="altEmergencyContactName"
              value={formData.altEmergencyContactName || ''}
              onChange={(e) => onInputChange('altEmergencyContactName', e.target.value)}
              placeholder="Enter full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="altEmergencyContactRelationship" className="block text-sm font-medium text-gray-700 mb-1">
              Relationship
            </label>
            <select
              id="altEmergencyContactRelationship"
              value={formData.altEmergencyContactRelationship || ''}
              onChange={(e) => onInputChange('altEmergencyContactRelationship', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select relationship</option>
              {relationships.map((rel) => (
                <option key={rel.value} value={rel.value}>
                  {rel.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="altEmergencyContactPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="altEmergencyContactPhone"
              value={formData.altEmergencyContactPhone || ''}
              onChange={(e) => onInputChange('altEmergencyContactPhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="altEmergencyContactEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="altEmergencyContactEmail"
              value={formData.altEmergencyContactEmail || ''}
              onChange={(e) => onInputChange('altEmergencyContactEmail', e.target.value)}
              placeholder="alternative@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Summary */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="font-medium text-gray-900 mb-2">Emergency Contact Summary</h4>
        <div className="text-sm text-gray-600 space-y-1">
          {formData.emergencyContactName && (
            <p>
              <span className="font-medium">Primary Contact:</span> {formData.emergencyContactName}
              {formData.emergencyContactRelationship && ` (${relationships.find(r => r.value === formData.emergencyContactRelationship)?.label})`}
            </p>
          )}
          {formData.emergencyContactPhone && (
            <p>
              <span className="font-medium">Phone:</span> {formData.emergencyContactPhone}
            </p>
          )}
          {formData.emergencyContactEmail && (
            <p>
              <span className="font-medium">Email:</span> {formData.emergencyContactEmail}
            </p>
          )}
          {formData.altEmergencyContactName && (
            <p>
              <span className="font-medium">Alternative Contact:</span> {formData.altEmergencyContactName}
              {formData.altEmergencyContactRelationship && ` (${relationships.find(r => r.value === formData.altEmergencyContactRelationship)?.label})`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactForm;
