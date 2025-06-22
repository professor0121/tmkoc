// src/hooks/useDestinations.js
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  getAllDestinations,
  getDestinationById,
  getDestinationsByCategory,
  getFeaturedDestinations,
  getPopularDestinations,
  searchDestinations,
  getDestinationsByLocation,
  getNearbyDestinations,
  getDestinationStatistics,
  createDestination,
  updateDestination,
  deleteDestination,
  addDestinationReview,
  toggleFeaturedStatus,
  clearError,
  clearCurrentDestination,
  clearSearchResults,
  setFilters,
  clearFilters,
  setPagination
} from '../redux/destinations/destinationSlice';

export const useDestinations = () => {
  const dispatch = useDispatch();
  const destinationState = useSelector((state) => state.destinations);

  // Action dispatchers
  const actions = {
    // Fetch actions
    getAllDestinations: useCallback((params) => dispatch(getAllDestinations(params)), [dispatch]),
    getDestinationById: useCallback((id) => dispatch(getDestinationById(id)), [dispatch]),
    getDestinationsByCategory: useCallback((category) => dispatch(getDestinationsByCategory(category)), [dispatch]),
    getFeaturedDestinations: useCallback(() => dispatch(getFeaturedDestinations()), [dispatch]),
    getPopularDestinations: useCallback(() => dispatch(getPopularDestinations()), [dispatch]),
    searchDestinations: useCallback((searchText) => dispatch(searchDestinations(searchText)), [dispatch]),
    getDestinationsByLocation: useCallback((locationParams) => dispatch(getDestinationsByLocation(locationParams)), [dispatch]),
    getNearbyDestinations: useCallback((params) => dispatch(getNearbyDestinations(params)), [dispatch]),
    getDestinationStatistics: useCallback(() => dispatch(getDestinationStatistics()), [dispatch]),

    // CRUD actions (Admin)
    createDestination: useCallback((destinationData) => dispatch(createDestination(destinationData)), [dispatch]),
    updateDestination: useCallback((params) => dispatch(updateDestination(params)), [dispatch]),
    deleteDestination: useCallback((id) => dispatch(deleteDestination(id)), [dispatch]),

    // Review actions
    addDestinationReview: useCallback((params) => dispatch(addDestinationReview(params)), [dispatch]),

    // Admin actions
    toggleFeaturedStatus: useCallback((params) => dispatch(toggleFeaturedStatus(params)), [dispatch]),

    // UI actions
    clearError: useCallback(() => dispatch(clearError()), [dispatch]),
    clearCurrentDestination: useCallback(() => dispatch(clearCurrentDestination()), [dispatch]),
    clearSearchResults: useCallback(() => dispatch(clearSearchResults()), [dispatch]),
    setFilters: useCallback((filters) => dispatch(setFilters(filters)), [dispatch]),
    clearFilters: useCallback(() => dispatch(clearFilters()), [dispatch]),
    setPagination: useCallback((pagination) => dispatch(setPagination(pagination)), [dispatch])
  };

  // Computed values
  const computed = {
    // Check if any destinations are loading
    isLoading: destinationState.loading,
    
    // Check if there's an error
    hasError: !!destinationState.error,
    
    // Get total destinations count
    totalDestinations: destinationState.destinations.length,
    
    // Get featured destinations count
    featuredCount: destinationState.featuredDestinations.length,
    
    // Get popular destinations count
    popularCount: destinationState.popularDestinations.length,
    
    // Check if search has results
    hasSearchResults: destinationState.searchResults.length > 0,
    
    // Check if filters are active
    hasActiveFilters: !!(
      destinationState.filters.category ||
      destinationState.filters.location ||
      destinationState.filters.searchText
    ),
    
    // Get current page info
    currentPage: destinationState.pagination.page,
    totalPages: destinationState.pagination.totalPages,
    hasNextPage: destinationState.pagination.page < destinationState.pagination.totalPages,
    hasPrevPage: destinationState.pagination.page > 1
  };

  // Helper functions
  const helpers = {
    // Get destination by ID from current state
    getDestinationFromState: useCallback((id) => {
      return destinationState.destinations.find(dest => dest._id === id) ||
             destinationState.featuredDestinations.find(dest => dest._id === id) ||
             destinationState.popularDestinations.find(dest => dest._id === id);
    }, [destinationState.destinations, destinationState.featuredDestinations, destinationState.popularDestinations]),

    // Filter destinations by category from current state
    filterByCategory: useCallback((category) => {
      return destinationState.destinations.filter(dest => dest.category === category);
    }, [destinationState.destinations]),

    // Get destinations by rating range
    filterByRating: useCallback((minRating, maxRating = 5) => {
      return destinationState.destinations.filter(dest => 
        dest.rating && dest.rating.average >= minRating && dest.rating.average <= maxRating
      );
    }, [destinationState.destinations]),

    // Get destinations by country
    filterByCountry: useCallback((country) => {
      return destinationState.destinations.filter(dest => 
        dest.country.toLowerCase().includes(country.toLowerCase())
      );
    }, [destinationState.destinations]),

    // Sort destinations by various criteria
    sortDestinations: useCallback((destinations, sortBy = 'name', order = 'asc') => {
      const sorted = [...destinations].sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'rating':
            aValue = a.rating?.average || 0;
            bValue = b.rating?.average || 0;
            break;
          case 'popularity':
            aValue = a.popularityScore || 0;
            bValue = b.popularityScore || 0;
            break;
          case 'reviews':
            aValue = a.rating?.totalReviews || 0;
            bValue = b.rating?.totalReviews || 0;
            break;
          default:
            aValue = a[sortBy];
            bValue = b[sortBy];
        }
        
        if (order === 'desc') {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      });
      
      return sorted;
    }, [])
  };

  return {
    // State
    ...destinationState,
    
    // Actions
    ...actions,
    
    // Computed values
    ...computed,
    
    // Helper functions
    ...helpers
  };
};

export default useDestinations;
