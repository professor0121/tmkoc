# Destinations Redux Slice & API

This directory contains the Redux slice and API functions for managing destinations in the TMKOC travel application.

## Files Structure

```
destinations/
├── destinationApi.js      # API functions for backend communication
├── destinationSlice.js    # Redux slice with actions and reducers
└── README.md             # This documentation file
```

## API Functions (`destinationApi.js`)

### Public API Functions

- `getAllDestinationsAPI(params)` - Get all destinations with optional filters
- `getDestinationByIdAPI(id)` - Get a specific destination by ID
- `getDestinationsByCategoryAPI(category)` - Get destinations by category
- `getFeaturedDestinationsAPI()` - Get featured destinations
- `getPopularDestinationsAPI()` - Get popular destinations
- `searchDestinationsAPI(searchText)` - Search destinations by text
- `getDestinationsByLocationAPI(locationParams)` - Get destinations by location
- `getNearbyDestinationsAPI(destinationId, maxDistance)` - Get nearby destinations
- `getDestinationStatisticsAPI()` - Get destination statistics

### Protected API Functions (Require Authentication)

- `addDestinationReviewAPI(destinationId, reviewData)` - Add a review to destination

### Admin API Functions (Require Admin Role)

- `createDestinationAPI(destinationData)` - Create new destination
- `updateDestinationAPI(id, destinationData)` - Update destination
- `deleteDestinationAPI(id)` - Delete destination (soft delete)
- `toggleFeaturedStatusAPI(id, featured)` - Toggle featured status

## Redux Slice (`destinationSlice.js`)

### State Structure

```javascript
{
  destinations: [],           // All destinations
  currentDestination: null,   // Currently selected destination
  featuredDestinations: [],   // Featured destinations
  popularDestinations: [],    // Popular destinations
  searchResults: [],          // Search results
  nearbyDestinations: [],     // Nearby destinations
  statistics: null,           // Destination statistics
  loading: false,             // Loading state
  error: null,                // Error message
  filters: {                  // Current filters
    category: '',
    location: '',
    searchText: ''
  },
  pagination: {               // Pagination info
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  }
}
```

### Async Thunks

All API functions have corresponding async thunks:

- `getAllDestinations(params)`
- `getDestinationById(id)`
- `getDestinationsByCategory(category)`
- `getFeaturedDestinations()`
- `getPopularDestinations()`
- `searchDestinations(searchText)`
- `getDestinationsByLocation(locationParams)`
- `getNearbyDestinations({ destinationId, maxDistance })`
- `getDestinationStatistics()`
- `createDestination(destinationData)`
- `updateDestination({ id, destinationData })`
- `deleteDestination(id)`
- `addDestinationReview({ destinationId, reviewData })`
- `toggleFeaturedStatus({ id, featured })`

### Synchronous Actions

- `clearError()` - Clear error state
- `clearCurrentDestination()` - Clear current destination
- `clearSearchResults()` - Clear search results
- `setFilters(filters)` - Set filters
- `clearFilters()` - Clear all filters
- `setPagination(pagination)` - Set pagination

## Usage Examples

### Basic Usage in Component

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDestinations, getFeaturedDestinations } from '../redux/destinations/destinationSlice';

const DestinationsComponent = () => {
  const dispatch = useDispatch();
  const { destinations, featuredDestinations, loading, error } = useSelector(
    (state) => state.destinations
  );

  useEffect(() => {
    dispatch(getAllDestinations());
    dispatch(getFeaturedDestinations());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>All Destinations ({destinations.length})</h2>
      <h2>Featured Destinations ({featuredDestinations.length})</h2>
    </div>
  );
};
```

### Using the Custom Hook

```javascript
import React, { useEffect } from 'react';
import { useDestinations } from '../hooks/useDestinations';

const DestinationsWithHook = () => {
  const {
    destinations,
    featuredDestinations,
    isLoading,
    hasError,
    error,
    getAllDestinations,
    getFeaturedDestinations,
    clearError
  } = useDestinations();

  useEffect(() => {
    getAllDestinations();
    getFeaturedDestinations();
  }, [getAllDestinations, getFeaturedDestinations]);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error: {error} <button onClick={clearError}>×</button></div>;

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};
```

### Search and Filter

```javascript
const SearchComponent = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    if (searchText) {
      dispatch(searchDestinations(searchText));
    }
  };

  const handleCategoryFilter = (selectedCategory) => {
    setCategory(selectedCategory);
    dispatch(getDestinationsByCategory(selectedCategory));
  };

  return (
    <div>
      <input 
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search destinations..."
      />
      <button onClick={handleSearch}>Search</button>
      
      <select value={category} onChange={(e) => handleCategoryFilter(e.target.value)}>
        <option value="">All Categories</option>
        <option value="beach">Beach</option>
        <option value="mountain">Mountain</option>
        {/* More categories */}
      </select>
    </div>
  );
};
```

### Adding a Review

```javascript
const ReviewComponent = ({ destinationId }) => {
  const dispatch = useDispatch();
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDestinationReview({ destinationId, reviewData }));
    setReviewData({ rating: 5, comment: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select 
        value={reviewData.rating}
        onChange={(e) => setReviewData({...reviewData, rating: parseInt(e.target.value)})}
      >
        {[5,4,3,2,1].map(rating => (
          <option key={rating} value={rating}>{rating} Stars</option>
        ))}
      </select>
      
      <textarea
        value={reviewData.comment}
        onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
        placeholder="Write your review..."
        required
      />
      
      <button type="submit">Submit Review</button>
    </form>
  );
};
```

## Error Handling

All async thunks automatically handle errors and store them in the `error` state. You can clear errors using the `clearError` action:

```javascript
const { error, clearError } = useSelector(state => state.destinations);

if (error) {
  return (
    <div className="error-message">
      {error}
      <button onClick={() => dispatch(clearError())}>×</button>
    </div>
  );
}
```

## Loading States

The `loading` state is automatically managed for all async operations:

```javascript
const { loading } = useSelector(state => state.destinations);

if (loading) {
  return <div className="spinner">Loading...</div>;
}
```

## Integration with Backend

Make sure your backend is running on `http://localhost:3000` (or update the `baseURL` in `axiosInstance.js`) and that the destination routes are properly configured.

The API expects the following response formats:

- List endpoints: `{ destinations: [...], pagination?: {...} }`
- Single destination: `{ destination: {...} }`
- Statistics: `{ statistics: {...} }`

## Categories

Available destination categories:
- `adventure`
- `cultural`
- `religious`
- `wildlife`
- `beach`
- `hill-station`
- `heritage`
- `urban`
- `rural`
