import React, { useState } from 'react';
import { formatCurrency } from '../../utils/bookingUtils';

const PackageDetailsCard = ({ package: pkg, destination, onBookNow }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const formatDuration = (duration) => {
    if (typeof duration === 'object' && duration.days) {
      return `${duration.days} days${duration.nights ? ` / ${duration.nights} nights` : ''}`;
    }
    return `${duration || 0} days`;
  };

  const getPackageImages = () => {
    const images = [];
    if (pkg.images?.length > 0) {
      images.push(...pkg.images);
    }
    if (destination?.images?.length > 0) {
      images.push(...destination.images);
    }
    return images.length > 0 ? images : ['/api/placeholder/800/600'];
  };

  const images = getPackageImages();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'What\'s Included' },
    { id: 'pricing', label: 'Pricing' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Image Gallery */}
      <div className="relative">
        <div className="h-96 overflow-hidden">
          <img
            src={images[activeImageIndex]}
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Package Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {formatDuration(pkg.duration)}
          </span>
        </div>
      </div>

      {/* Package Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{pkg.name}</h1>
            {destination && (
              <p className="text-lg text-gray-600">{destination.name}, {destination.country}</p>
            )}
          </div>
          <div className="text-right">
            {pkg.pricing?.originalPrice && pkg.pricing.originalPrice > pkg.pricing.basePrice && (
              <span className="text-lg text-gray-500 line-through block">
                {formatCurrency(pkg.pricing.originalPrice)}
              </span>
            )}
            <div className="text-3xl font-bold text-gray-900">
              {formatCurrency(pkg.pricing?.basePrice || pkg.price || 0)}
              <span className="text-lg font-normal text-gray-600"> / person</span>
            </div>
            {pkg.pricing?.originalPrice && pkg.pricing.originalPrice > pkg.pricing.basePrice && (
              <div className="text-sm text-green-600 font-medium">
                Save {formatCurrency(pkg.pricing.originalPrice - pkg.pricing.basePrice)}
              </div>
            )}
          </div>
        </div>

        {/* Rating and Quick Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {pkg.rating && (
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(pkg.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {pkg.rating} ({pkg.reviewCount || 0} reviews)
                </span>
              </div>
            )}
            
            {pkg.groupSize && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Max {pkg.groupSize} people
              </div>
            )}
            
            {pkg.difficulty && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                pkg.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                pkg.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {pkg.difficulty}
              </span>
            )}
          </div>
          
          <button
            onClick={onBookNow}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
            </div>
            
            {pkg.highlights && pkg.highlights.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Day-by-Day Itinerary</h3>
            {pkg.itinerary && pkg.itinerary.length > 0 ? (
              <div className="space-y-4">
                {pkg.itinerary.map((day, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Day {index + 1}: {day.title}</h4>
                    <p className="text-gray-600 mt-1">{day.description}</p>
                    {day.activities && day.activities.length > 0 && (
                      <ul className="mt-2 text-sm text-gray-600">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-center">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Detailed itinerary will be provided upon booking.</p>
            )}
          </div>
        )}

        {activeTab === 'inclusions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pkg.included && pkg.included.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-green-600">✓ What's Included</h3>
                <ul className="space-y-2">
                  {pkg.included.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {pkg.excluded && pkg.excluded.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-red-600">✗ What's Not Included</h3>
                <ul className="space-y-2">
                  {pkg.excluded.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Details</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Base Price</h4>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(pkg.pricing?.basePrice || pkg.price || 0)}
                    <span className="text-lg font-normal text-gray-600"> / person</span>
                  </div>
                  {pkg.pricing?.originalPrice && pkg.pricing.originalPrice > pkg.pricing.basePrice && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      Save {formatCurrency(pkg.pricing.originalPrice - pkg.pricing.basePrice)} per person
                    </div>
                  )}
                </div>
                
                {pkg.pricing?.groupDiscounts && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Group Discounts</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pkg.pricing.groupDiscounts.map((discount, index) => (
                        <li key={index}>
                          {discount.minPeople}+ people: {discount.discount}% off
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  * Prices are per person based on double occupancy. Single supplement may apply.
                  Final price will be calculated based on your specific requirements.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetailsCard;
