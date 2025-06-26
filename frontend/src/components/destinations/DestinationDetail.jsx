// src/components/destinations/DestinationDetail.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getDestinationById,
  getNearbyDestinations,
  addDestinationReview,
  clearCurrentDestination,
  clearError
} from '../../redux/destinations/destinationSlice';
import SmartBookingButton, { FloatingBookingButton } from '../bookings/SmartBookingButton';
import Header from '../Header';
import Footer from '../home/Footer';

const DestinationDetail = () => {
  const { id } = useParams();
  console.log("id", id);
  const dispatch = useDispatch();
  const { currentDestination, nearbyDestinations, loading, error } = useSelector(
    (state) => state.destinations
  );
  const { user } = useSelector((state) => state.auth);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    if (id) {
      dispatch(getDestinationById(id));
      
      dispatch(getNearbyDestinations({ destinationId: id, maxDistance: 100 }));
    }

    return () => {
      dispatch(clearCurrentDestination());
    };
  }, [dispatch, id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (user && currentDestination) {
      dispatch(addDestinationReview({
        destinationId: currentDestination._id,
        reviewData
      }));
      setReviewData({ rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
  //         <span className="block sm:inline">{error}</span>
  //         <button
  //           onClick={() => dispatch(clearError())}
  //           className="float-right text-red-500 hover:text-red-700"
  //         >
  //           ×
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  if (!currentDestination) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Destination not found.</p>
      </div>
    );
  }

  const destination = currentDestination;
  console.log("the destinations from details",destination)
  return (
    <div>
      <Header/>

    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{destination.name}</h1>
            <p className="text-xl text-gray-600">
              {destination.city}, {destination.state}, {destination.country}
            </p>
            <div className="flex items-center mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">
                {destination.category}
              </span>
              {destination.isFeatured && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm mr-2">
                  Featured
                </span>
              )}
              {destination.isPopular && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Popular
                </span>
              )}
            </div>
          </div>

          {/* Desktop Booking Button */}
          <div className="mt-4 md:mt-0 md:ml-6 hidden md:block">
            <SmartBookingButton
              destination={destination}
              size="lg"
              className="shadow-lg"
            >
              Book This Destination
            </SmartBookingButton>
          </div>
        </div>
      </div>

      {/* Images */}
      {destination.images && destination.images.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destination.images.slice(0, 6).map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt}
                className={`rounded-lg object-cover ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 h-96' : 'h-48'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{destination.description}</p>
          </section>

          {/* Attractions */}
          {destination.attractions && destination.attractions.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Attractions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.attractions.map((attraction, index) => (
                  <div key={index} className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{attraction.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{attraction.type}</p>
                    <p className="text-gray-700 mb-2">{attraction.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-green-600">
                        Entry: ₹{attraction.entryFee === 0 ? 'Free' : attraction.entryFee}
                      </span>
                      <span className="text-yellow-500">★ {attraction.rating}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{attraction.timings}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Climate */}
          {destination.climate && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Climate & Best Time to Visit</h2>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="mb-2">
                  <strong>Climate Type:</strong> {destination.climate.type}
                </p>
                <p className="mb-2">
                  <strong>Best Months:</strong> {destination.climate.bestVisitMonths?.join(', ')}
                </p>
                <p className="mb-2">
                  <strong>Temperature Range:</strong> {
                    destination.climate.averageTemperature?.min !== undefined &&
                    destination.climate.averageTemperature?.max !== undefined
                      ? `${destination.climate.averageTemperature.min}°C - ${destination.climate.averageTemperature.max}°C`
                      : 'Information not available'
                  }
                </p>
                <p>
                  <strong>Rainfall:</strong> {destination.climate.rainfallPattern}
                </p>
              </div>
            </section>
          )}

          {/* Reviews Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
              {user && (
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Write Review
                </button>
              )}
            </div>

            {/* Review Form */}
            {showReviewForm && user && (
              <form onSubmit={handleReviewSubmit} className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Rating
                  </label>
                  <select
                    value={reviewData.rating}
                    onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[5, 4, 3, 2, 1].map(rating => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Comment
                  </label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Share your experience..."
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            {destination.reviews && destination.reviews.length > 0 ? (
              <div className="space-y-4">
                {destination.reviews.map((review, index) => (
                  <div key={index} className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
                        <div className="flex items-center">
                          <span className="text-yellow-500">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </span>
                          <span className="text-gray-500 text-sm ml-2">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Booking Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Plan Your Trip</h3>
            <p className="text-gray-600 mb-4">
              Discover amazing packages and create custom trips to {destination.name}
            </p>
            <div className="space-y-3">
              <SmartBookingButton
                destination={destination}
                className="w-full"
                size="lg"
              >
                Book This Destination
              </SmartBookingButton>

              <button
                onClick={() => window.location.href = `/book/custom/${destination._id}`}
                className="w-full px-4 py-2 border border-green-300 text-green-700 rounded-md hover:bg-green-50 transition-colors"
              >
                Create Custom Trip
              </button>
            </div>
          </div>

          {/* Rating */}
          {destination.rating && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Rating</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">
                  {destination.rating.average}
                </div>
                <div className="text-yellow-500 text-xl mb-2">
                  {'★'.repeat(Math.round(destination.rating.average))}
                </div>
                <p className="text-gray-600">
                  Based on {destination.rating.totalReviews} reviews
                </p>
              </div>
            </div>
          )}

          {/* Transportation */}
          {destination.transportation && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">How to Reach</h3>
              <div className="space-y-3">
                {destination.transportation.nearestAirport && (
                  <div>
                    <p className="font-medium">✈️ Nearest Airport</p>
                    <p className="text-sm text-gray-600">
                      {destination.transportation.nearestAirport.name} ({destination.transportation.nearestAirport.code})
                    </p>
                    <p className="text-sm text-gray-500">
                      {destination.transportation.nearestAirport.distance} km away
                    </p>
                  </div>
                )}
                {destination.transportation.nearestRailway && (
                  <div>
                    <p className="font-medium">🚂 Nearest Railway</p>
                    <p className="text-sm text-gray-600">
                      {destination.transportation.nearestRailway.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {destination.transportation.nearestRailway.distance} km away
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Nearby Destinations */}
          {nearbyDestinations && nearbyDestinations.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Nearby Destinations</h3>
              <div className="space-y-3">
                {nearbyDestinations.slice(0, 5).map((nearby) => (
                  <div key={nearby._id} className="flex items-center space-x-3">
                    {nearby.images && nearby.images[0] && (
                      <img
                        src={nearby.images[0].url}
                        alt={nearby.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-sm">{nearby.name}</p>
                      <p className="text-xs text-gray-500">{nearby.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Floating Button */}
      <FloatingBookingButton destination={destination} />
    </div>
    <Footer/>
    </div>
  );
};

export default DestinationDetail;
