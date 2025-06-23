import React from 'react';
import { formatCurrency } from '../../utils/bookingUtils';

const PackageSelectionCard = ({ package: pkg, destination, onSelect }) => {
  const formatDuration = (duration) => {
    if (typeof duration === 'object' && duration.days) {
      return `${duration.days} days${duration.nights ? ` / ${duration.nights} nights` : ''}`;
    }
    return `${duration || 0} days`;
  };

  const getPackageImage = () => {
    return pkg.images?.[0] || destination?.images?.[0] || '/api/placeholder/400/250';
  };

  const getHighlights = () => {
    return pkg.highlights || pkg.features || [];
  };

  const getIncluded = () => {
    return pkg.included || pkg.inclusions || [];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Package Image */}
      <div className="relative h-48">
        <img
          src={getPackageImage()}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
            {formatDuration(pkg.duration)}
          </span>
        </div>
        {pkg.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Package Content */}
      <div className="p-6">
        {/* Package Title and Rating */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{pkg.name}</h3>
          {pkg.rating && (
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
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
        </div>

        {/* Package Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {pkg.description}
        </p>

        {/* Package Highlights */}
        {getHighlights().length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Highlights</h4>
            <div className="flex flex-wrap gap-1">
              {getHighlights().slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {highlight}
                </span>
              ))}
              {getHighlights().length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{getHighlights().length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* What's Included */}
        {getIncluded().length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">What's Included</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {getIncluded().slice(0, 3).map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
              {getIncluded().length > 3 && (
                <li className="text-gray-500">
                  +{getIncluded().length - 3} more inclusions
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Pricing and Action */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              {pkg.pricing?.originalPrice && pkg.pricing.originalPrice > pkg.pricing.basePrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(pkg.pricing.originalPrice)}
                </span>
              )}
              <div className="text-lg font-bold text-gray-900">
                {formatCurrency(pkg.pricing?.basePrice || pkg.price || 0)}
                <span className="text-sm font-normal text-gray-600"> / person</span>
              </div>
              {pkg.pricing?.originalPrice && pkg.pricing.originalPrice > pkg.pricing.basePrice && (
                <div className="text-xs text-green-600 font-medium">
                  Save {formatCurrency(pkg.pricing.originalPrice - pkg.pricing.basePrice)}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onSelect}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Select Package
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>
            {pkg.groupSize ? `Max ${pkg.groupSize} people` : 'Flexible group size'}
          </span>
          {pkg.difficulty && (
            <span className={`px-2 py-1 rounded-full ${
              pkg.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              pkg.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {pkg.difficulty}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageSelectionCard;
