# Models Overview - TMKOC Tourism Backend

This directory contains MongoDB models for the TMKOC Tourism application, providing comprehensive data management for tourism operations.

## Available Models

### 1. User Model (`User.ts`)
**Purpose**: Handles user authentication and profile management.

**Key Features:**
- User registration and authentication
- Role-based access control (user/admin)
- Profile information management
- Password hashing with bcrypt
- JWT token generation

**Core Fields:**
- `name`: User's full name
- `email`: Unique email address (indexed)
- `password`: Hashed password
- `role`: User role (user/admin)
- `isActive`: Account status
- `createdAt/updatedAt`: Timestamps

**Usage:**
```typescript
const user = new User({
  name: "John Doe",
  email: "john@example.com",
  password: "hashedPassword",
  role: "user"
});
```

### 2. Package Model (`Package.ts`)
**Purpose**: Manages travel packages and tour offerings.

**Key Features:**
- Complete package information with pricing
- Duration and group size management
- Detailed itinerary planning
- Availability tracking
- Image and media management
- Review and rating system

**Core Fields:**
- `title`: Package name
- `description`: Detailed description
- `price`: Pricing structure (adult/child/infant)
- `duration`: Days and nights
- `groupSize`: Min/max group size
- `category`: Package type
- `difficulty`: Difficulty level
- `itinerary`: Day-wise activities
- `availability`: Date-based availability
- `location`: Geographic information
- `inclusions/exclusions`: Service details

**Usage:**
```typescript
const package = new Package({
  title: "Himalayan Adventure",
  description: "Explore the majestic Himalayas",
  price: { adult: 25000, child: 15000, infant: 0 },
  duration: { days: 7, nights: 6 },
  category: "adventure"
});
```

### 3. Destination Model (`Destination.ts`)
**Purpose**: Comprehensive destination management with detailed information.

**Key Features:**
- Complete destination information
- Climate and weather data
- Attractions and activities management
- Accommodation options (budget/mid-range/luxury)
- Transportation details
- Safety information and emergency contacts
- User reviews and ratings system
- Geospatial coordinates for location queries
- SEO optimization with metadata
- Analytics and visitor statistics

**Core Fields:**
- `name`: Destination name (indexed)
- `description/shortDescription`: Content
- `country/state/city`: Location hierarchy (indexed)
- `coordinates`: GPS coordinates (geospatial index)
- `category`: Destination type (adventure, cultural, religious, etc.)
- `climate`: Weather and best visit times
- `attractions`: Array of attractions with details
- `accommodation`: Pricing and options by category
- `transportation`: Airport, railway, road connectivity
- `activities`: Available experiences
- `cuisine`: Local food and restaurants
- `shopping`: Markets and specialties
- `safety`: Rating and emergency contacts
- `images/videos`: Media content with categorization
- `reviews`: User reviews and ratings
- `rating`: Aggregated rating data
- `statistics`: Visitor and engagement data
- `seoData`: SEO metadata and URL slug

**Advanced Features:**
- Full-text search across multiple fields
- Geospatial queries for nearby destinations
- Review system with rating aggregation
- Popularity scoring algorithm
- Virtual properties for computed values
- Instance methods for business logic
- Static methods for common queries

**Usage:**
```typescript
const destination = new Destination({
  name: "Goa Beaches",
  description: "Beautiful coastal destination...",
  country: "India",
  state: "Goa",
  city: "Panaji",
  coordinates: { latitude: 15.2993, longitude: 74.1240 },
  category: "beach",
  climate: {
    type: "tropical",
    bestVisitMonths: ["November", "December", "January"],
    averageTemperature: { min: 20, max: 32 }
  }
});
```

## Model Relationships

```
User (1) -----> (N) Reviews -----> (1) Destination
User (1) -----> (N) Bookings -----> (1) Package
Package (N) -----> (N) Destinations
Admin Users -----> Create/Manage Packages & Destinations
```

**Relationship Details:**
- Users can review multiple destinations and packages
- Users can book multiple packages
- Packages can include multiple destinations
- Admin users manage packages and destinations
- Reviews link users to destinations/packages with ratings

## Database Indexes

### User Model
- Unique index on `email`
- Index on `role` for role-based queries
- Index on `isActive` for active user queries

### Package Model
- Index on `title` for search
- Index on `category` for category filtering
- Index on `difficulty` for difficulty filtering
- Compound index on `location.country`, `location.state`
- Index on `isActive` for availability
- Text index on `title`, `description`, `destination`

### Destination Model
- Index on `name` for search
- Compound index on `country`, `state`, `city`
- Index on `category` for category filtering
- Index on `rating.average` for rating-based sorting
- Index on `popularityScore` for popularity sorting
- Index on `isActive`, `isFeatured`, `isPopular`
- Geospatial index on `coordinates` for location queries
- Text index on multiple fields for full-text search

## Validation Rules

### Common Validations
- Required field validation
- Data type validation
- String length limits
- Enum value validation
- Custom business logic validation

### Specific Validations
- **Email**: Unique and valid format
- **Coordinates**: Valid latitude (-90 to 90) and longitude (-180 to 180)
- **Ratings**: Range validation (1-5 for reviews, 0-5 for averages)
- **Prices**: Non-negative numbers
- **Dates**: Valid date formats and logical date ranges
- **Temperature**: Min temperature < Max temperature

## Performance Optimizations

### Indexing Strategy
- Strategic indexes on frequently queried fields
- Compound indexes for complex queries
- Text indexes for search functionality
- Geospatial indexes for location-based queries

### Query Optimization
- Efficient aggregation pipelines
- Pagination support for large datasets
- Virtual properties for computed values
- Selective field projection

### Caching Considerations
- Frequently accessed destination data
- Popular package listings
- User session data
- Search results caching

## API Integration

Each model integrates with a complete API stack:

### Data Access Layer (DAO)
- `user.dao.ts`: Database operations for users
- `package.dao.ts`: Database operations for packages
- `destination.dao.ts`: Database operations for destinations

### Service Layer
- `user.service.ts`: Business logic for user operations
- `package.service.ts`: Business logic for package operations
- `destination.service.ts`: Business logic for destination operations

### Controller Layer
- `user.controller.ts`: HTTP request handling for users
- `package.controller.ts`: HTTP request handling for packages
- `destination.controller.ts`: HTTP request handling for destinations

### Route Layer
- `user.routes.ts`: API endpoints for user operations
- `package.routes.ts`: API endpoints for package operations
- `destination.routes.ts`: API endpoints for destination operations

## Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Session management

### Data Protection
- Input validation and sanitization
- SQL injection prevention (NoSQL injection)
- XSS protection through validation
- Rate limiting considerations

### Privacy
- User data protection
- Review anonymization options
- GDPR compliance considerations

## Development Guidelines

### Model Creation
1. Define TypeScript interfaces first
2. Create Mongoose schema with validation
3. Add appropriate indexes
4. Implement virtual properties and methods
5. Add pre/post middleware as needed
6. Create comprehensive tests

### Best Practices
- Use descriptive field names
- Implement proper validation
- Add helpful error messages
- Use appropriate data types
- Consider performance implications
- Document complex business logic

### Testing
- Unit tests for model methods
- Integration tests for database operations
- Validation testing
- Performance testing for large datasets

## Future Enhancements

### Planned Features
- Multi-language support for content
- Advanced analytics and reporting
- Machine learning for recommendations
- Real-time notifications
- Integration with external APIs (weather, maps)
- Advanced search with filters
- Social features and user interactions

### Scalability Considerations
- Database sharding strategies
- Read replicas for performance
- Caching layers
- CDN integration for media
- Microservices architecture migration
