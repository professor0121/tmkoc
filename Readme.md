# TMKOC Tourism Management System

A comprehensive full-stack tourism management application built with modern technologies, featuring a robust Node.js/Express.js backend with TypeScript and a React.js frontend with Redux.

## 🚀 Features

### Backend Features
- **Authentication System**: JWT-based authentication with secure HTTP-only cookies
- **Role-Based Access Control**: Admin and user role management
- **Package Management**: Complete CRUD operations for travel packages
- **Destination Management**: Comprehensive destination database with reviews and ratings
- **Advanced Search**: Full-text search with filters and geospatial queries
- **Review System**: User reviews and ratings for destinations and packages
- **Analytics**: Statistics and insights for business intelligence
- **Security**: Password hashing, input validation, and CSRF protection
- **Database**: MongoDB with Mongoose ODM and optimized indexing
- **TypeScript**: Full TypeScript support for type safety
- **Modular Architecture**: Clean separation of concerns with layered architecture

### Frontend Features
- **Modern React**: Built with React 18 and modern hooks
- **State Management**: Redux Toolkit for efficient state management
- **Authentication**: Complete auth system with protected routes
- **Responsive Design**: Mobile-first responsive design
- **Route Protection**: Role-based route protection and navigation guards
- **Error Handling**: Comprehensive error boundaries and loading states
- **Performance**: Lazy loading and code splitting for optimal performance

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Models](#database-models)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Documentation](#documentation)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tmkoc/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   MONGO_URI=mongodb://localhost:27017/tmkoc
   JWT_SECRET=your-super-secret-jwt-key
   PORT=3000
   NODE_ENV=development
   COOKIE_DOMAIN=localhost
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Verify the installation**
   ```bash
   curl http://localhost:3000
   ```

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
│   │   │   └── destination.controller.ts
│   │   ├── dao/             # Data Access Objects
│   │   │   ├── user.dao.ts
│   │   │   ├── package.dao.ts
│   │   │   └── destination.dao.ts
│   │   ├── middleware/      # Custom middleware
│   │   │   └── auth.middleware.ts
│   │   ├── models/          # Database models
│   │   │   ├── User.ts
│   │   │   ├── Package.ts
│   │   │   └── Destination.ts
│   │   ├── routes/          # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── package.routes.ts
│   │   │   └── destination.routes.ts
│   │   ├── services/        # Business logic
│   │   │   ├── auth.services.ts
│   │   │   ├── package.service.ts
│   │   │   └── destination.service.ts
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Application entry point
│   ├── API_DOCUMENTATION.md # Complete API documentation
│   └── README.md            # Backend-specific documentation
├── frontend/                # React.js frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store and slices
│   │   ├── router/          # React Router configuration
│   │   ├── api/             # API integration
│   │   └── App.jsx          # Main App component
│   └── README.md            # Frontend-specific documentation
└── README.md                # Main project documentation
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login (implementation pending)

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a user (direct)

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

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/tmkoc` |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `COOKIE_DOMAIN` | Cookie domain | `localhost` |

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

## 📚 Documentation

For detailed documentation including architecture diagrams, UML diagrams, and API specifications, see [DOCUMENTATION.md](./DOCUMENTATION.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🔮 Roadmap

- [ ] Complete login implementation
- [ ] Add password reset functionality
- [ ] Implement comprehensive middleware
- [ ] Add input sanitization
- [ ] Implement rate limiting
- [ ] Add comprehensive test suite
- [ ] API documentation with Swagger
- [ ] Logging system
- [ ] Health check endpoints
- [ ] Docker containerization

---

**Built with ❤️ using Node.js, Express.js, TypeScript, and MongoDB**