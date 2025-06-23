// src/components/packages/PackagesList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPackages } from '../../redux/packages/packageSlice';
import SmartBookingButton from '../bookings/SmartBookingButton';
import { formatCurrency } from '../../utils/bookingUtils';

const PackagesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages, loading, error } = useSelector((state) => state.packages);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  if (loading) return <p className="text-center text-blue-600">Loading packages...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;
// console.log(packages.data.packages)
  const formatDuration = (duration) => {
    if (typeof duration === 'object' && duration.days) {
      return `${duration.days} days${duration.nights ? ` / ${duration.nights} nights` : ''}`;
    }
    return `${duration || 0} days`;
  };

  const getPackagePrice = (pkg) => {
    // Handle different price structures
    if (pkg.pricing?.basePrice) {
      return pkg.pricing.basePrice;
    }

    if (pkg.price) {
      // If price is an object with adult property
      if (typeof pkg.price === 'object' && pkg.price.adult) {
        return pkg.price.adult;
      }

      // If price is an object with min/max properties, use min
      if (typeof pkg.price === 'object' && pkg.price.min !== undefined) {
        return pkg.price.min;
      }

      // If price is a simple number
      if (typeof pkg.price === 'number') {
        return pkg.price;
      }
    }

    return 0;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Available Packages</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
          >
            {/* Package Image */}
            <div className="relative h-48">
              <img
                src={pkg.images?.[0] || '/api/placeholder/400/250'}
                alt={pkg.title || pkg.name}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {pkg.title || pkg.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {pkg.shortDescription || pkg.description}
              </p>

              {/* Package Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Duration: {formatDuration(pkg.duration)}
                </div>

                {pkg.destination && (
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Destination: {typeof pkg.destination === 'object' ? pkg.destination.name : pkg.destination}
                  </div>
                )}

                {pkg.groupSize?.max !== undefined && (
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Max {pkg.groupSize.max} people
                  </div>
                )}
              </div>

              {/* Pricing and Actions */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(getPackagePrice(pkg))}
                      <span className="text-sm font-normal text-gray-600"> / person</span>
                    </div>
                    {pkg.pricing?.originalPrice && pkg.pricing.originalPrice > getPackagePrice(pkg) && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {formatCurrency(pkg.pricing.originalPrice - getPackagePrice(pkg))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <SmartBookingButton
                    package={pkg}
                    className="w-full"
                    size="md"
                  >
                    Book Now
                  </SmartBookingButton>

                  <button
                    onClick={() => navigate(`/packages/${pkg._id}`)}
                    className="w-full px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagesList;
