import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDestinationById } from '../redux/destinations/destinationSlice';
import { getAllPackages } from '../redux/packages/packageSlice';
import Header from '../components/Header';
import SmartBookingButton, { FloatingBookingButton } from '../components/bookings/SmartBookingButton';
import PackageSelectionCard from '../components/bookings/PackageSelectionCard';
import { formatCurrency } from '../utils/bookingUtils';

const DestinationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentDestination, loading: destinationLoading, error } = useSelector(state => state.destinations);
  const { packages, loading: packagesLoading } = useSelector(state => state.packages);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [availablePackages, setAvailablePackages] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(getDestinationById(id));
      dispatch(getAllPackages());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentDestination && packages) {
      // Filter packages that include this destination
      const destinationPackages = packages.filter(pkg => 
        pkg.destinations?.some(dest => 
          (typeof dest === 'object' ? dest._id : dest) === id
        ) ||
        (typeof pkg.destination === 'object' ? pkg.destination._id : pkg.destination) === id
      );
      setAvailablePackages(destinationPackages);
    }
  }, [currentDestination, packages, id]);

  const handleImageNavigation = (direction) => {
    const images = currentDestination?.images || [];
    if (direction === 'next') {
      setActiveImageIndex(prev => (prev + 1) % images.length);
    } else {
      setActiveImageIndex(prev => (prev - 1 + images.length) % images.length);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'packages', label: `Packages (${availablePackages.length})` },
    { id: 'travel-info', label: 'Travel Info' }
  ];

  if (destinationLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading destination details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentDestination) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Destination Not Found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {error || 'The destination you\'re looking for doesn\'t exist.'}
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/destinations')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Destinations
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const images = currentDestination.images || ['/api/placeholder/800/600'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Image Gallery */}
      <div className="relative">
        <div className="h-96 md:h-[500px] overflow-hidden">
          <img
            src={images[activeImageIndex]}
            alt={currentDestination.name}
            className="w-full h-full object-cover"
          />
          
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
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{currentDestination.name}</h1>
              <p className="text-xl md:text-2xl opacity-90 mb-4">{currentDestination.country}</p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 text-sm md:text-base">
                {currentDestination.climate && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    {currentDestination.climate}
                  </div>
                )}
                {currentDestination.bestTimeToVisit && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Best time: {currentDestination.bestTimeToVisit}
                  </div>
                )}
                {availablePackages.length > 0 && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {availablePackages.length} packages available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Booking Button */}
        <div className="absolute top-4 right-4 hidden md:block">
          <SmartBookingButton
            destination={currentDestination}
            size="lg"
            className="shadow-lg"
          >
            Book This Destination
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {currentDestination.name}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {currentDestination.description}
                  </p>
                </div>

                {/* Highlights */}
                {currentDestination.highlights && currentDestination.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentDestination.highlights.map((highlight, index) => (
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

                {/* Activities */}
                {currentDestination.activities && currentDestination.activities.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Activities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {currentDestination.activities.map((activity, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg p-3 text-center">
                          <span className="text-gray-700 text-sm font-medium">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'attractions' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Attractions</h2>
                {currentDestination.attractions && currentDestination.attractions.length > 0 ? (
                  <div className="space-y-6">
                    {currentDestination.attractions.map((attraction, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{attraction.name}</h3>
                        <p className="text-gray-600 mb-3">{attraction.description}</p>
                        {attraction.category && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {attraction.category}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No attractions listed</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Attraction information will be available soon.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'packages' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Packages</h2>
                {packagesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading packages...</p>
                  </div>
                ) : availablePackages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availablePackages.map((pkg) => (
                      <PackageSelectionCard
                        key={pkg._id}
                        package={pkg}
                        destination={currentDestination}
                        onSelect={() => navigate(`/packages/${pkg._id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No packages available</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No pre-designed packages are currently available for this destination.
                    </p>
                    <div className="mt-6">
                      <SmartBookingButton
                        destination={currentDestination}
                        variant="success"
                      >
                        Create Custom Trip
                      </SmartBookingButton>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'travel-info' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Climate */}
                  {currentDestination.climate && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Climate</h3>
                      <p className="text-gray-600">{currentDestination.climate}</p>
                    </div>
                  )}

                  {/* Best Time to Visit */}
                  {currentDestination.bestTimeToVisit && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Time to Visit</h3>
                      <p className="text-gray-600">{currentDestination.bestTimeToVisit}</p>
                    </div>
                  )}

                  {/* Currency */}
                  {currentDestination.currency && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Currency</h3>
                      <p className="text-gray-600">{currentDestination.currency}</p>
                    </div>
                  )}

                  {/* Language */}
                  {currentDestination.language && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Language</h3>
                      <p className="text-gray-600">{currentDestination.language}</p>
                    </div>
                  )}
                </div>

                {/* Travel Tips */}
                {currentDestination.travelTips && currentDestination.travelTips.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Travel Tips</h3>
                    <div className="space-y-3">
                      {currentDestination.travelTips.map((tip, index) => (
                        <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg">
                          <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Booking Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Your Trip</h3>
                
                {availablePackages.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Starting from</p>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(Math.min(...availablePackages.map(pkg => {
                        // Safe price extraction
                        if (pkg.pricing?.basePrice) return pkg.pricing.basePrice;
                        if (pkg.price) {
                          if (typeof pkg.price === 'object' && pkg.price.adult) return pkg.price.adult;
                          if (typeof pkg.price === 'object' && pkg.price.min !== undefined) return pkg.price.min;
                          if (typeof pkg.price === 'number') return pkg.price;
                        }
                        return 0;
                      })))}
                      <span className="text-sm font-normal text-gray-600"> / person</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <SmartBookingButton
                    destination={currentDestination}
                    className="w-full"
                    size="lg"
                  >
                    Book This Destination
                  </SmartBookingButton>
                  
                  <button
                    onClick={() => navigate(`/book/custom/${currentDestination._id}`)}
                    className="w-full px-4 py-2 border border-green-300 text-green-700 rounded-md hover:bg-green-50 transition-colors"
                  >
                    Create Custom Trip
                  </button>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Country:</span>
                    <span className="font-medium">{currentDestination.country}</span>
                  </div>
                  {currentDestination.region && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Region:</span>
                      <span className="font-medium">{currentDestination.region}</span>
                    </div>
                  )}
                  {availablePackages.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Packages:</span>
                      <span className="font-medium">{availablePackages.length} available</span>
                    </div>
                  )}
                  {currentDestination.highlights && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Highlights:</span>
                      <span className="font-medium">{currentDestination.highlights.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Button */}
      <FloatingBookingButton destination={currentDestination} />
    </div>
  );
};

export default DestinationDetailsPage;
