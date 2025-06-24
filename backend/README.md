# TMKOC Tourism Backend

A comprehensive Node.js backend application for tourism management built with Express.js, TypeScript, and MongoDB. This backend powers a full-featured tourism platform with advanced booking capabilities, content management, and analytics.

## 🚀 Features

### Core Features
- **User Authentication & Authorization**: JWT-based auth with role-based access control
- **Package Management**: Complete CRUD operations for travel packages with advanced filtering
- **Destination Management**: Comprehensive destination database with reviews, ratings, and geospatial queries
- **Booking System**: Full booking lifecycle management with payment processing
- **Blog Management**: Content management system with SEO optimization and rich media support
- **MongoDB Integration**: Robust database operations with Mongoose ODM and optimized indexing
- **TypeScript Support**: Full type safety and better development experience
- **Middleware**: Authentication, validation, error handling, and rate limiting
- **API Documentation**: Well-documented RESTful APIs with comprehensive examples
- **Advanced Search**: Full-text search with filters, geospatial queries, and pagination
- **Review System**: User reviews and ratings for destinations, packages, and blogs
- **Analytics**: Statistics and insights for business intelligence and reporting

### Advanced Features
- **Geospatial Queries**: Location-based searches and nearby destination finding
- **Dynamic Pricing**: Real-time price calculation with taxes, fees, and discounts
- **Multi-Traveler Support**: Booking system supporting adults, children, and infants
- **SEO Optimization**: URL slugs, meta tags, and search engine friendly content
- **File Upload**: Image and media management for destinations and packages
- **Email Integration**: Booking confirmations and notifications
- **Data Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Centralized error handling with detailed logging
- **Security**: Password hashing, CORS protection, and input sanitization

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.ts   # MongoDB connection setup
│   │   └── cookieConfig.ts
│   ├── controllers/      # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── package.controller.ts
│   │   ├── destination.controller.ts
│   │   ├── booking.controller.ts
│   │   └── blog.controller.ts
│   ├── dao/             # Data Access Objects
│   │   ├── auth.dao.ts
│   │   ├── package.dao.ts
│   │   ├── destination.dao.ts
│   │   ├── booking.dao.ts
│   │   └── blog.dao.ts
│   ├── middleware/      # Custom middleware
│   │   ├── auth.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models/          # MongoDB schemas
│   │   ├── User.ts
│   │   ├── Package.ts
│   │   ├── Destination.ts
│   │   ├── Booking.ts
│   │   └── Blog.ts
│   ├── routes/          # API routes
│   │   ├── auth.routes.ts
│   │   ├── package.routes.ts
│   │   ├── destination.routes.ts
│   │   ├── booking.routes.ts
│   │   └── blog.routes.ts
│   ├── services/        # Business logic
│   │   ├── auth.service.ts
│   │   ├── package.service.ts
│   │   ├── destination.service.ts
│   │   ├── booking.service.ts
│   │   └── blog.service.ts
│   ├── types/           # TypeScript interfaces
│   │   ├── auth.interface.ts
│   │   ├── package.interface.ts
│   │   ├── destination.interface.ts
│   │   ├── booking.interface.ts
│   │   └── blog.interface.ts
│   ├── utils/           # Utility functions
│   │   ├── validation.ts
│   │   ├── helpers.ts
│   │   └── constants.ts
│   ├── app.ts           # Express app configuration
│   └── index.ts         # Application entry point
├── docs/                # Additional documentation
├── tests/               # Test files
├── API_DOCUMENTATION.md # Complete API documentation
├── README_BOOKING_SYSTEM.md # Booking system documentation
├── package.json
└── README.md
```

## 🔧 Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Packages
- `GET /api/packages` - Get all packages with filters and pagination
- `GET /api/packages/search` - Search packages by text
- `GET /api/packages/featured` - Get featured packages
- `GET /api/packages/popular` - Get popular packages
- `GET /api/packages/category/:category` - Get packages by category
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create package (admin only)
- `PUT /api/packages/:id` - Update package (admin only)
- `DELETE /api/packages/:id` - Delete package (admin only)

### Destinations
- `GET /api/destinations` - Get all destinations with filters
- `GET /api/destinations/search` - Search destinations
- `GET /api/destinations/featured` - Get featured destinations
- `GET /api/destinations/popular` - Get popular destinations
- `GET /api/destinations/statistics` - Get destination statistics
- `GET /api/destinations/location` - Get destinations by location
- `GET /api/destinations/category/:category` - Get destinations by category
- `GET /api/destinations/:id` - Get destination by ID
- `GET /api/destinations/:id/nearby` - Get nearby destinations
- `POST /api/destinations` - Create destination (admin)
- `PUT /api/destinations/:id` - Update destination (admin)
- `DELETE /api/destinations/:id` - Delete destination (admin)
- `POST /api/destinations/:id/reviews` - Add review (authenticated)

### Bookings
- `GET /api/bookings` - Get user bookings (authenticated)
- `GET /api/bookings/:id` - Get booking by ID (authenticated)
- `POST /api/bookings` - Create new booking (authenticated)
- `PUT /api/bookings/:id` - Update booking (authenticated)
- `DELETE /api/bookings/:id` - Cancel booking (authenticated)
- `POST /api/bookings/:id/payment` - Process payment (authenticated)
- `GET /api/bookings/admin/all` - Get all bookings (admin only)
- `GET /api/bookings/admin/statistics` - Get booking statistics (admin only)

### Blogs
- `GET /api/blogs/public` - Get published blogs with pagination
- `GET /api/blogs/public/:slug` - Get blog by slug
- `GET /api/blogs/public/:id/related` - Get related blogs
- `POST /api/blogs/public/:id/like` - Like a blog post
- `GET /api/blogs/categories` - Get blog categories with counts
- `GET /api/blogs/tags/popular` - Get popular tags
- `POST /api/blogs` - Create blog (admin only)
- `PUT /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)
- `GET /api/blogs/admin/all` - Get all blogs including drafts (admin only)

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📚 Key Technologies

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Geospatial indexing for location-based queries

## 🗄️ Database Models

### User Model
- Authentication and user management
- Role-based access control (user/admin)
- Profile information and preferences

### Package Model
- Travel package information
- Pricing and duration details
- Itinerary and inclusions
- Availability management
- Rating and review system

### Destination Model
- Comprehensive destination information
- Climate and weather data
- Attractions and activities
- Accommodation options
- Transportation details
- Safety information
- User reviews and ratings
- Geospatial coordinates for location queries

## 🔍 Advanced Features

### Search & Filtering
- Full-text search across multiple fields
- Category-based filtering
- Location-based queries
- Price range filtering
- Rating-based filtering
- Date availability filtering

### Geospatial Queries
- Find nearby destinations
- Distance-based searches
- Coordinate-based filtering
- Location bounds queries

### Analytics & Statistics
- Package and destination statistics
- User engagement metrics
- Popular destinations tracking
- Trending analysis
- Review sentiment analysis

### Review System
- User reviews for destinations and packages
- Rating aggregation
- Review helpfulness tracking
- Moderation capabilities

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start MongoDB service
5. Run development server: `npm run dev`

## 📖 API Documentation

Detailed API documentation is available in the `/docs` folder or through the interactive API explorer when running the development server.

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
