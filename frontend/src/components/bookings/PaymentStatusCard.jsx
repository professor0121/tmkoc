import React from 'react';
import { formatCurrency, getPaymentStatusColor } from '../../utils/bookingUtils';

const PaymentStatusCard = ({ booking, onAddPayment, onRequestRefund }) => {
  const getPaymentIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'partial':
        return (
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
      case 'refunded':
        return (
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'completed':
        return 'Payment completed successfully';
      case 'pending':
        return 'Payment is being processed';
      case 'failed':
        return 'Payment failed - please try again';
      case 'partial':
        return 'Partial payment received';
      case 'refunded':
        return 'Payment has been refunded';
      default:
        return 'Payment status unknown';
    }
  };

  const canAddPayment = () => {
    return booking.paymentStatus === 'pending' || booking.paymentStatus === 'failed' || booking.paymentStatus === 'partial';
  };

  const canRequestRefund = () => {
    return booking.paymentStatus === 'completed' && (booking.status === 'cancelled' || booking.status === 'completed');
  };

  const calculatePaidAmount = () => {
    if (!booking.payments || booking.payments.length === 0) {
      return 0;
    }
    
    return booking.payments
      .filter(payment => payment.status === 'success')
      .reduce((total, payment) => total + payment.amount, 0);
  };

  const calculateRemainingAmount = () => {
    const totalAmount = booking.pricing?.totalAmount || 0;
    const paidAmount = calculatePaidAmount();
    return Math.max(0, totalAmount - paidAmount);
  };

  const paidAmount = calculatePaidAmount();
  const remainingAmount = calculateRemainingAmount();
  const totalAmount = booking.pricing?.totalAmount || 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
        <div className="flex items-center space-x-2">
          {getPaymentIcon(booking.paymentStatus)}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
            {booking.paymentStatus?.charAt(0).toUpperCase() + booking.paymentStatus?.slice(1)}
          </span>
        </div>
      </div>

      {/* Status Message */}
      <p className="text-sm text-gray-600 mb-6">
        {getStatusMessage(booking.paymentStatus)}
      </p>

      {/* Payment Summary */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Amount:</span>
          <span className="font-semibold text-gray-900">
            {formatCurrency(totalAmount, booking.pricing?.currency)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Paid Amount:</span>
          <span className="font-semibold text-green-600">
            {formatCurrency(paidAmount, booking.pricing?.currency)}
          </span>
        </div>
        
        {remainingAmount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Remaining Amount:</span>
            <span className="font-semibold text-red-600">
              {formatCurrency(remainingAmount, booking.pricing?.currency)}
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {totalAmount > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Payment Progress</span>
            <span>{Math.round((paidAmount / totalAmount) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((paidAmount / totalAmount) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Payment History */}
      {booking.payments && booking.payments.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Payment History</h4>
          <div className="space-y-2">
            {booking.payments.map((payment, index) => (
              <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(payment.amount, payment.currency)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {payment.transactionId} • {new Date(payment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  payment.status === 'success' 
                    ? 'bg-green-100 text-green-800'
                    : payment.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {canAddPayment() && onAddPayment && (
          <button
            onClick={onAddPayment}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {booking.paymentStatus === 'partial' ? 'Complete Payment' : 'Make Payment'}
          </button>
        )}

        {canRequestRefund() && onRequestRefund && (
          <button
            onClick={onRequestRefund}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Request Refund
          </button>
        )}

        {booking.paymentStatus === 'completed' && (
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Receipt
          </button>
        )}
      </div>

      {/* Payment Method Info */}
      {booking.payment?.method && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Payment Method:</span> {booking.payment.method.replace('_', ' ').toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentStatusCard;
