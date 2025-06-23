import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../redux/bookings/bookingSlice';
import { validatePackageBooking, validateCustomBooking } from '../../utils/bookingValidation';
import { formatCurrency } from '../../utils/bookingUtils';
import TravelerDetailsForm from './TravelerDetailsForm';
import AccommodationForm from './AccommodationForm';
import PaymentForm from './PaymentForm';
import EmergencyContactForm from './EmergencyContactForm';
import BookingSummary from './BookingSummary';

const EnhancedBookingForm = ({ 
  packageData = null, 
  destinationData = null, 
  bookingType = 'package', // 'package' | 'custom' | 'destination'
  onSuccess, 
  onCancel 
}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.bookings);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Booking type and references
    type: bookingType,
    packageId: packageData?._id || null,
    destinationId: destinationData?._id || null,
    
    // Traveler details
    travelers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    
    // Travel dates
    travelDates: {
      startDate: '',
      endDate: ''
    },
    
    // Accommodation
    accommodation: {
      type: 'midRange',
      roomType: 'standard',
      rooms: 1
    },
    
    // Transportation (for custom bookings)
    transportation: {
      flightRequired: false,
      flightClass: 'economy',
      localTransport: true
    },
    
    // Preferences (for custom bookings)
    preferences: {
      activities: [],
      budget: '',
      dietaryRequirements: '',
      accessibility: ''
    },
    
    // Emergency contact
    emergencyContact: {
      name: '',
      phone: '',
      email: '',
      relationship: ''
    },
    
    // Payment
    payment: {
      method: 'credit_card',
      amount: 0
    },
    
    // Special requests
    specialRequests: '',
    
    // Calculated pricing
    pricing: null
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  // Calculate pricing when relevant fields change
  useEffect(() => {
    calculatePricing();
  }, [
    formData.travelers,
    formData.travelDates,
    formData.accommodation,
    packageData
  ]);

  const calculatePricing = () => {
    if (!formData.travelDates.startDate || !formData.travelDates.endDate || !formData.travelers.adults) {
      return;
    }

    let basePrice = 0;
    let totalPrice = 0;
    
    if (packageData && bookingType === 'package') {
      // Package pricing calculation
      basePrice = packageData.pricing?.basePrice || packageData.price || 0;
      const adultPrice = basePrice * formData.travelers.adults;
      const childPrice = basePrice * 0.7 * formData.travelers.children; // 30% discount for children
      const infantPrice = 0; // Infants usually free
      
      totalPrice = adultPrice + childPrice + infantPrice;
      
      // Add accommodation supplements
      const accommodationSupplement = calculateAccommodationSupplement();
      totalPrice += accommodationSupplement;
      
      // Apply group discounts if available
      if (packageData.pricing?.groupDiscounts) {
        const totalTravelers = formData.travelers.adults + formData.travelers.children;
        const applicableDiscount = packageData.pricing.groupDiscounts.find(
          discount => totalTravelers >= discount.minPeople
        );
        if (applicableDiscount) {
          totalPrice *= (1 - applicableDiscount.discount / 100);
        }
      }
    } else {
      // Custom booking estimation
      const days = Math.ceil(
        (new Date(formData.travelDates.endDate) - new Date(formData.travelDates.startDate)) / (1000 * 60 * 60 * 24)
      );
      
      // Base estimation based on budget range
      const budgetRanges = {
        budget: { min: 50, max: 100 },
        moderate: { min: 100, max: 200 },
        luxury: { min: 200, max: 400 },
        premium: { min: 400, max: 800 }
      };
      
      const range = budgetRanges[formData.preferences.budget] || budgetRanges.moderate;
      basePrice = (range.min + range.max) / 2;
      totalPrice = basePrice * days * formData.travelers.adults;
    }

    const pricing = {
      basePrice,
      totalPrice,
      breakdown: {
        adults: basePrice * formData.travelers.adults,
        children: basePrice * 0.7 * formData.travelers.children,
        infants: 0,
        accommodation: calculateAccommodationSupplement(),
        taxes: totalPrice * 0.1, // 10% taxes
        fees: 25 // Service fee
      }
    };

    pricing.finalTotal = pricing.totalPrice + pricing.breakdown.taxes + pricing.breakdown.fees;

    setFormData(prev => ({ 
      ...prev, 
      pricing,
      payment: { ...prev.payment, amount: pricing.finalTotal }
    }));
  };

  const calculateAccommodationSupplement = () => {
    const supplements = {
      budget: 0,
      midRange: 50,
      luxury: 150,
      premium: 300
    };
    
    const baseSupplement = supplements[formData.accommodation.type] || 0;
    return baseSupplement * formData.accommodation.rooms;
  };

  const handleInputChange = (field, value) => {
    // Handle nested object updates
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateCurrentStep = () => {
    let validation;
    
    if (bookingType === 'package') {
      validation = validatePackageBooking(formData, packageData);
    } else {
      validation = validateCustomBooking(formData, destinationData);
    }
    
    let stepErrors = {};
    
    switch (currentStep) {
      case 1: // Traveler details and dates
        ['travelDates.startDate', 'travelDates.endDate', 'travelers.adults'].forEach(field => {
          if (validation.errors[field]) {
            stepErrors[field] = validation.errors[field];
          }
        });
        break;
        
      case 2: // Accommodation
        ['accommodation.type', 'accommodation.roomType', 'accommodation.rooms'].forEach(field => {
          if (validation.errors[field]) {
            stepErrors[field] = validation.errors[field];
          }
        });
        break;
        
      case 3: // Preferences (for custom bookings)
        if (bookingType === 'custom') {
          ['preferences.budget'].forEach(field => {
            if (validation.errors[field]) {
              stepErrors[field] = validation.errors[field];
            }
          });
        }
        break;
        
      case 4: // Emergency contact
        Object.keys(validation.errors).filter(key => key.startsWith('emergencyContact')).forEach(field => {
          stepErrors[field] = validation.errors[field];
        });
        break;
        
      case 5: // Payment
        ['payment.method'].forEach(field => {
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
      setCurrentStep(prev => Math.min(prev + 1, getMaxSteps()));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getMaxSteps = () => {
    return bookingType === 'custom' ? 6 : 5; // Custom bookings have an extra preferences step
  };

  const handleSubmit = async () => {
    let validation;
    
    if (bookingType === 'package') {
      validation = validatePackageBooking(formData, packageData);
    } else {
      validation = validateCustomBooking(formData, destinationData);
    }
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    try {
      const bookingData = {
        ...formData,
        package: packageData?._id,
        destination: destinationData?._id,
        bookingDetails: {
          ...formData,
          totalAmount: formData.pricing?.finalTotal || 0
        }
      };

      const result = await dispatch(createBooking(bookingData)).unwrap();
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      console.error('Booking creation failed:', err);
    }
  };

  const getSteps = () => {
    const baseSteps = [
      { number: 1, title: 'Travel Details', component: TravelerDetailsForm },
      { number: 2, title: 'Accommodation', component: AccommodationForm }
    ];

    if (bookingType === 'custom') {
      baseSteps.push({ number: 3, title: 'Preferences', component: CustomPreferencesForm });
    }

    baseSteps.push(
      { number: bookingType === 'custom' ? 4 : 3, title: 'Emergency Contact', component: EmergencyContactForm },
      { number: bookingType === 'custom' ? 5 : 4, title: 'Payment', component: PaymentForm },
      { number: bookingType === 'custom' ? 6 : 5, title: 'Review & Confirm', component: BookingSummary }
    );

    return baseSteps;
  };

  const steps = getSteps();
  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Booking Header */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">
          {bookingType === 'package' && packageData ? `Book ${packageData.name}` :
           bookingType === 'custom' && destinationData ? `Custom Trip to ${destinationData.name}` :
           'Complete Your Booking'}
        </h2>
        {destinationData && (
          <p className="text-gray-600 mt-1">{destinationData.name}, {destinationData.country}</p>
        )}
        {formData.pricing && (
          <div className="mt-3 text-right">
            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(formData.pricing.finalTotal)}
            </span>
            <span className="text-gray-600 ml-1">total</span>
          </div>
        )}
      </div>

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
            bookingType={bookingType}
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
          
          {currentStep < getMaxSteps() ? (
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

// Custom preferences form component for custom bookings
const CustomPreferencesForm = ({ formData, onInputChange, validationErrors }) => {
  const budgetRanges = [
    { value: 'budget', label: 'Budget ($50-100/day)', description: 'Basic accommodations and activities' },
    { value: 'moderate', label: 'Moderate ($100-200/day)', description: 'Comfortable mid-range options' },
    { value: 'luxury', label: 'Luxury ($200-400/day)', description: 'High-end accommodations and experiences' },
    { value: 'premium', label: 'Premium ($400+/day)', description: 'Ultra-luxury and exclusive experiences' }
  ];

  const activityOptions = [
    'Sightseeing Tours', 'Adventure Sports', 'Cultural Experiences', 'Food & Dining',
    'Shopping', 'Photography', 'Wildlife Safari', 'Beach Activities', 'Mountain Trekking',
    'Historical Sites', 'Local Markets', 'Spa & Wellness'
  ];

  const handleActivityToggle = (activity) => {
    const currentActivities = formData.preferences?.activities || [];
    const newActivities = currentActivities.includes(activity)
      ? currentActivities.filter(a => a !== activity)
      : [...currentActivities, activity];
    
    onInputChange('preferences.activities', newActivities);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Your Preferences</h3>
      
      {/* Budget Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Budget Range *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgetRanges.map((range) => (
            <div
              key={range.value}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                formData.preferences?.budget === range.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onInputChange('preferences.budget', range.value)}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="budget"
                  value={range.value}
                  checked={formData.preferences?.budget === range.value}
                  onChange={(e) => onInputChange('preferences.budget', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 font-medium text-gray-900">
                  {range.label}
                </label>
              </div>
              <p className="text-sm text-gray-600">{range.description}</p>
            </div>
          ))}
        </div>
        {validationErrors['preferences.budget'] && (
          <p className="mt-1 text-sm text-red-600">{validationErrors['preferences.budget']}</p>
        )}
      </div>

      {/* Preferred Activities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preferred Activities (Optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {activityOptions.map((activity) => (
            <label key={activity} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.preferences?.activities?.includes(activity) || false}
                onChange={() => handleActivityToggle(activity)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{activity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Special Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="dietaryRequirements" className="block text-sm font-medium text-gray-700 mb-1">
            Dietary Requirements
          </label>
          <textarea
            id="dietaryRequirements"
            value={formData.preferences?.dietaryRequirements || ''}
            onChange={(e) => onInputChange('preferences.dietaryRequirements', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any dietary restrictions or preferences..."
          />
        </div>
        
        <div>
          <label htmlFor="accessibility" className="block text-sm font-medium text-gray-700 mb-1">
            Accessibility Needs
          </label>
          <textarea
            id="accessibility"
            value={formData.preferences?.accessibility || ''}
            onChange={(e) => onInputChange('preferences.accessibility', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any accessibility requirements..."
          />
        </div>
      </div>
    </div>
  );
};

export default EnhancedBookingForm;
