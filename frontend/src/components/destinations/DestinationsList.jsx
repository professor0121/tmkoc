// src/components/destinations/DestinationsList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDestinations,
  getFeaturedDestinations,
  getPopularDestinations,
  searchDestinations,
  clearError,
  setFilters,
  clearFilters
} from '../../redux/destinations/destinationSlice';

const DestinationsList = () => {
  const dispatch = useDispatch();
  const {
    destinations,
    featuredDestinations,
    popularDestinations,
    searchResults,
    loading,
    error,
    filters
  } = useSelector((state) => state.destinations);

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('all'); // 'all', 'featured', 'popular', 'search'

  const categories = [
    'adventure',
    'cultural',
    'religious',
    'wildlife',
    'beach',
    'hill-station',
    'heritage',
    'urban',
    'rural'
  ];

  useEffect(() => {
    // Load initial data
    dispatch(getAllDestinations());
    dispatch(getFeaturedDestinations());
    dispatch(getPopularDestinations());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      dispatch(searchDestinations(searchText));
      setViewMode('search');
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    dispatch(setFilters({ category }));
    dispatch(getAllDestinations({ category }));
    setViewMode('all');
  };

  const clearAllFilters = () => {
    setSearchText('');
    setSelectedCategory('');
    dispatch(clearFilters());
    dispatch(getAllDestinations());
    setViewMode('all');
  };

  const getDisplayDestinations = () => {
    switch (viewMode) {
      case 'featured':
        return featuredDestinations;
      case 'popular':
        return popularDestinations;
      case 'search':
        return searchResults;
      default:
        return destinations;
    }
  };

  const displayDestinations = getDisplayDestinations();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Destinations</h1>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => dispatch(clearError())}
            className="float-right text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search destinations..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </form>

        {/* View Mode Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Destinations
          </button>
          <button
            onClick={() => setViewMode('featured')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'featured'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Featured ({featuredDestinations.length})
          </button>
          <button
            onClick={() => setViewMode('popular')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'popular'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Popular ({popularDestinations.length})
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-gray-700 font-medium">Categories:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Clear Filters */}
        {(selectedCategory || searchText || viewMode !== 'all') && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Results Info */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {displayDestinations.length} destinations
          {viewMode !== 'all' && ` (${viewMode})`}
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayDestinations.map((destination) => (
          <div
            key={destination._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image */}
            {destination.images && destination.images.length > 0 && (
              <img
                src={destination.images.find(img => img.isPrimary)?.url || destination.images[0]?.url}
                alt={destination.images.find(img => img.isPrimary)?.alt || destination.name}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              {/* Title and Location */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {destination.name}
              </h3>
              <p className="text-gray-600 mb-2">
                {destination.city}, {destination.state}, {destination.country}
              </p>

              {/* Short Description */}
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {destination.shortDescription}
              </p>

              {/* Category and Rating */}
              <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {destination.category}
                </span>
                {destination.rating && (
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {destination.rating.average} ({destination.rating.totalReviews})
                    </span>
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-3">
                {destination.isFeatured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Featured
                  </span>
                )}
                {destination.isPopular && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Popular
                  </span>
                )}
              </div>

              {/* Action Button */}
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {displayDestinations.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No destinations found.</p>
          {(selectedCategory || searchText || viewMode !== 'all') && (
            <button
              onClick={clearAllFilters}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Show All Destinations
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationsList;
