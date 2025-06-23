// src/components/destinations/FeaturedDestinations.jsx
import { useEffect } from 'react';
import { useDestinations } from '../../hooks/useDestinations';
import { useNavigate } from 'react-router-dom';
import SmartBookingButton from '../bookings/SmartBookingButton';

const FeaturedDestinations = () => {
  const {
    featuredDestinations,
    isLoading,
    hasError,
    error,
    getFeaturedDestinations,
    clearError
  } = useDestinations();
  const navigate = useNavigate();

  useEffect(() => {
    getFeaturedDestinations();
  }, [getFeaturedDestinations]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleExploreBtn=(id)=>{
    console.log("btn is clicked")
    console.log(featuredDestinations._id)
    navigate(`/destinations-detail/${id}`)
  }

  if (hasError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <span className="block sm:inline">{error}</span>
        <button
          onClick={clearError}
          className="float-right text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
    );
  }
// console.log(featuredDestinations)
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of extraordinary destinations that offer unique experiences and unforgettable memories.
          </p>
        </div>

        {featuredDestinations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured destinations available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div
                key={destination._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                {destination.images && destination.images.length > 0 && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.images.find(img => img.isPrimary)?.url || destination.images[0]?.url}
                      alt={destination.images.find(img => img.isPrimary)?.alt || destination.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Title and Location */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    📍 {destination.city}, {destination.state}
                  </p>

                  {/* Short Description */}
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {destination.shortDescription}
                  </p>

                  {/* Category and Rating */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
                    </span>
                    {destination.rating && destination.rating.average > 0 && (
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm font-medium text-gray-700">
                          {destination.rating.average}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({destination.rating.totalReviews})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {destination.tags && destination.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {destination.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {destination.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{destination.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <SmartBookingButton
                      destination={destination}
                      className="w-full"
                      size="md"
                    >
                      Book Now
                    </SmartBookingButton>

                    <button
                      onClick={()=>handleExploreBtn(destination._id)}
                      className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium border border-gray-300"
                    >
                      Explore Destination
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {featuredDestinations.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/destinations')}
              className="bg-gray-800 text-white py-3 px-8 rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium"
            >
              View All Destinations
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
