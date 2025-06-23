import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../redux/bookings/bookingSlice';
import { validateBookingData, calculateBookingPricing, formatBookingDataForAPI } from '../../redux/bookings/bookingAPI';
import TravelerDetailsForm from './TravelerDetailsForm';
import AccommodationForm from './AccommodationForm';
import PaymentForm from './PaymentForm';
import EmergencyContactForm from './EmergencyContactForm';
import BookingSummary from './BookingSummary';

const BookingForm = ({ packageData, destinationData, onSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.bookings);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Traveler details
    adults: 1,
    children: 0,
    infants: 0,
    
    // Travel dates
    startDate: '',
    endDate: '',
    
    // Accommodation
    accommodationType: 'midRange',
    roomType: 'standard',
    rooms: 1,
    
    // Transportation
    flightRequired: false,
    flightClass: 'economy',
    
    // Payment
    paymentMethod: 'credit_card',
    
    // Emergency contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactEmail: '',
    emergencyContactRelationship: '',
    
    // Special requests
    specialRequests: '',
    
    // Pricing (calculated)
    pricing: null
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  // Calculate pricing when relevant fields change
  useEffect(() => {
    if (packageData && formData.startDate && formData.endDate && formData.adults) {
      const pricing = calculateBookingPricing(packageData, {
        travelers: {
          adults: parseInt(formData.adults),
          children: parseInt(formData.children),
          infants: parseInt(formData.infants)
        },
        travelDates: {
          startDate: formData.startDate,
          endDate: formData.endDate
        },
        accommodation: {
          type: formData.accommodationType,
          rooms: parseInt(formData.rooms)
        }
      });
      
      setFormData(prev => ({ ...prev, pricing }));
    }
  }, [
    packageData,
    formData.adults,
    formData.children,
    formData.infants,
    formData.startDate,
    formData.endDate,
    formData.accommodationType,
    formData.rooms
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateCurrentStep = () => {
    const bookingData = formatBookingDataForAPI(formData, packageData, destinationData);
    const validation = validateBookingData(bookingData);
    
    let stepErrors = {};
    
    switch (currentStep) {
      case 1: // Traveler details
        ['adults', 'startDate', 'endDate'].forEach(field => {
          if (validation.errors[field]) {
            stepErrors[field] = validation.errors[field];
          }
        });
        break;
        
      case 2: // Accommodation
        ['accommodationType', 'roomType', 'rooms'].forEach(field => {
          if (validation.errors[field]) {
            stepErrors[field] = validation.errors[field];
          }
        });
        break;
        
      case 3: // Emergency contact
        ['emergencyContactName', 'emergencyContactPhone', 'emergencyContactEmail', 'emergencyContactRelationship'].forEach(field => {
          if (validation.errors[field]) {
            stepErrors[field] = validation.errors[field];
          }
        });
        break;
        
      case 4: // Payment
        ['paymentMethod'].forEach(field => {
          if (validation.errors[field]) {
            stepErrors[field] = validation.errors[field];
          }
        });
        break;
    }
    
    setValidationErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    const bookingData = formatBookingDataForAPI(formData, packageData, destinationData);
    const validation = validateBookingData(bookingData);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    try {
      const result = await dispatch(createBooking(bookingData)).unwrap();
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      console.error('Booking creation failed:', err);
    }
  };

  const steps = [
    { number: 1, title: 'Traveler Details', component: TravelerDetailsForm },
    { number: 2, title: 'Accommodation', component: AccommodationForm },
    { number: 3, title: 'Emergency Contact', component: EmergencyContactForm },
    { number: 4, title: 'Payment', component: PaymentForm },
    { number: 5, title: 'Review & Confirm', component: BookingSummary }
  ];

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step.number 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {step.number}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-4 ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Current step content */}
      <div className="mb-8">
        {CurrentStepComponent && (
          <CurrentStepComponent
            formData={formData}
            onInputChange={handleInputChange}
            validationErrors={validationErrors}
            packageData={packageData}
            destinationData={destinationData}
          />
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Creating Booking...' : 'Confirm Booking'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
