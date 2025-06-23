import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPackageById } from '../redux/packages/packageSlice';
import { getDestinationById } from '../redux/destinations/destinationSlice';
import Header from '../components/Header';
import SmartBookingButton, { FloatingBookingButton } from '../components/bookings/SmartBookingButton';
import { formatCurrency, calculateBookingDuration } from '../utils/bookingUtils';

const PackageDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { packages, loading: packageLoading, error } = useSelector(state => state.packages);
  const { destinations } = useSelector(state => state.destinations);
  
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageDestination, setPackageDestination] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      // Check if package is already in state
      const existingPackage = packages.find(p => p._id === id);
      if (existingPackage) {
        setSelectedPackage(existingPackage);
      } else {
        dispatch(getPackageById(id));
      }
    }
  }, [dispatch, id, packages]);

  useEffect(() => {
    // Update selected package when packages state changes
    if (id && packages.length > 0) {
      const pkg = packages.find(p => p._id === id);
      if (pkg) {
        setSelectedPackage(pkg);
      }
    }
  }, [packages, id]);

  useEffect(() => {
    // Get destination information for the package
    if (selectedPackage) {
      const destinationId = typeof selectedPackage.destination === 'object' 
        ? selectedPackage.destination._id 
        : selectedPackage.destination;
      
      if (destinationId) {
        const existingDestination = destinations.find(d => d._id === destinationId);
        if (existingDestination) {
          setPackageDestination(existingDestination);
        } else {
          dispatch(getDestinationById(destinationId));
        }
      }
    }
  }, [selectedPackage, destinations, dispatch]);

  const formatDuration = (duration) => {
    if (typeof duration === 'object' && duration.days) {
      return `${duration.days} days${duration.nights ? ` / ${duration.nights} nights` : ''}`;
    }
    return `${duration || 0} days`;
  };

  const getPackagePrice = (pkg) => {
    // Safe price extraction
    if (pkg?.pricing?.basePrice) {
      return pkg.pricing.basePrice;
    }

    if (pkg?.price) {
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

  const getPackageImages = () => {
    const images = [];
    if (selectedPackage?.images?.length > 0) {
      images.push(...selectedPackage.images);
    }
    if (packageDestination?.images?.length > 0) {
      images.push(...packageDestination.images);
    }
    return images.length > 0 ? images : ['/api/placeholder/800/600'];
  };

  const handleImageNavigation = (direction) => {
    const images = getPackageImages();
    if (direction === 'next') {
      setActiveImageIndex(prev => (prev + 1) % images.length);
    } else {
      setActiveImageIndex(prev => (prev - 1 + images.length) % images.length);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'What\'s Included' },
    { id: 'pricing', label: 'Pricing' }
  ];

  if (packageLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading package details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Package Not Found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {error || 'The package you\'re looking for doesn\'t exist.'}
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/packages')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const images = getPackageImages();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <a href="/packages" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                    Packages
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    {selectedPackage.name || selectedPackage.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section with Image Gallery */}
      <div className="relative">
        <div className="h-96 md:h-[500px] overflow-hidden">
          <img
            src={images[activeImageIndex]}
            alt={selectedPackage.name || selectedPackage.title}
            className="w-full h-full object-cover"
          />
          
          {/* Package Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {formatDuration(selectedPackage.duration)}
            </span>
          </div>

          {/* Featured Badge */}
          {selectedPackage.featured && (
            <div className="absolute top-4 left-20">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          )}
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => handleImageNavigation('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleImageNavigation('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
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
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {selectedPackage.name || selectedPackage.title}
              </h1>
              {packageDestination && (
                <p className="text-xl md:text-2xl opacity-90 mb-4">
                  {packageDestination.name}, {packageDestination.country}
                </p>
              )}
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 text-sm md:text-base">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDuration(selectedPackage.duration)}
                </div>
                
                {selectedPackage.groupSize && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Max {selectedPackage.groupSize.max} people
                  </div>
                )}
                
                {selectedPackage.difficulty && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {selectedPackage.difficulty} difficulty
                  </div>
                )}

                {selectedPackage.rating && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {/* {selectedPackage.rating} ({selectedPackage.reviewCount || 0} reviews) */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Booking Button */}
        <div className="absolute top-4 right-4 hidden md:block">
          <SmartBookingButton
            package={selectedPackage}
            destination={packageDestination}
            size="lg"
            className="shadow-lg"
          >
            Book This Package
          </SmartBookingButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Package Overview</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {selectedPackage.description || selectedPackage.shortDescription}
                  </p>
                </div>

                {/* Highlights */}
                {selectedPackage.highlights && selectedPackage.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Package Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPackage.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center p-4 bg-blue-50 rounded-lg">
                          <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-800">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {selectedPackage.features && selectedPackage.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedPackage.features.map((feature, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg p-3 text-center">
                          <span className="text-gray-700 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                {selectedPackage.itinerary && selectedPackage.itinerary.length > 0 ? (
                  <div className="space-y-6">
                    {selectedPackage.itinerary.map((day, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6">
                        <div className="flex items-center mb-3">
                          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                            {index + 1}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Day {index + 1}: {day.title || day.name}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-4">{day.description}</p>
                        {day.activities && day.activities.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Activities:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {day.activities.map((activity, actIndex) => (
                                <li key={actIndex} className="flex items-center">
                                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {day.meals && (
                          <div className="mt-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              Meals: {day.meals}
                            </span>
                          </div>
                        )}
                        {day.accommodation && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                              Stay: {day.accommodation}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Detailed itinerary coming soon</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      A detailed day-by-day itinerary will be provided upon booking.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'inclusions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* What's Included */}
                {(selectedPackage.included || selectedPackage.inclusions) && (
                  <div>
                    <h3 className="text-xl font-semibold text-green-600 mb-4">✓ What's Included</h3>
                    <ul className="space-y-3">
                      {(selectedPackage.included || selectedPackage.inclusions || []).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What's Not Included */}
                {(selectedPackage.excluded || selectedPackage.exclusions) && (
                  <div>
                    <h3 className="text-xl font-semibold text-red-600 mb-4">✗ What's Not Included</h3>
                    <ul className="space-y-3">
                      {(selectedPackage.excluded || selectedPackage.exclusions || []).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Additional Services */}
                {selectedPackage.additionalServices && selectedPackage.additionalServices.length > 0 && (
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Services Available</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPackage.additionalServices.map((service, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900">{service.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          {service.price && (
                            <p className="text-sm font-medium text-blue-600 mt-2">
                              +{formatCurrency(service.price)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pricing' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Details</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Base Price</h4>
                      <div className="text-3xl font-bold text-gray-900">
                        {formatCurrency(getPackagePrice(selectedPackage))}
                        <span className="text-lg font-normal text-gray-600"> / person</span>
                      </div>
                      {selectedPackage.pricing?.originalPrice && selectedPackage.pricing.originalPrice > selectedPackage.pricing.basePrice && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          Save {formatCurrency(selectedPackage.pricing.originalPrice - selectedPackage.pricing.basePrice)} per person
                        </div>
                      )}
                    </div>

                    {selectedPackage.pricing?.groupDiscounts && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Group Discounts</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {selectedPackage.pricing.groupDiscounts.map((discount, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{discount.minPeople}+ people:</span>
                              <span className="font-medium text-green-600">{discount.discount}% off</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included in the Price</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Accommodation</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Transportation</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Tour Guide</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      * Prices are per person based on double occupancy. Single supplement may apply.
                      Final price will be calculated based on your specific requirements and travel dates.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Pricing Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Pricing</h3>
                
                <div className="mb-4">
                  {selectedPackage.pricing?.originalPrice && selectedPackage.pricing.originalPrice > selectedPackage.pricing.basePrice && (
                    <span className="text-lg text-gray-500 line-through block">
                      {formatCurrency(selectedPackage.pricing.originalPrice)}
                    </span>
                  )}
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(getPackagePrice(selectedPackage))}
                    <span className="text-lg font-normal text-gray-600"> / person</span>
                  </div>
                  {selectedPackage.pricing?.originalPrice && selectedPackage.pricing.originalPrice > selectedPackage.pricing.basePrice && (
                    <div className="text-sm text-green-600 font-medium">
                      Save {formatCurrency(selectedPackage.pricing.originalPrice - selectedPackage.pricing.basePrice)}
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <SmartBookingButton
                    package={selectedPackage}
                    destination={packageDestination}
                    className="w-full"
                    size="lg"
                  >
                    Book This Package
                  </SmartBookingButton>
                  
                  <button
                    onClick={() => navigate(`/packages/${selectedPackage._id}/details`)}
                    className="w-full px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    View Full Details
                  </button>
                </div>
              </div>

              {/* Package Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{formatDuration(selectedPackage.duration)}</span>
                  </div>
                  {selectedPackage.groupSize && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group Size:</span>
                      <span className="font-medium">Max {selectedPackage.groupSize.max}</span>
                    </div>
                  )}
                  {selectedPackage.difficulty && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                        selectedPackage.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        selectedPackage.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedPackage.difficulty}
                      </span>
                    </div>
                  )}
                  {selectedPackage.category && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{selectedPackage.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Button */}
      <FloatingBookingButton package={selectedPackage} destination={packageDestination} />
    </div>
  );
};

export default PackageDetailsPage;
