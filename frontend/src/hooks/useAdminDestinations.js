// src/hooks/useAdminDestinations.js
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  toggleFeaturedStatus,
  clearError,
  clearCurrentDestination
} from '../redux/destinations/destinationSlice';

export const useAdminDestinations = () => {
  const dispatch = useDispatch();
  const destinationState = useSelector((state) => state.destinations);
  const { user } = useSelector((state) => state.auth);

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Admin-specific actions
  const adminActions = {
    // Load all destinations for admin view
    loadDestinations: useCallback(() => {
      if (isAdmin) {
        return dispatch(getAllDestinations());
      }
    }, [dispatch, isAdmin]),

    // Load destination for editing
    loadDestinationForEdit: useCallback((id) => {
      if (isAdmin) {
        return dispatch(getDestinationById(id));
      }
    }, [dispatch, isAdmin]),

    // Create new destination
    createNewDestination: useCallback(async (destinationData) => {
      if (isAdmin) {
        try {
          const result = await dispatch(createDestination(destinationData));
          return { success: true, data: result.payload };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
      return { success: false, error: 'Admin access required' };
    }, [dispatch, isAdmin]),

    // Update existing destination
    updateExistingDestination: useCallback(async (id, destinationData) => {
      if (isAdmin) {
        try {
          const result = await dispatch(updateDestination({ id, destinationData }));
          return { success: true, data: result.payload };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
      return { success: false, error: 'Admin access required' };
    }, [dispatch, isAdmin]),

    // Delete destination
    removeDestination: useCallback(async (id) => {
      if (isAdmin) {
        try {
          const result = await dispatch(deleteDestination(id));
          return { success: true, data: result.payload };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
      return { success: false, error: 'Admin access required' };
    }, [dispatch, isAdmin]),

    // Toggle featured status
    toggleDestinationFeatured: useCallback(async (id, featured) => {
      if (isAdmin) {
        try {
          const result = await dispatch(toggleFeaturedStatus({ id, featured }));
          return { success: true, data: result.payload };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
      return { success: false, error: 'Admin access required' };
    }, [dispatch, isAdmin]),

    // Clear error
    clearError: useCallback(() => {
      dispatch(clearError());
    }, [dispatch]),

    // Clear current destination
    clearCurrentDestination: useCallback(() => {
      dispatch(clearCurrentDestination());
    }, [dispatch])
  };

  // Admin-specific computed values
  const adminComputed = {
    // Check if user has admin access
    hasAdminAccess: isAdmin,

    // Get destinations with admin-specific info
    destinationsWithStats: destinationState.destinations.map(dest => ({
      ...dest,
      reviewCount: dest.rating?.totalReviews || 0,
      averageRating: dest.rating?.average || 0,
      statusBadges: [
        dest.isActive && 'Active',
        dest.isFeatured && 'Featured',
        dest.isPopular && 'Popular'
      ].filter(Boolean)
    })),

    // Get destinations by status
    activeDestinations: destinationState.destinations.filter(dest => dest.isActive),
    inactiveDestinations: destinationState.destinations.filter(dest => !dest.isActive),
    featuredDestinations: destinationState.destinations.filter(dest => dest.isFeatured),
    popularDestinations: destinationState.destinations.filter(dest => dest.isPopular),

    // Get statistics
    totalDestinations: destinationState.destinations.length,
    activeCount: destinationState.destinations.filter(dest => dest.isActive).length,
    inactiveCount: destinationState.destinations.filter(dest => !dest.isActive).length,
    featuredCount: destinationState.destinations.filter(dest => dest.isFeatured).length,
    popularCount: destinationState.destinations.filter(dest => dest.isPopular).length,

    // Category distribution
    categoryStats: destinationState.destinations.reduce((acc, dest) => {
      acc[dest.category] = (acc[dest.category] || 0) + 1;
      return acc;
    }, {}),

    // Country distribution
    countryStats: destinationState.destinations.reduce((acc, dest) => {
      acc[dest.country] = (acc[dest.country] || 0) + 1;
      return acc;
    }, {}),

    // Loading and error states
    isLoading: destinationState.loading,
    hasError: !!destinationState.error,
    errorMessage: destinationState.error,
    currentDestination: destinationState.currentDestination
  };

  // Admin helper functions
  const adminHelpers = {
    // Validate destination data before submission
    validateDestinationData: useCallback((data) => {
      const errors = [];

      if (!data.name?.trim()) errors.push('Name is required');
      if (!data.description?.trim()) errors.push('Description is required');
      if (!data.shortDescription?.trim()) errors.push('Short description is required');
      if (!data.country?.trim()) errors.push('Country is required');
      if (!data.state?.trim()) errors.push('State is required');
      if (!data.city?.trim()) errors.push('City is required');
      if (!data.category) errors.push('Category is required');

      // Validate coordinates if provided
      if (data.coordinates?.latitude && (data.coordinates.latitude < -90 || data.coordinates.latitude > 90)) {
        errors.push('Latitude must be between -90 and 90');
      }
      if (data.coordinates?.longitude && (data.coordinates.longitude < -180 || data.coordinates.longitude > 180)) {
        errors.push('Longitude must be between -180 and 180');
      }

      // Validate temperature range
      if (data.climate?.averageTemperature?.min && data.climate?.averageTemperature?.max) {
        if (Number(data.climate.averageTemperature.min) >= Number(data.climate.averageTemperature.max)) {
          errors.push('Minimum temperature must be less than maximum temperature');
        }
      }

      // Validate images
      if (data.images?.length > 0) {
        const primaryImages = data.images.filter(img => img.isPrimary);
        if (primaryImages.length === 0) {
          errors.push('At least one image should be marked as primary');
        }
        if (primaryImages.length > 1) {
          errors.push('Only one image can be marked as primary');
        }
      }

      return {
        isValid: errors.length === 0,
        errors
      };
    }, []),

    // Format destination data for API submission
    formatDestinationData: useCallback((formData) => {
      return {
        ...formData,
        coordinates: {
          latitude: formData.coordinates?.latitude ? Number(formData.coordinates.latitude) : undefined,
          longitude: formData.coordinates?.longitude ? Number(formData.coordinates.longitude) : undefined
        },
        climate: {
          ...formData.climate,
          averageTemperature: {
            min: formData.climate?.averageTemperature?.min ? Number(formData.climate.averageTemperature.min) : undefined,
            max: formData.climate?.averageTemperature?.max ? Number(formData.climate.averageTemperature.max) : undefined
          }
        },
        attractions: formData.attractions?.map(attraction => ({
          ...attraction,
          entryFee: Number(attraction.entryFee) || 0,
          rating: Number(attraction.rating) || 0
        })) || [],
        transportation: {
          ...formData.transportation,
          nearestAirport: {
            ...formData.transportation?.nearestAirport,
            distance: formData.transportation?.nearestAirport?.distance ? Number(formData.transportation.nearestAirport.distance) : undefined
          },
          nearestRailway: {
            ...formData.transportation?.nearestRailway,
            distance: formData.transportation?.nearestRailway?.distance ? Number(formData.transportation.nearestRailway.distance) : undefined
          }
        }
      };
    }, []),

    // Get destination status summary
    getDestinationStatusSummary: useCallback((destination) => {
      const status = [];
      if (destination.isActive) status.push('Active');
      else status.push('Inactive');
      
      if (destination.isFeatured) status.push('Featured');
      if (destination.isPopular) status.push('Popular');
      
      return status.join(', ');
    }, []),

    // Filter destinations by multiple criteria
    filterDestinations: useCallback((destinations, filters) => {
      return destinations.filter(dest => {
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          const matchesSearch = 
            dest.name.toLowerCase().includes(searchLower) ||
            dest.city.toLowerCase().includes(searchLower) ||
            dest.state.toLowerCase().includes(searchLower) ||
            dest.country.toLowerCase().includes(searchLower);
          if (!matchesSearch) return false;
        }

        if (filters.category && dest.category !== filters.category) return false;
        if (filters.country && dest.country !== filters.country) return false;
        if (filters.status) {
          switch (filters.status) {
            case 'active':
              if (!dest.isActive) return false;
              break;
            case 'inactive':
              if (dest.isActive) return false;
              break;
            case 'featured':
              if (!dest.isFeatured) return false;
              break;
            case 'popular':
              if (!dest.isPopular) return false;
              break;
          }
        }

        return true;
      });
    }, [])
  };

  return {
    // State
    ...destinationState,
    
    // Admin actions
    ...adminActions,
    
    // Admin computed values
    ...adminComputed,
    
    // Admin helper functions
    ...adminHelpers
  };
};

export default useAdminDestinations;
