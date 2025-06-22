# TMKOC Tourism API Documentation

## Overview

The TMKOC Tourism API provides comprehensive endpoints for managing tourism operations including user authentication, package management, and destination information.

**Base URL**: `http://localhost:3000/api`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow a consistent format:

```json
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "error": string (only on errors)
}
```

## Error Handling

HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

#### Login User
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /api/auth/me
```
*Requires authentication*

#### Logout User
```
GET /api/auth/logout
```
*Requires authentication*

### Package Endpoints

#### Get All Packages
```
GET /api/packages
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `difficulty`: Filter by difficulty
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `destination`: Filter by destination
- `sort`: Sort by (price, duration, rating, createdAt)

**Example:**
```
GET /api/packages?category=adventure&minPrice=10000&sort=price
```

#### Search Packages
```
GET /api/packages/search?q=himalaya
```

#### Get Featured Packages
```
GET /api/packages/featured
```

#### Get Popular Packages
```
GET /api/packages/popular
```

#### Get Packages by Category
```
GET /api/packages/category/:category
```

#### Get Package by ID
```
GET /api/packages/:id
```

#### Create Package (Admin Only)
```
POST /api/packages
```
*Requires admin authentication*

**Request Body:**
```json
{
  "title": "Himalayan Adventure",
  "description": "Explore the majestic Himalayas...",
  "shortDescription": "7-day Himalayan trek",
  "destination": "Himalayas",
  "price": {
    "adult": 25000,
    "child": 15000,
    "infant": 0
  },
  "duration": {
    "days": 7,
    "nights": 6
  },
  "groupSize": {
    "min": 4,
    "max": 15
  },
  "category": "adventure",
  "difficulty": "moderate",
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Base Camp",
      "description": "Check-in and orientation",
      "activities": ["Check-in", "Orientation", "Equipment check"],
      "meals": ["Dinner"]
    }
  ],
  "inclusions": ["Accommodation", "Meals", "Guide"],
  "exclusions": ["Personal expenses", "Insurance"]
}
```

#### Update Package (Admin Only)
```
PUT /api/packages/:id
```
*Requires admin authentication*

#### Delete Package (Admin Only)
```
DELETE /api/packages/:id
```
*Requires admin authentication*

### Destination Endpoints

#### Get All Destinations
```
GET /api/destinations
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `country`: Filter by country
- `state`: Filter by state
- `city`: Filter by city
- `climateType`: Filter by climate type
- `minRating`: Minimum rating filter
- `maxRating`: Maximum rating filter
- `tags`: Filter by tags (array)
- `isPopular`: Filter popular destinations
- `isFeatured`: Filter featured destinations
- `sort`: Sort by (rating, popularity, name, createdAt)

**Example:**
```
GET /api/destinations?category=beach&country=India&minRating=4&sort=rating
```

#### Search Destinations
```
GET /api/destinations/search?q=goa beaches
```

#### Get Featured Destinations
```
GET /api/destinations/featured
```

#### Get Popular Destinations
```
GET /api/destinations/popular
```

#### Get Destination Statistics
```
GET /api/destinations/statistics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalDestinations": 150,
    "featuredDestinations": 25,
    "popularDestinations": 40,
    "categoryDistribution": [
      { "category": "beach", "count": 30 },
      { "category": "adventure", "count": 25 }
    ],
    "topCountries": [
      { "_id": "India", "count": 80 },
      { "_id": "Nepal", "count": 20 }
    ]
  }
}
```

#### Get Destinations by Location
```
GET /api/destinations/location?country=India&state=Goa
```

#### Get Destinations by Category
```
GET /api/destinations/category/:category
```

#### Get Destination by ID
```
GET /api/destinations/:id
```

#### Get Nearby Destinations
```
GET /api/destinations/:id/nearby?maxDistance=100
```

#### Create Destination (Admin Only)
```
POST /api/destinations
```
*Requires admin authentication*

**Request Body:**
```json
{
  "name": "Goa Beaches",
  "description": "Beautiful coastal destination with pristine beaches...",
  "shortDescription": "Tropical beach paradise",
  "country": "India",
  "state": "Goa",
  "city": "Panaji",
  "coordinates": {
    "latitude": 15.2993,
    "longitude": 74.1240
  },
  "category": "beach",
  "climate": {
    "type": "tropical",
    "bestVisitMonths": ["November", "December", "January", "February"],
    "averageTemperature": {
      "min": 20,
      "max": 32
    },
    "rainfallPattern": "Monsoon from June to September"
  },
  "attractions": [
    {
      "name": "Baga Beach",
      "type": "Beach",
      "description": "Popular beach with water sports",
      "entryFee": 0,
      "timings": "24 hours",
      "rating": 4.5
    }
  ],
  "accommodation": {
    "budget": {
      "available": true,
      "priceRange": { "min": 1000, "max": 3000 },
      "options": ["Hostels", "Guest houses"]
    },
    "midRange": {
      "available": true,
      "priceRange": { "min": 3000, "max": 8000 },
      "options": ["Hotels", "Resorts"]
    },
    "luxury": {
      "available": true,
      "priceRange": { "min": 8000, "max": 25000 },
      "options": ["5-star hotels", "Luxury resorts"]
    }
  },
  "transportation": {
    "nearestAirport": {
      "name": "Goa International Airport",
      "code": "GOI",
      "distance": 30
    },
    "nearestRailway": {
      "name": "Madgaon Railway Station",
      "distance": 15
    },
    "roadConnectivity": {
      "highways": ["NH-66"],
      "accessibility": "excellent"
    },
    "localTransport": ["Taxi", "Bus", "Bike rental"]
  },
  "activities": ["Beach activities", "Water sports", "Nightlife", "Sightseeing"],
  "tags": ["beach", "tropical", "nightlife", "water sports"]
}
```

#### Update Destination (Admin Only)
```
PUT /api/destinations/:id
```
*Requires admin authentication*

#### Delete Destination (Admin Only)
```
DELETE /api/destinations/:id
```
*Requires admin authentication*

#### Add Review to Destination
```
POST /api/destinations/:id/reviews
```
*Requires authentication*

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Amazing place with beautiful beaches and great food!"
}
```

#### Toggle Featured Status (Admin Only)
```
PATCH /api/destinations/:id/featured
```
*Requires admin authentication*

**Request Body:**
```json
{
  "featured": true
}
```

## Advanced Features

### Geospatial Queries

Find destinations within a specific area:
```
GET /api/destinations?bounds={"northEast":{"lat":20,"lng":80},"southWest":{"lat":10,"lng":70}}
```

### Full-Text Search

Search across multiple fields:
```
GET /api/destinations/search?q=himalaya mountain adventure
```

### Pagination

All list endpoints support pagination:
```json
{
  "success": true,
  "data": {
    "destinations": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- Authentication endpoints: 5 requests per minute
- General endpoints: 100 requests per minute
- Search endpoints: 20 requests per minute

## CORS

Cross-Origin Resource Sharing (CORS) is enabled for frontend integration.

## Development Tools

### Postman Collection
Import the provided Postman collection for easy API testing.

### API Testing
Use the provided test scripts to validate API functionality.

### Environment Variables
Configure the following environment variables:
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `JWT_EXPIRE`: JWT expiration time

## Support

For API support and questions:
- Email: support@tmkoctourism.com
- Documentation: [API Docs](http://localhost:3000/api-docs)
- GitHub Issues: [Repository Issues](https://github.com/tmkoc/tourism-backend/issues)
