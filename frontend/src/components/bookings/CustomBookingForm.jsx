import React from 'react';
import EnhancedBookingForm from './EnhancedBookingForm';

const CustomBookingForm = ({ destination, onSuccess, onBack }) => {



  return (
    <EnhancedBookingForm
      destinationData={destination}
      bookingType="custom"
      onSuccess={onSuccess}
      onCancel={onBack}
    />
  );
};

export default CustomBookingForm;
