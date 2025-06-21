# Package Model Documentation

## Overview

The Package model is a comprehensive MongoDB schema designed for tourism management applications. It handles all aspects of travel packages including pricing, itineraries, availability, and booking management.

## Model Structure

### Core Fields

- **title**: Package name (required, max 100 chars)
- **description**: Detailed package description (required, max 2000 chars)
- **shortDescription**: Brief summary (required, max 200 chars)
- **destination**: Primary destination (required, max 100 chars)

### Duration & Pricing

```typescript
duration: {
  days: number;    // Trip duration in days
  nights: number;  // Number of nights
}

price: {
  adult: number;   // Price per adult
  child: number;   // Price per child
  infant: number;  // Price per infant (default: 0)
}
```

### Group Management

```typescript
groupSize: {
  min: number;     // Minimum group size
  max: number;     // Maximum group size
}
```

### Classification

- **category**: Package type (adventure, cultural, religious, wildlife, beach, hill-station, heritage, honeymoon, family, business)
- **difficulty**: Difficulty level (easy, moderate, challenging, extreme)
- **tags**: Array of searchable tags

### Itinerary

```typescript
itinerary: [{
  day: number;           // Day number
  title: string;         // Day title
  description: string;   // Day description
  activities: string[];  // List of activities
  meals: string[];       // Included meals
  accommodation?: string; // Optional accommodation info
}]
```

### Location & Geography

```typescript
location: {
  country: string;
  state: string;
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }
}
```

### Availability Management

```typescript
availability: [{
  startDate: Date;        // Available from
  endDate: Date;          // Available until
  isAvailable: boolean;   // Availability status
  maxBookings: number;    // Maximum bookings allowed
  currentBookings: number; // Current booking count
}]
```

### Services & Inclusions

- **inclusions**: Array of included services
- **exclusions**: Array of excluded services
- **features**: Array of package features

### Service Details

```typescript
transportation: {
  included: boolean;
  type: string[];        // Types of transport
  details: string;       // Additional details
}

accommodation: {
  type: string;          // Hotel type/category
  rating: number;        // Star rating (1-5)
  details: string;       // Additional details
}

meals: {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  details: string;       // Meal details
}

guide: {
  included: boolean;
  language: string[];    // Supported languages
  type: 'local' | 'professional' | 'expert';
}
```

### Policies & Rating

```typescript
cancellationPolicy: {
  refundable: boolean;
  cancellationDeadline: number; // Days before trip
  refundPercentage: number;     // Refund percentage (0-100)
  terms: string;                // Policy terms
}

rating: {
  average: number;       // Average rating (0-5)
  totalReviews: number;  // Total review count
}
```

### Media

```typescript
images: [{
  url: string;           // Image URL
  alt: string;           // Alt text
  isPrimary: boolean;    // Primary image flag
}]
```

### Status & Metadata

- **isActive**: Package availability status
- **isFeatured**: Featured package flag
- **createdBy**: User who created the package
- **updatedBy**: User who last updated the package
- **createdAt**: Creation timestamp (auto)
- **updatedAt**: Last update timestamp (auto)

## Indexes

The model includes several indexes for optimal query performance:

- **Single Field Indexes**: destination, category, price.adult, rating.average, isActive, isFeatured, tags
- **Compound Index**: location (country, state, city)
- **Text Index**: title, description, destination, tags (for search functionality)

## Virtual Properties

### totalDuration
Returns formatted duration string: "X Days / Y Nights"

### priceRange
Returns price range string: "₹X" or "₹X - ₹Y"

## Instance Methods

### isAvailableForDates(startDate, endDate)
Checks if package is available for specific date range.

### getAvailableSlots()
Returns array of available booking slots.

## Static Methods

### findByCategory(category)
Finds all active packages in a specific category.

### findFeatured()
Finds all featured active packages.

## Pre-save Middleware

The model includes validation middleware that:
- Ensures min group size ≤ max group size
- Validates that nights < days
- Sets first image as primary if none specified

## Usage Examples

### Creating a Package

```typescript
import Package from './models/Package';

const newPackage = new Package({
  title: "Golden Triangle Tour",
  description: "Explore Delhi, Agra, and Jaipur...",
  shortDescription: "3-city cultural tour",
  destination: "Delhi, Agra, Jaipur",
  duration: { days: 6, nights: 5 },
  price: { adult: 25000, child: 18000, infant: 0 },
  groupSize: { min: 2, max: 15 },
  category: "cultural",
  difficulty: "easy",
  // ... other fields
});

await newPackage.save();
```

### Querying Packages

```typescript
// Find by category
const adventurePackages = await Package.findByCategory('adventure');

// Find featured packages
const featured = await Package.findFeatured();

// Text search
const searchResults = await Package.find({
  $text: { $search: "himalaya trek" }
});

// Filter by price range
const budgetPackages = await Package.find({
  'price.adult': { $gte: 10000, $lte: 30000 },
  isActive: true
});
```

### Checking Availability

```typescript
const package = await Package.findById(packageId);
const isAvailable = package.isAvailableForDates(
  new Date('2024-07-01'),
  new Date('2024-07-07')
);
```

## API Integration

The Package model integrates with:
- **DAO Layer**: `package.dao.ts` for database operations
- **Service Layer**: `package.service.ts` for business logic
- **Controller Layer**: `package.controller.ts` for HTTP handling
- **Routes**: `package.routes.ts` for API endpoints

## Security Considerations

- All user inputs are validated through Mongoose schema
- Price fields have minimum value constraints
- Text fields have maximum length limits
- Enum fields restrict values to predefined options
- Coordinates are validated within valid ranges

## Performance Optimization

- Indexes on frequently queried fields
- Text search index for full-text search
- Compound indexes for location-based queries
- Virtual properties for computed values
- Efficient pagination support

## Future Enhancements

Potential areas for extension:
- Multi-language support
- Dynamic pricing based on demand
- Integration with booking system
- Review and rating system
- Photo gallery management
- SEO optimization fields
