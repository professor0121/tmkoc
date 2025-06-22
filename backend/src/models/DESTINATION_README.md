# Destination Model Documentation

## Overview

The Destination model is a comprehensive MongoDB schema designed for tourism management applications. It handles all aspects of travel destinations including location data, attractions, accommodation, transportation, reviews, and analytics.

## Model Structure

### Core Information
- **name**: Destination name (required, max 100 chars, indexed)
- **description**: Detailed destination description (required, max 3000 chars)
- **shortDescription**: Brief summary (required, max 300 chars)
- **country**: Country name (required, max 50 chars, indexed)
- **state**: State/province name (required, max 50 chars, indexed)
- **city**: City name (required, max 50 chars, indexed)
- **region**: Optional region classification
- **coordinates**: GPS coordinates (latitude/longitude, required)

### Categorization & Classification
- **category**: Destination type (adventure, cultural, religious, wildlife, beach, hill-station, heritage, urban, rural)
- **popularityScore**: Calculated score (0-100) based on ratings and reviews
- **tags**: Array of searchable tags
- **isActive**: Availability status
- **isFeatured**: Featured destination flag
- **isPopular**: Popular destination flag

### Climate Information
```typescript
climate: {
  type: 'tropical' | 'temperate' | 'arid' | 'cold' | 'mediterranean' | 'continental';
  bestVisitMonths: string[]; // Array of month names
  averageTemperature: {
    min: number;
    max: number;
  };
  rainfallPattern: string;
}
```

### Attractions
```typescript
attractions: [{
  name: string;           // Attraction name
  type: string;           // Type of attraction
  description: string;    // Detailed description
  entryFee: number;       // Entry fee (0 if free)
  timings: string;        // Operating hours
  rating: number;         // Rating (0-5)
}]
```

### Accommodation Options
```typescript
accommodation: {
  budget: {
    available: boolean;
    priceRange: { min: number; max: number };
    options: string[];    // Types of budget accommodation
  };
  midRange: {
    available: boolean;
    priceRange: { min: number; max: number };
    options: string[];
  };
  luxury: {
    available: boolean;
    priceRange: { min: number; max: number };
    options: string[];
  };
}
```

### Transportation Details
```typescript
transportation: {
  nearestAirport: {
    name: string;
    code: string;         // Airport code (e.g., DEL, BOM)
    distance: number;     // Distance in kilometers
  };
  nearestRailway: {
    name: string;
    distance: number;
  };
  roadConnectivity: {
    highways: string[];   // Connected highways
    accessibility: 'excellent' | 'good' | 'moderate' | 'poor';
  };
  localTransport: string[]; // Available local transport options
}
```

### Activities & Experiences
- **activities**: Array of available activities
- **cuisine**: Local food specialties and restaurant information
- **shopping**: Markets, special items, and shopping centers

### Safety Information
```typescript
safety: {
  rating: number;         // Safety rating (1-10)
  tips: string[];         // Safety tips for travelers
  emergencyContacts: {
    police: string;
    hospital: string;
    touristHelpline: string;
  };
}
```

### Media & Content
```typescript
images: [{
  url: string;
  alt: string;
  category: 'landscape' | 'attraction' | 'culture' | 'food' | 'accommodation';
  isPrimary: boolean;
}]

videos: [{
  url: string;
  title: string;
  duration: number;       // Duration in seconds
  type: 'promotional' | 'documentary' | 'virtual-tour';
}]
```

### SEO & Metadata
```typescript
seoData: {
  metaTitle: string;      // SEO title (max 60 chars)
  metaDescription: string; // SEO description (max 160 chars)
  keywords: string[];     // SEO keywords
  slug: string;           // URL-friendly slug (unique)
}
```

### Statistics & Analytics
```typescript
statistics: {
  totalVisitors: number;
  averageStayDuration: number; // In days
  peakSeason: string[];        // Peak season months
  offSeason: string[];         // Off-season months
}
```

