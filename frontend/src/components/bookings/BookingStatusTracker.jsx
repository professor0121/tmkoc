import React from 'react';
import { getBookingStatusColor } from '../../utils/bookingUtils';

const BookingStatusTracker = ({ booking, showTimeline = true }) => {
  const statusSteps = [
    {
      key: 'draft',
      label: 'Booking Created',
      description: 'Your booking request has been submitted',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      key: 'confirmed',
      label: 'Booking Confirmed',
      description: 'Your booking has been confirmed and payment processed',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      key: 'completed',
      label: 'Trip Completed',
      description: 'Your trip has been completed successfully',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const getCurrentStepIndex = () => {
    const statusOrder = ['draft', 'confirmed', 'completed'];
    return statusOrder.indexOf(booking.status);
  };

  const getStepStatus = (stepIndex) => {
    const currentIndex = getCurrentStepIndex();
    
    if (booking.status === 'cancelled') {
      return stepIndex === 0 ? 'completed' : 'cancelled';
    }
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600 text-white border-green-600';
      case 'current':
        return 'bg-blue-600 text-white border-blue-600';
      case 'cancelled':
        return 'bg-red-600 text-white border-red-600';
      default:
        return 'bg-gray-200 text-gray-600 border-gray-200';
    }
  };

  const getConnectorClasses = (status) => {
    return status === 'completed' ? 'bg-green-600' : 'bg-gray-200';
  };

  if (!showTimeline) {
    return (
      <div className="flex items-center space-x-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBookingStatusColor(booking.status)}`}>
          {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
        </span>
        {booking.status === 'cancelled' && booking.cancellationReason && (
          <span className="text-xs text-gray-500">
            ({booking.cancellationReason})
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Status</h3>
      
      {booking.status === 'cancelled' ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-red-900 mb-2">Booking Cancelled</h4>
          <p className="text-red-700 mb-4">
            Your booking has been cancelled
          </p>
          {booking.cancellationReason && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-800">
                <span className="font-medium">Reason:</span> {booking.cancellationReason}
              </p>
            </div>
          )}
          {booking.cancellationDate && (
            <p className="text-sm text-gray-500 mt-2">
              Cancelled on {new Date(booking.cancellationDate).toLocaleDateString()}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {statusSteps.map((step, index) => {
            const stepStatus = getStepStatus(index);
            const isLast = index === statusSteps.length - 1;
            
            return (
              <div key={step.key} className="relative">
                {/* Connector line */}
                {!isLast && (
                  <div className="absolute left-4 top-8 w-0.5 h-8 -ml-px">
                    <div className={`h-full w-full ${getConnectorClasses(stepStatus)}`} />
                  </div>
                )}
                
                {/* Step content */}
                <div className="flex items-start">
                  {/* Step icon */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStepClasses(stepStatus)}`}>
                    {stepStatus === 'completed' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : stepStatus === 'current' ? (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  
                  {/* Step details */}
                  <div className="ml-4 flex-1">
                    <h4 className={`text-sm font-medium ${
                      stepStatus === 'completed' || stepStatus === 'current' 
                        ? 'text-gray-900' 
                        : 'text-gray-500'
                    }`}>
                      {step.label}
                    </h4>
                    <p className={`text-sm ${
                      stepStatus === 'completed' || stepStatus === 'current'
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                    
                    {/* Timestamp */}
                    {stepStatus === 'completed' && (
                      <p className="text-xs text-gray-500 mt-1">
                        {step.key === 'draft' && booking.createdAt && 
                          `Created on ${new Date(booking.createdAt).toLocaleDateString()}`
                        }
                        {step.key === 'confirmed' && booking.confirmedAt && 
                          `Confirmed on ${new Date(booking.confirmedAt).toLocaleDateString()}`
                        }
                        {step.key === 'completed' && booking.completedAt && 
                          `Completed on ${new Date(booking.completedAt).toLocaleDateString()}`
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Additional status information */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Booking ID:</span>
            <span className="ml-2 font-medium text-gray-900">{booking.bookingId}</span>
          </div>
          <div>
            <span className="text-gray-500">Payment Status:</span>
            <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              booking.paymentStatus === 'completed' 
                ? 'bg-green-100 text-green-800'
                : booking.paymentStatus === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {booking.paymentStatus?.charAt(0).toUpperCase() + booking.paymentStatus?.slice(1)}
            </span>
          </div>
          {booking.lastUpdated && (
            <div className="md:col-span-2">
              <span className="text-gray-500">Last Updated:</span>
              <span className="ml-2 text-gray-900">
                {new Date(booking.lastUpdated).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingStatusTracker;
