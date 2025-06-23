import React from 'react';

const PaymentForm = ({ formData, onInputChange, validationErrors }) => {
  const paymentMethods = [
    {
      value: 'credit_card',
      label: 'Credit Card',
      description: 'Visa, MasterCard, American Express',
      icon: '💳'
    },
    {
      value: 'debit_card',
      label: 'Debit Card',
      description: 'Bank debit card',
      icon: '💳'
    },
    {
      value: 'upi',
      label: 'UPI',
      description: 'Google Pay, PhonePe, Paytm',
      icon: '📱'
    },
    {
      value: 'net_banking',
      label: 'Net Banking',
      description: 'Online banking transfer',
      icon: '🏦'
    },
    {
      value: 'wallet',
      label: 'Digital Wallet',
      description: 'PayPal, Paytm Wallet',
      icon: '👛'
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h3>
      
      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Payment Method *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.value}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                formData.paymentMethod === method.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onInputChange('paymentMethod', method.value)}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={formData.paymentMethod === method.value}
                  onChange={(e) => onInputChange('paymentMethod', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-lg">{method.icon}</span>
                <label className="ml-2 font-medium text-gray-900">
                  {method.label}
                </label>
              </div>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          ))}
        </div>
        {validationErrors.paymentMethod && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.paymentMethod}</p>
        )}
      </div>

      {/* Payment Terms and Conditions */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="font-medium text-gray-900 mb-2">Payment Terms</h4>
        <div className="text-sm text-gray-600 space-y-2">
          <p>• Payment will be processed securely through our payment gateway</p>
          <p>• A confirmation email will be sent after successful payment</p>
          <p>• Cancellation charges may apply as per our cancellation policy</p>
          <p>• Refunds will be processed within 7-10 business days</p>
        </div>
      </div>

      {/* Pricing Breakdown */}
      {formData.pricing && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Pricing Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium">${formData.pricing.basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Accommodation:</span>
              <span className="font-medium">${formData.pricing.roomPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & Fees:</span>
              <span className="font-medium">${(formData.pricing.taxes + formData.pricing.fees).toFixed(2)}</span>
            </div>
            {formData.pricing.discounts > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discounts:</span>
                <span className="font-medium">-${formData.pricing.discounts}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-blue-600">${formData.pricing.totalAmount}</span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Secure Payment
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Your payment information is encrypted and secure. We use industry-standard 
                SSL encryption to protect your financial data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Agreement */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={formData.agreeTerms || false}
            onChange={(e) => onInputChange('agreeTerms', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
          />
          <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
            I agree to the{' '}
            <a href="/terms" className="text-blue-600 hover:text-blue-500 underline" target="_blank">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-600 hover:text-blue-500 underline" target="_blank">
              Privacy Policy
            </a>
          </label>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeCancellation"
            checked={formData.agreeCancellation || false}
            onChange={(e) => onInputChange('agreeCancellation', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
          />
          <label htmlFor="agreeCancellation" className="ml-2 block text-sm text-gray-700">
            I understand the{' '}
            <a href="/cancellation-policy" className="text-blue-600 hover:text-blue-500 underline" target="_blank">
              Cancellation Policy
            </a>{' '}
            and refund terms
          </label>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeMarketing"
            checked={formData.agreeMarketing || false}
            onChange={(e) => onInputChange('agreeMarketing', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
          />
          <label htmlFor="agreeMarketing" className="ml-2 block text-sm text-gray-700">
            I would like to receive promotional emails and travel updates (optional)
          </label>
        </div>
      </div>

      {/* Payment Method Specific Information */}
      {formData.paymentMethod && (
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="font-medium text-blue-900 mb-2">
            {paymentMethods.find(m => m.value === formData.paymentMethod)?.label} Information
          </h4>
          <div className="text-sm text-blue-800">
            {formData.paymentMethod === 'credit_card' && (
              <p>You will be redirected to a secure payment page to enter your card details.</p>
            )}
            {formData.paymentMethod === 'debit_card' && (
              <p>You will be redirected to a secure payment page to enter your debit card details.</p>
            )}
            {formData.paymentMethod === 'upi' && (
              <p>You will be able to pay using any UPI app like Google Pay, PhonePe, or Paytm.</p>
            )}
            {formData.paymentMethod === 'net_banking' && (
              <p>You will be redirected to your bank's secure login page to complete the payment.</p>
            )}
            {formData.paymentMethod === 'wallet' && (
              <p>You will be redirected to your digital wallet to complete the payment.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