### Reviews & Ratings
```typescript
reviews: [{
  user: ObjectId;         // Reference to User
  rating: number;         // Rating (1-5)
  comment: string;        // Review comment
  date: Date;             // Review date
  helpful: number;        // Helpfulness count
}]

rating: {
  average: number;        // Average rating (0-5)
  totalReviews: number;   // Total review count
  breakdown: {
    attractions: number;
    accommodation: number;
    food: number;
    transportation: number;
    value: number;
  };
}
```

## Indexes

The model includes several indexes for optimal query performance:

- **Single Field Indexes**: name, country, state, city, category, rating.average, popularityScore, isActive, isFeatured, isPopular, tags
- **Compound Index**: country + state + city for location queries
- **Geospatial Index**: coordinates for location-based searches
- **Text Index**: name, description, shortDescription, city, state, country, tags for full-text search

## Virtual Properties

### fullLocation
Returns formatted location string: "City, State, Country"

### coordinateString
Returns coordinate string: "latitude, longitude"

### bestVisitPeriod
Returns best visit period based on climate data

## Instance Methods

### addReview(userId, rating, comment)
Adds a new review and recalculates average rating.

### updateRating()
Recalculates average rating and popularity score based on reviews.

### getNearbyDestinations(maxDistance)
Returns nearby destinations within specified distance (default 100km).

## Static Methods

### findByCategory(category)
Finds all active destinations in a specific category.

### findFeatured()
Finds all featured active destinations.

### findPopular()
Finds all popular destinations sorted by popularity score.

### searchDestinations(searchText)
Performs full-text search across destination fields.

## Pre-save Middleware

The model includes validation middleware that:
- Generates URL-friendly slug from name if not provided
- Ensures at least one primary image if images exist
- Validates temperature range (min < max)
- Calculates popularity score based on ratings and reviews

## Usage Examples

### Creating a Destination

```typescript
import Destination from './models/Destination';

const newDestination = new Destination({
  name: "Goa Beaches",
  description: "Beautiful coastal destination with pristine beaches...",
  shortDescription: "Tropical beach paradise",
  country: "India",
  state: "Goa",
  city: "Panaji",
  coordinates: { latitude: 15.2993, longitude: 74.1240 },
  category: "beach",
  climate: {
    type: "tropical",
    bestVisitMonths: ["November", "December", "January", "February"],
    averageTemperature: { min: 20, max: 32 },
    rainfallPattern: "Monsoon from June to September"
  },
  // ... other fields
});

await newDestination.save();
```

### Querying Destinations

```typescript
// Find by category
const beachDestinations = await Destination.findByCategory('beach');

// Find featured destinations
const featured = await Destination.findFeatured();

// Text search
const searchResults = await Destination.searchDestinations("himalaya mountains");

// Find nearby destinations
const destination = await Destination.findById(destinationId);
const nearby = await destination.getNearbyDestinations(50); // 50km radius

// Find by location
const goaDestinations = await Destination.find({
  country: "India",
  state: "Goa",
  isActive: true
});
```

### Adding Reviews

```typescript
const destination = await Destination.findById(destinationId);
await destination.addReview(userId, 4, "Amazing place with beautiful beaches!");
```

## API Integration

The Destination model integrates with:
- **DAO Layer**: `destination.dao.ts` for database operations
- **Service Layer**: `destination.service.ts` for business logic
- **Controller Layer**: `destination.controller.ts` for HTTP handling
- **Routes**: `destination.routes.ts` for API endpoints

## Security Considerations

- All user inputs are validated through Mongoose schema
- Coordinate fields have range validation
- Text fields have maximum length limits
- Enum fields restrict values to predefined options
- Review system prevents duplicate reviews from same user

## Performance Optimization

- Indexes on frequently queried fields
- Text search index for full-text search
- Geospatial index for location-based queries
- Compound indexes for complex queries
- Virtual properties for computed values
- Efficient pagination support

## Future Enhancements

Potential areas for extension:
- Multi-language support for descriptions
- Weather API integration for real-time data
- Integration with booking systems
- Advanced analytics and reporting
- Machine learning for recommendations
- Social media integration
- Photo gallery management with cloud storage
