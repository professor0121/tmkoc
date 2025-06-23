import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useBookingNavigation } from './BookingFlowRouter';
import BookingSelectionModal from './BookingSelectionModal';
import { formatCurrency } from '../../utils/bookingUtils';

const SmartBookingButton = ({
  destination = null,
  package: packageData = null,
  className = '',
  variant = 'primary',
  size = 'md',
  children = 'Book Now',
  showModal = true,
  directBooking = false
}) => {
  const { user } = useSelector(state => state.auth);
  const { navigateToBooking } = useBookingNavigation();
  const [showSelectionModal, setShowSelectionModal] = useState(false);

  // Determine button styling based on variant and size
  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg'
    };
    
    // Variant classes
    const variantClasses = {
      primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500',
      success: 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500',
      outline: 'text-blue-700 bg-white border border-blue-300 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
    };
    
    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  const handleClick = () => {
    // If user is not logged in, redirect to auth first
    if (!user) {
      const bookingUrl = generateBookingUrl();
      window.location.href = `/auth?redirect=${encodeURIComponent(bookingUrl)}`;
      return;
    }

    // Direct booking without modal
    if (directBooking) {
      handleDirectBooking();
      return;
    }

    // Show selection modal for destinations or when multiple options exist
    if (showModal && (destination || (!packageData && !destination))) {
      setShowSelectionModal(true);
      return;
    }

    // Direct package booking
    if (packageData) {
      navigateToBooking('package', packageData._id, destination?._id);
      return;
    }

    // Default to destination booking
    if (destination) {
      navigateToBooking('destination', destination._id);
    }
  };

  const handleDirectBooking = () => {
    if (packageData) {
      navigateToBooking('package', packageData._id, destination?._id);
    } else if (destination) {
      navigateToBooking('destination', destination._id);
    }
  };

  const generateBookingUrl = () => {
    if (packageData) {
      return destination 
        ? `/book/package/${packageData._id}/${destination._id}`
        : `/book/package/${packageData._id}`;
    } else if (destination) {
      return `/book/destination/${destination._id}`;
    }
    return '/';
  };

  const getModalTitle = () => {
    if (destination) {
      return `Book Your Trip to ${destination.name}`;
    } else if (packageData) {
      return `Book ${packageData.name}`;
    }
    return 'Choose Your Booking Option';
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={getButtonClasses()}
        disabled={!destination && !packageData}
      >
        {/* Loading state could be added here */}
        {children}
        
        {/* Icon based on booking type */}
        {variant !== 'ghost' && (
          <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </button>

      {/* Booking Selection Modal */}
      {showSelectionModal && (
        <BookingSelectionModal
          isOpen={showSelectionModal}
          onClose={() => setShowSelectionModal(false)}
          destination={destination}
          package={packageData}
          title={getModalTitle()}
        />
      )}
    </>
  );
};

// Specialized booking buttons for different contexts
export const DestinationBookingButton = ({ destination, ...props }) => (
  <SmartBookingButton
    destination={destination}
    {...props}
  />
);

export const PackageBookingButton = ({ package: packageData, destination = null, ...props }) => (
  <SmartBookingButton
    destination={destination}
    package={packageData}
    directBooking={true}
    showModal={false}
    {...props}
  />
);

export const QuickBookButton = ({ destination, package: packageData, ...props }) => (
  <SmartBookingButton
    destination={destination}
    package={packageData}
    variant="success"
    size="lg"
    directBooking={true}
    showModal={false}
    {...props}
  >
    Quick Book
  </SmartBookingButton>
);

export const ExploreBookingButton = ({ destination, ...props }) => (
  <SmartBookingButton
    destination={destination}
    variant="outline"
    showModal={true}
    {...props}
  >
    Explore Booking Options
  </SmartBookingButton>
);

// Booking CTA component for cards and listings
export const BookingCTA = ({
  destination = null,
  package: packageData = null,
  showPrice = true,
  layout = 'horizontal' // 'horizontal' | 'vertical'
}) => {
  // Safe price extraction
  const getPrice = () => {
    if (packageData?.pricing?.basePrice) {
      return packageData.pricing.basePrice;
    }

    if (packageData?.price) {
      // If price is an object with adult property
      if (typeof packageData.price === 'object' && packageData.price.adult) {
        return packageData.price.adult;
      }

      // If price is an object with min/max properties, use min
      if (typeof packageData.price === 'object' && packageData.price.min !== undefined) {
        return packageData.price.min;
      }

      // If price is a simple number
      if (typeof packageData.price === 'number') {
        return packageData.price;
      }
    }

    return null;
  };

  const price = getPrice();
  
  if (layout === 'vertical') {
    return (
      <div className="text-center space-y-3">
        {showPrice && price && (
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(price)}
              <span className="text-sm font-normal text-gray-600"> / person</span>
            </div>
            {packageData?.pricing?.originalPrice && packageData.pricing.originalPrice > price && (
              <div className="text-sm text-green-600 font-medium">
                Save {formatCurrency(packageData.pricing.originalPrice - price)}
              </div>
            )}
          </div>
        )}
        <SmartBookingButton
          destination={destination}
          package={packageData}
          size="lg"
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      {showPrice && price && (
        <div>
          <div className="text-xl font-bold text-gray-900">
            {formatCurrency(price)}
            <span className="text-sm font-normal text-gray-600"> / person</span>
          </div>
          {packageData?.pricing?.originalPrice && packageData.pricing.originalPrice > price && (
            <div className="text-sm text-green-600 font-medium">
              Save {formatCurrency(packageData.pricing.originalPrice - price)}
            </div>
          )}
        </div>
      )}
      <SmartBookingButton
        destination={destination}
        package={packageData}
        size="lg"
      />
    </div>
  );
};

// Floating booking button for mobile
export const FloatingBookingButton = ({ destination, package: packageData, ...props }) => {
  return (
    <div className="fixed bottom-4 right-4 z-40 md:hidden">
      <SmartBookingButton
        destination={destination}
        package={packageData}
        size="lg"
        className="shadow-lg"
        {...props}
      >
        Book Now
      </SmartBookingButton>
    </div>
  );
};

export default SmartBookingButton;
