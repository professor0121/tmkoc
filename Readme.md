# TMKOC Backend API

A robust Node.js/Express.js backend application built with TypeScript, featuring JWT authentication, role-based access control, and MongoDB integration.

## 🚀 Features

- **Authentication System**: JWT-based authentication with secure HTTP-only cookies
- **Role-Based Access Control**: Admin and user role management
- **Security**: Password hashing, input validation, and CSRF protection
- **Database**: MongoDB with Mongoose ODM
- **TypeScript**: Full TypeScript support for type safety
- **Modular Architecture**: Clean separation of concerns with layered architecture

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Documentation](#documentation)

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
backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # MongoDB connection setup
│   │   └── cookieConfig.ts  # Cookie configuration
│   ├── controllers/         # Request handlers
│   │   └── auth.controller.ts
│   ├── dao/                 # Data Access Objects
│   │   └── user.dao.ts
│   ├── middleware/          # Custom middleware
│   │   └── auth.middleware.ts
│   ├── models/              # Database models
│   │   └── User.ts
│   ├── routes/              # API routes
│   │   └── auth.routes.ts
│   ├── services/            # Business logic
│   │   └── auth.services.ts
│   ├── utils/               # Utility functions
│   │   └── helper.ts
│   └── index.ts             # Application entry point
├── package.json
├── tsconfig.json
└── test-api.js              # API testing script
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