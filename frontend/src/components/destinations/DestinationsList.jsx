// src/components/destinations/DestinationsList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const {
    destinations,
    featuredDestinations,
    popularDestinations,
    searchResults,
    loading,
    error
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
        return featuredDestinations || [];
      case 'popular':
        return popularDestinations || [];
      case 'search':
        return searchResults || [];
      default:
        return destinations || [];
    }
  };

  const handleDestinationClick = (destinationId) => {
    navigate(`/destinations-detail/${destinationId}`);
  };

  const displayDestinations = getDisplayDestinations();
  console.log(displayDestinations)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => dispatch(clearError())}
                className="inline-flex text-red-400 hover:text-red-600 focus:outline-none"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search destinations by name, location, or category..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <span className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Search
              </span>
            </button>
          </div>
        </form>

        {/* View Mode Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setViewMode('all')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              viewMode === 'all'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
            }`}
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
              </svg>
              <span>All Destinations</span>
            </span>
          </button>
          <button
            onClick={() => setViewMode('featured')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              viewMode === 'featured'
                ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/25'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
            }`}
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>Featured ({featuredDestinations?.length || 0})</span>
            </span>
          </button>
          <button
            onClick={() => setViewMode('popular')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              viewMode === 'popular'
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
            }`}
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Popular ({popularDestinations?.length || 0})</span>
            </span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedCategory || searchText || viewMode !== 'all') && (
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Results Info */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-lg">
            <span className="font-semibold text-gray-900">{displayDestinations?.length || 0}</span> destinations found
            {viewMode !== 'all' && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {viewMode}
              </span>
            )}
          </p>
          {(displayDestinations?.length || 0) > 0 && (
            <div className="text-sm text-gray-500">
              Discover your next adventure
            </div>
          )}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(displayDestinations || []).map((destination) => (
          <div
            key={destination._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              {destination.images && destination.images.length > 0 ? (
                <img
                  src={destination.images.find(img => img.isPrimary)?.url || destination.images[0]?.url}
                  alt={destination.images.find(img => img.isPrimary)?.alt || destination.name}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <div className="w-full h-56 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Overlay badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {destination.isFeatured && (
                  <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    ⭐ Featured
                  </span>
                )}
                {destination.isPopular && (
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    🔥 Popular
                  </span>
                )}
              </div>
            </div>

            <div className="p-6">
              {/* Title and Location */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                {destination.name}
              </h3>
              <div className="flex items-center text-gray-600 mb-3">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">
                  {destination.city}, {destination.state}, {destination.country}
                </span>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                {destination.shortDescription}
              </p>

              {/* Category and Rating */}
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {destination.category.charAt(0).toUpperCase() + destination.category.slice(1).replace('-', ' ')}
                </span>
                {destination.rating && (
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(destination.rating.average) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1 font-medium">
                      {destination.rating.average} ({destination.rating.totalReviews})
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleDestinationClick(destination._id)}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  <span>Explore Destination</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {(displayDestinations?.length || 0) === 0 && !loading && (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-500 mb-6">
              {searchText || selectedCategory || viewMode !== 'all'
                ? "We couldn't find any destinations matching your criteria. Try adjusting your filters or search terms."
                : "No destinations are available at the moment. Please check back later."
              }
            </p>
            {(selectedCategory || searchText || viewMode !== 'all') && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Show All Destinations
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationsList;
