# TMKOC Tourism Backend

A comprehensive Node.js backend application for tourism management built with Express.js, TypeScript, and MongoDB.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based auth with role management
- **Package Management**: Complete CRUD operations for travel packages
- **Destination Management**: Comprehensive destination database with reviews and ratings
- **MongoDB Integration**: Robust database operations with Mongoose
- **TypeScript Support**: Full type safety and better development experience
- **Middleware**: Authentication, validation, and error handling
- **API Documentation**: Well-documented RESTful APIs
- **Advanced Search**: Text search with filters and geospatial queries
- **Review System**: User reviews and ratings for destinations and packages
- **Analytics**: Statistics and insights for business intelligence

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── package.controller.ts
│   │   └── destination.controller.ts
│   ├── dao/              # Data Access Objects
│   │   ├── auth.dao.ts
│   │   ├── package.dao.ts
│   │   └── destination.dao.ts
│   ├── middleware/       # Custom middleware
│   │   ├── auth.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models/           # MongoDB schemas
│   │   ├── User.ts
│   │   ├── Package.ts
│   │   └── Destination.ts
│   ├── routes/           # API routes
│   │   ├── auth.routes.ts
│   │   ├── package.routes.ts
│   │   └── destination.routes.ts
│   ├── services/         # Business logic
│   │   ├── auth.service.ts
│   │   ├── package.service.ts
│   │   └── destination.service.ts
│   ├── types/            # TypeScript interfaces
│   │   ├── auth.interface.ts
│   │   ├── package.interface.ts
│   │   └── destination.interface.ts
│   ├── utils/            # Utility functions
│   └── app.ts            # Express app configuration
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
- `GET /api/packages` - Get all packages with filters
- `GET /api/packages/search` - Search packages
- `GET /api/packages/featured` - Get featured packages
- `GET /api/packages/popular` - Get popular packages
- `GET /api/packages/category/:category` - Get packages by category
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create package (admin)
- `PUT /api/packages/:id` - Update package (admin)
- `DELETE /api/packages/:id` - Delete package (admin)

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
