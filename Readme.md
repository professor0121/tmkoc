# TMKOC Tourism Management System

A comprehensive full-stack tourism management application built with modern technologies, featuring a robust Node.js/Express.js backend with TypeScript and a React.js frontend with Redux Toolkit.

## 🚀 Features

### Backend Features
- **Authentication System**: JWT-based authentication with secure HTTP-only cookies
- **Role-Based Access Control**: Admin and user role management with middleware protection
- **Package Management**: Complete CRUD operations for travel packages with advanced filtering
- **Destination Management**: Comprehensive destination database with reviews, ratings, and geospatial queries
- **Booking System**: Full booking lifecycle management with payment integration
- **Blog Management**: Content management system with SEO optimization and rich media support
- **Advanced Search**: Full-text search with filters, geospatial queries, and pagination
- **Review System**: User reviews and ratings for destinations, packages, and blogs
- **Analytics**: Statistics and insights for business intelligence and reporting
- **Security**: Password hashing, input validation, CSRF protection, and rate limiting
- **Database**: MongoDB with Mongoose ODM, optimized indexing, and data validation
- **TypeScript**: Full TypeScript support for type safety and better development experience
- **Modular Architecture**: Clean separation of concerns with layered architecture (Controllers, Services, DAOs)

### Frontend Features
- **Modern React**: Built with React 18, Vite, and modern hooks
- **State Management**: Redux Toolkit for efficient global state management
- **Authentication**: Complete auth system with protected routes and role-based access
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Route Protection**: Role-based route protection and navigation guards
- **Error Handling**: Comprehensive error boundaries, loading states, and user feedback
- **Performance**: Lazy loading, code splitting, and optimized bundle size
- **Admin Dashboard**: Comprehensive admin interface for managing all aspects of the system
- **Booking Interface**: User-friendly booking flow with real-time validation
- **Blog System**: Rich content display with SEO-friendly URLs and social sharing
- **Search & Filtering**: Advanced search capabilities with real-time filtering

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Core Features](#core-features)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Models](#database-models)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Frontend Setup](#frontend-setup)
- [Admin Features](#admin-features)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tmkoc
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   MONGO_URI=mongodb://localhost:27017/tmkoc
   JWT_SECRET=your-super-secret-jwt-key
   PORT=3000
   NODE_ENV=development
   COOKIE_DOMAIN=localhost
   CORS_ORIGIN=http://localhost:5174
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_NAME=TMKOC Tourism
   ```

4. **Start the development servers**

   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Verify the installation**
   - Backend: http://localhost:3000
   - Frontend: http://localhost:5174

## 📁 Project Structure

```
tmkoc/
├── backend/                 # Node.js/Express.js backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   │   ├── database.ts  # MongoDB connection setup
│   │   │   └── cookieConfig.ts
│   │   ├── controllers/     # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── package.controller.ts
│   │   │   ├── destination.controller.ts
│   │   │   ├── booking.controller.ts
│   │   │   └── blog.controller.ts
│   │   ├── dao/             # Data Access Objects
│   │   │   ├── auth.dao.ts
│   │   │   ├── package.dao.ts
│   │   │   ├── destination.dao.ts
│   │   │   ├── booking.dao.ts
│   │   │   └── blog.dao.ts
│   │   ├── middleware/      # Custom middleware
│   │   │   ├── auth.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── models/          # Database models
│   │   │   ├── User.ts
│   │   │   ├── Package.ts
│   │   │   ├── Destination.ts
│   │   │   ├── Booking.ts
│   │   │   └── Blog.ts
│   │   ├── routes/          # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── package.routes.ts
│   │   │   ├── destination.routes.ts
│   │   │   ├── booking.routes.ts
│   │   │   └── blog.routes.ts
│   │   ├── services/        # Business logic
│   │   │   ├── auth.service.ts
│   │   │   ├── package.service.ts
│   │   │   ├── destination.service.ts
│   │   │   ├── booking.service.ts
│   │   │   └── blog.service.ts
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Application entry point
│   ├── API_DOCUMENTATION.md # Complete API documentation
│   ├── README_BOOKING_SYSTEM.md # Booking system documentation
│   └── README.md            # Backend-specific documentation
├── frontend/                # React.js frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── admin/       # Admin-specific components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── bookings/    # Booking-related components
│   │   │   ├── blogs/       # Blog components
│   │   │   ├── destinations/# Destination components
│   │   │   ├── packages/    # Package components
│   │   │   └── home/        # Homepage components
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin dashboard pages
│   │   │   └── ...          # Other pages
│   │   ├── redux/           # Redux store and slices
│   │   │   ├── auth/        # Authentication state
│   │   │   ├── packages/    # Package management state
│   │   │   ├── destinations/# Destination state
│   │   │   ├── bookings/    # Booking state
│   │   │   └── blogs/       # Blog state
│   │   ├── routes/          # React Router configuration
│   │   ├── api/             # API integration
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main App component
│   └── README.md            # Frontend-specific documentation
├── DOCUMENTATION.md         # Comprehensive system documentation
└── README.md                # Main project documentation
```

## 🎯 Core Features

### 🏠 Homepage & Public Features
- **Hero Section**: Engaging landing page with call-to-action
- **Featured Destinations**: Showcase of popular travel destinations
- **Package Highlights**: Featured travel packages with pricing
- **Statistics Dashboard**: Real-time stats and achievements
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 🔐 Authentication & User Management
- **User Registration/Login**: Secure JWT-based authentication
- **Role-Based Access**: Admin and user roles with different permissions
- **Profile Management**: User profile updates and preferences
- **Password Security**: Bcrypt hashing and secure password policies

### 📦 Package Management
- **Package CRUD**: Complete create, read, update, delete operations
- **Advanced Filtering**: Filter by category, price, duration, difficulty
- **Search Functionality**: Full-text search across package content
- **Featured Packages**: Highlight popular and recommended packages
- **Pricing Management**: Flexible pricing for adults, children, infants

### 🌍 Destination Management
- **Comprehensive Database**: Detailed destination information
- **Geospatial Queries**: Location-based searches and nearby destinations
- **Climate Information**: Weather data and best visit times
- **Accommodation Options**: Budget, mid-range, and luxury options
- **Transportation Details**: Airport, railway, and road connectivity
- **Activities & Attractions**: Curated lists of things to do

### 📅 Booking System
- **Complete Booking Flow**: From selection to confirmation
- **Multi-Traveler Support**: Adults, children, and infants
- **Date Management**: Travel date selection with availability checking
- **Accommodation Selection**: Room types and preferences
- **Transportation Options**: Flight and local transport arrangements
- **Dynamic Pricing**: Real-time price calculation with taxes and fees
- **Payment Integration**: Secure payment processing
- **Booking Management**: View, modify, and cancel bookings

### 📝 Blog & Content Management
- **Rich Content Editor**: Create and edit blog posts with media
- **SEO Optimization**: Meta tags, slugs, and search engine friendly URLs
- **Category Management**: Organize content by categories and tags
- **Comment System**: User engagement through comments and likes
- **Related Content**: Automatic related post suggestions

### 👨‍💼 Admin Dashboard
- **Comprehensive Analytics**: Business insights and statistics
- **User Management**: Admin tools for managing users and roles
- **Content Moderation**: Review and approve user-generated content
- **System Settings**: Configure application settings and preferences
- **Reporting Tools**: Generate reports for business intelligence

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Packages
- `GET /api/packages` - Get all packages with filtering and pagination
- `GET /api/packages/search` - Search packages by text
- `GET /api/packages/featured` - Get featured packages
- `GET /api/packages/popular` - Get popular packages
- `GET /api/packages/category/:category` - Get packages by category
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create package (admin only)
- `PUT /api/packages/:id` - Update package (admin only)
- `DELETE /api/packages/:id` - Delete package (admin only)

### Destinations
- `GET /api/destinations` - Get all destinations with filtering
- `GET /api/destinations/search` - Search destinations
- `GET /api/destinations/featured` - Get featured destinations
- `GET /api/destinations/popular` - Get popular destinations
- `GET /api/destinations/statistics` - Get destination statistics
- `GET /api/destinations/:id` - Get destination by ID
- `GET /api/destinations/:id/nearby` - Get nearby destinations
- `POST /api/destinations` - Create destination (admin only)
- `PUT /api/destinations/:id` - Update destination (admin only)
- `DELETE /api/destinations/:id` - Delete destination (admin only)

### Bookings
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking
- `POST /api/bookings/:id/payment` - Process payment
- `GET /api/bookings/admin/all` - Get all bookings (admin only)

### Blogs
- `GET /api/blogs/public` - Get published blogs
- `GET /api/blogs/public/:slug` - Get blog by slug
- `GET /api/blogs/public/:id/related` - Get related blogs
- `POST /api/blogs/public/:id/like` - Like a blog post
- `GET /api/blogs/categories` - Get blog categories
- `POST /api/blogs` - Create blog (admin only)
- `PUT /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)

### Health Check
- `GET /` - Server status and health check

## 🔐 Authentication

The application uses JWT tokens stored in secure HTTP-only cookies for authentication.

### Registration Flow
1. User submits registration data
2. System validates input and checks for existing users
3. Password is hashed using bcryptjs
4. User is created in database
5. JWT token is generated and set as secure cookie
6. User data is returned (excluding password)

### Role-Based Access Control
- **Admin**: Full system access
- **User**: Limited access to user-specific resources

### Security Features
- HTTP-only cookies prevent XSS attacks
- Secure cookies in production (HTTPS only)
- SameSite protection against CSRF
- Password hashing with bcryptjs
- Input validation with Mongoose schemas

## 🌍 Environment Variables

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/tmkoc` | ✅ |
| `JWT_SECRET` | Secret key for JWT signing | - | ✅ |
| `JWT_EXPIRE` | JWT token expiration time | `7d` | ❌ |
| `PORT` | Server port | `3000` | ❌ |
| `NODE_ENV` | Environment mode | `development` | ❌ |
| `COOKIE_DOMAIN` | Cookie domain | `localhost` | ❌ |
| `CORS_ORIGIN` | CORS allowed origins | `http://localhost:5174` | ❌ |

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api` | ✅ |
| `VITE_APP_NAME` | Application name | `TMKOC Tourism` | ❌ |
| `VITE_APP_VERSION` | Application version | `1.0.0` | ❌ |

## 🛠 Development

### Available Scripts

```bash
npm run dev     # Start development server with hot reload
npm run build   # Build TypeScript to JavaScript
npm start       # Start production server
```

### Testing

Use the provided test script:
```bash
node test-api.js
```

### Code Quality
- TypeScript for type safety
- ESLint configuration (recommended)
- Prettier for code formatting (recommended)

## 🎨 Frontend Setup

### Technologies Used
- **React 18**: Latest React with concurrent features
- **Vite**: Fast build tool and development server
- **Redux Toolkit**: Modern Redux with simplified syntax
- **React Router**: Client-side routing with protected routes
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client with interceptors

### Key Features
- **Responsive Design**: Mobile-first approach with breakpoint system
- **Component Library**: Reusable UI components with consistent styling
- **State Management**: Centralized state with Redux Toolkit
- **Route Protection**: Role-based access control
- **Error Handling**: Global error boundaries and user feedback
- **Loading States**: Skeleton loaders and progress indicators

### Demo Credentials
- **Admin**: admin@tmkoc.com / password123
- **User**: user@tmkoc.com / password123

## 👨‍💼 Admin Features

### Dashboard Overview
- **Analytics Dashboard**: Real-time statistics and insights
- **User Management**: View, edit, and manage user accounts
- **Content Management**: Manage packages, destinations, and blogs
- **Booking Management**: View and process all bookings
- **System Settings**: Configure application settings

### Package Management
- **Create/Edit Packages**: Rich form with validation
- **Bulk Operations**: Select and manage multiple packages
- **Featured Management**: Toggle featured status
- **Pricing Control**: Manage pricing for different traveler types
- **Availability Management**: Set availability and capacity

### Destination Management
- **Comprehensive Editor**: Rich destination information editor
- **Media Management**: Upload and manage destination images
- **Geolocation**: Set coordinates for map integration
- **Review Moderation**: Approve and manage user reviews

### Blog Management
- **Content Editor**: Rich text editor with media support
- **SEO Tools**: Meta tags, slugs, and optimization
- **Publishing Workflow**: Draft, review, and publish process
- **Analytics**: Track views, likes, and engagement

### User Management
- **User Profiles**: View and edit user information
- **Role Management**: Assign and modify user roles
- **Activity Monitoring**: Track user actions and engagement
- **Account Management**: Enable/disable accounts

## 📚 Documentation

For detailed documentation including architecture diagrams, UML diagrams, and API specifications, see [DOCUMENTATION.md](./DOCUMENTATION.md).

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage
```

### Frontend Testing
```bash
cd frontend
npm test                    # Run component tests
npm run test:e2e          # Run end-to-end tests
npm run test:coverage     # Run tests with coverage
```

### API Testing
Use the provided test scripts:
```bash
cd backend
node test-api.js          # Test API endpoints
```

## 🚀 Deployment

### Production Build

**Backend:**
```bash
cd backend
npm run build             # Build TypeScript to JavaScript
npm start                 # Start production server
```

**Frontend:**
```bash
cd frontend
npm run build             # Build for production
npm run preview           # Preview production build
```

### Environment Setup
1. Set `NODE_ENV=production` for backend
2. Configure production MongoDB URI
3. Set secure JWT secrets
4. Configure CORS for production domains
5. Set up SSL certificates for HTTPS

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individual containers
docker build -t tmkoc-backend ./backend
docker build -t tmkoc-frontend ./frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation for new features
- Follow the existing code style
- Use meaningful commit messages

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🔮 Roadmap

### Completed Features ✅
- [x] User authentication and authorization
- [x] Package management system
- [x] Destination management with geospatial queries
- [x] Booking system with payment integration
- [x] Blog management with SEO optimization
- [x] Admin dashboard with analytics
- [x] Responsive frontend with modern UI
- [x] API documentation and testing

### Upcoming Features 🚧
- [ ] Real-time notifications
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Third-party integrations (payment gateways, maps)
- [ ] Machine learning recommendations
- [ ] Social features and user interactions
- [ ] Advanced search with AI
- [ ] Microservices architecture
- [ ] Kubernetes deployment

---

**Built with ❤️ using Node.js, Express.js, TypeScript, and MongoDB**