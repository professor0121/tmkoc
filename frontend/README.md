# TMKOC Tourism Frontend

A modern, responsive React application for tourism management built with React 18, Vite, and Tailwind CSS. Features comprehensive authentication, booking system, content management, and admin dashboard.

## 🚀 Features

### Core Features
- **Authentication System**: Complete login/register with JWT tokens and role-based access
- **Route Protection**: Role-based access control with protected routes for users and admins
- **API Integration**: Axios instance with interceptors, error handling, and automatic retries
- **State Management**: Redux Toolkit for efficient global state management
- **Error Handling**: Error boundaries, global error handling, and user-friendly error messages
- **Loading States**: Skeleton loaders, progress indicators, and loading animations
- **Responsive Design**: Mobile-first design with Tailwind CSS and modern UI components

### User Features
- **Homepage**: Engaging landing page with featured destinations and packages
- **Package Browsing**: Advanced filtering, search, and package comparison
- **Destination Explorer**: Interactive destination discovery with maps and reviews
- **Booking System**: Complete booking flow with real-time validation and payment
- **User Dashboard**: Personal bookings, profile management, and travel history
- **Blog Reading**: SEO-optimized blog posts with social sharing and comments

### Admin Features
- **Admin Dashboard**: Comprehensive analytics and system overview
- **Package Management**: Create, edit, and manage travel packages with rich forms
- **Destination Management**: Manage destinations with media upload and geolocation
- **Booking Management**: View, process, and manage all user bookings
- **Blog Management**: Content creation with rich text editor and SEO tools
- **User Management**: Admin tools for managing users and roles
- **Analytics**: Business insights, statistics, and reporting tools

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on http://localhost:3000

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_NAME=TMKOC Tourism
   VITE_APP_VERSION=1.0.0
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── admin/          # Admin-specific components
│   │   ├── auth/           # Authentication components
│   │   ├── bookings/       # Booking-related components
│   │   ├── blogs/          # Blog components
│   │   ├── destinations/   # Destination components
│   │   ├── packages/       # Package components
│   │   └── home/           # Homepage components
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin dashboard pages
│   │   └── ...             # Other pages
│   ├── redux/              # Redux store and slices
│   │   ├── auth/           # Authentication state
│   │   ├── packages/       # Package management state
│   │   ├── destinations/   # Destination state
│   │   ├── bookings/       # Booking state
│   │   └── blogs/          # Blog state
│   ├── routes/             # React Router configuration
│   ├── api/                # API integration and services
│   ├── utils/              # Utility functions and helpers
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global styles and Tailwind config
│   └── App.jsx             # Main App component
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json
```

## 🔐 Authentication & Routing

### Demo Credentials
- **Admin**: admin@tmkoc.com / password123
- **User**: user@tmkoc.com / password123

### Route Structure
- **Public Routes**:
  - `/` - Homepage
  - `/packages` - Package listings
  - `/destinations` - Destination explorer
  - `/blogs` - Blog posts
  - `/about` - About page
  - `/contact` - Contact page
- **Auth Routes**:
  - `/login` - User login (redirects if authenticated)
  - `/register` - User registration (redirects if authenticated)
- **Protected Routes** (authentication required):
  - `/dashboard` - User dashboard
  - `/bookings` - User bookings
  - `/profile` - User profile
- **Admin Routes** (admin role required):
  - `/admin` - Admin dashboard
  - `/admin/packages` - Package management
  - `/admin/destinations` - Destination management
  - `/admin/bookings` - Booking management
  - `/admin/blogs` - Blog management
  - `/admin/users` - User management

### Route Protection Features
- **Role-based Access Control**: Different access levels for users and admins
- **Authentication Guards**: Automatic redirects for unauthenticated users
- **Permission Checks**: Component-level permission validation
- **Breadcrumb Navigation**: Dynamic breadcrumbs for admin sections

## 🌐 API Integration

### Axios Configuration
- **Base URL**: Configurable API endpoint
- **Automatic Cookie Handling**: Secure HTTP-only cookies
- **Request Interceptors**: Automatic token attachment and request logging
- **Response Interceptors**: Error handling and response transformation
- **Error Handling**: Global error handling with user-friendly messages
- **Retry Logic**: Automatic retry for failed requests
- **Loading States**: Automatic loading state management

### API Services
- **Authentication Service**: Login, register, logout, profile management
- **Package Service**: CRUD operations, search, filtering
- **Destination Service**: Destination management, geospatial queries
- **Booking Service**: Booking lifecycle, payment processing
- **Blog Service**: Content management, SEO optimization

## 📚 Key Technologies

### Core Technologies
- **React 18**: Latest React with concurrent features and hooks
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and better development experience
- **Redux Toolkit**: Modern Redux with simplified syntax
- **React Router DOM**: Client-side routing with nested routes
- **Axios**: HTTP client with interceptors and error handling

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Headless UI**: Unstyled, accessible UI components
- **React Icons**: Comprehensive icon library
- **Framer Motion**: Animation library for smooth transitions

### Development Tools
- **ESLint**: Code linting and quality checks
- **Prettier**: Code formatting
- **Vite**: Fast development server and build tool
- **PostCSS**: CSS processing and optimization

## 🎨 UI Components

### Reusable Components
- **Form Components**: Input fields, selectors, validation
- **Layout Components**: Headers, footers, sidebars, containers
- **Data Display**: Cards, tables, lists, pagination
- **Feedback**: Loading spinners, error messages, success notifications
- **Navigation**: Breadcrumbs, menus, tabs, pagination

### Admin Components
- **Dashboard Widgets**: Statistics cards, charts, quick actions
- **Data Tables**: Sortable, filterable tables with bulk actions
- **Form Builders**: Dynamic forms with validation
- **Media Managers**: Image upload and management
- **Rich Text Editors**: Content creation with formatting

## 🚀 Performance Optimizations

### Code Splitting
- **Route-based Splitting**: Lazy loading for different routes
- **Component Splitting**: Dynamic imports for heavy components
- **Bundle Analysis**: Webpack bundle analyzer for optimization

### State Management
- **Redux Toolkit**: Efficient state updates with Immer
- **Memoization**: React.memo and useMemo for expensive operations
- **Selective Subscriptions**: Component-level state subscriptions

### Asset Optimization
- **Image Optimization**: Responsive images with lazy loading
- **CSS Optimization**: Purged unused styles in production
- **Font Loading**: Optimized web font loading strategies

## 🧪 Testing

### Available Scripts
```bash
npm test                    # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
npm run test:e2e          # Run end-to-end tests
```

### Testing Strategy
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration and user flow testing
- **E2E Tests**: Full application testing with Cypress
- **Visual Testing**: Component visual regression testing

### Test Coverage
- Components: 90%+ coverage target
- Utilities: 100% coverage target
- API Services: 95%+ coverage target
- Critical User Flows: 100% coverage

## 🚀 Deployment

### Production Build
```bash
npm run build              # Build for production
npm run preview            # Preview production build locally
```

### Environment Configuration
```env
# Production Environment Variables
VITE_API_URL=https://api.tmkoctourism.com/api
VITE_APP_NAME=TMKOC Tourism
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
```

### Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS monitoring
- **Bundle Analysis**: Regular bundle size monitoring
- **Error Tracking**: Sentry integration for error monitoring
- **Analytics**: User behavior and performance analytics

## 🛠️ Development

### Available Scripts
```bash
npm run dev               # Start development server
npm run build             # Build for production
npm run preview           # Preview production build
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint errors
npm run format            # Format code with Prettier
npm run type-check        # TypeScript type checking
```

### Development Guidelines
- **Component Structure**: Follow atomic design principles
- **State Management**: Use Redux for global state, local state for component-specific data
- **Styling**: Use Tailwind CSS utility classes, create custom components for reusable styles
- **API Integration**: Use custom hooks for API calls and state management
- **Error Handling**: Implement proper error boundaries and user feedback
- **Accessibility**: Follow WCAG guidelines for accessible components

### Code Quality
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for code quality
- **TypeScript**: Strict type checking enabled
- **Import Organization**: Automatic import sorting and organization

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding standards
4. Add tests for new functionality
5. Run tests and ensure they pass
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Submit a pull request

### Pull Request Guidelines
- **Description**: Provide clear description of changes
- **Testing**: Include test coverage for new features
- **Documentation**: Update documentation for new features
- **Screenshots**: Include screenshots for UI changes
- **Breaking Changes**: Clearly mark any breaking changes

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check the comprehensive documentation
- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Join community discussions for questions

### Common Issues
- **Build Errors**: Check Node.js version and dependencies
- **API Connection**: Verify backend server is running
- **Authentication**: Check JWT token configuration
- **Styling**: Verify Tailwind CSS configuration

---

**Built with ❤️ using React, Vite, Redux Toolkit, and Tailwind CSS**
