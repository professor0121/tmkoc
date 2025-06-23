# TMKOC Travel Booking System

## 🚀 Overview

The TMKOC Travel Booking System is a comprehensive backend solution for managing travel bookings, payments, and customer interactions. Built with Node.js, Express, TypeScript, and MongoDB, it provides a robust foundation for travel booking applications.

## ✨ Features

### Core Booking Features
- ✅ **Complete Booking Lifecycle** - From creation to completion
- ✅ **Multi-Traveler Support** - Adults, children, and infants
- ✅ **Flexible Accommodation** - Budget, mid-range, and luxury options
- ✅ **Transportation Management** - Flight and local transport options
- ✅ **Dynamic Pricing** - Automatic calculation with taxes and fees
- ✅ **Availability Checking** - Real-time availability validation

### Payment System
- ✅ **Multiple Payment Methods** - Credit card, UPI, net banking, wallet
- ✅ **Partial Payments** - Support for installment payments
- ✅ **Payment Tracking** - Complete transaction history
- ✅ **Automatic Status Updates** - Based on payment completion
- ✅ **Refund Processing** - Automated refund calculations

### Cancellation & Refunds
- ✅ **Flexible Cancellation Policy** - Time-based cancellation fees
- ✅ **Automatic Refund Calculation** - Based on days to departure
- ✅ **Cancellation Tracking** - Complete audit trail
- ✅ **Refund Status Management** - Track refund processing

### Review System
- ✅ **Post-Travel Reviews** - Rating and comment system
- ✅ **Review Verification** - Automatic verification for completed bookings
- ✅ **Rating Analytics** - Aggregate rating calculations
- ✅ **Review Moderation** - Admin review management

### Admin Features
- ✅ **Comprehensive Analytics** - Booking statistics and trends
- ✅ **Revenue Tracking** - Financial analytics and reporting
- ✅ **Booking Management** - Admin booking operations
- ✅ **User Management** - Customer booking history
- ✅ **Popular Destinations** - Analytics on destination popularity

## 🏗️ Architecture

### Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Validation**: Express-validator
- **Documentation**: Comprehensive API docs

### Project Structure
```
backend/
├── src/
│   ├── models/
│   │   ├── Booking.ts              # Booking schema and model
│   │   ├── User.ts                 # User model
│   │   ├── Package.ts              # Package model
│   │   ├── Destination.ts          # Destination model
│   │   └── BOOKING_README.md       # Detailed model documentation
│   ├── dao/
│   │   └── booking.dao.ts          # Data access layer
│   ├── controllers/
│   │   └── booking.controller.ts   # HTTP request handlers
│   ├── services/
│   │   └── booking.service.ts      # Business logic layer
│   ├── routes/
│   │   └── booking.routes.ts       # API route definitions
│   ├── middleware/
│   │   ├── auth.middleware.ts      # Authentication middleware
│   │   └── validation.ts           # Input validation
│   └── docs/
│       └── BOOKING_API.md          # API documentation
```

### Data Flow
```
Client Request → Routes → Middleware → Controller → Service → DAO → Database
                    ↓         ↓          ↓         ↓       ↓
                 Auth    Validation  Business   Data   MongoDB
                         Rules      Logic     Access
```

## 📊 Database Schema

### Booking Model
```typescript
interface IBooking {
  bookingId: string;              // Unique identifier (BK + timestamp + random)
  user: ObjectId;                 // Reference to User
  package: ObjectId;              // Reference to Package
  destination: ObjectId;          // Reference to Destination
  
  bookingDetails: {
    travelers: {
      adults: number;             // Required, min: 1
      children: number;           // Optional, default: 0
      infants: number;            // Optional, default: 0
    };
    travelDates: {
      startDate: Date;            // Must be in future
      endDate: Date;              // Must be after startDate
      duration: number;           // Auto-calculated
    };
    accommodation: {
      type: 'budget' | 'midRange' | 'luxury';
      roomType: string;
      rooms: number;              // Min: 1
    };
    transportation: {
      flightRequired: boolean;
      flightDetails?: {
        departure: string;
        arrival: string;
        class: 'economy' | 'business' | 'first';
      };
      localTransport: string[];
    };
  };
  
  pricing: {
    basePrice: number;
    taxes: number;
    fees: number;
    discounts: number;
    totalAmount: number;
    currency: string;
    breakdown: {
      packageCost: number;
      accommodationCost: number;
      transportationCost: number;
      additionalServices: number;
    };
  };
  
  payment: {
    status: 'pending' | 'partial' | 'completed' | 'failed' | 'refunded';
    method: string;
    transactions: Transaction[];
    totalPaid: number;
    remainingAmount: number;      // Auto-calculated
  };
  
  status: 'draft' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
  emergencyContact: EmergencyContact;
  documents: Document[];
  reviews: Review[];
  cancellation: CancellationDetails;
  metadata: BookingMetadata;
}
```

## 🔧 API Endpoints

### Public Endpoints
None - All booking endpoints require authentication

### User Endpoints
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/upcoming` - Get upcoming bookings
- `GET /api/bookings/past` - Get past bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `POST /api/bookings/:id/payment` - Add payment
- `POST /api/bookings/:id/cancel` - Cancel booking
- `POST /api/bookings/:id/review` - Add review

### Admin Endpoints
- `GET /api/bookings` - Get all bookings (with filters)
- `GET /api/bookings/statistics` - Get booking analytics
- `DELETE /api/bookings/:id` - Delete booking
- `PATCH /api/bookings/:id/status` - Update booking status

## 🛡️ Security Features

### Authentication & Authorization
- JWT-based authentication with secure cookies
- Role-based access control (user/admin)
- Token expiration and refresh handling
- Session management

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Rate limiting
- Encrypted sensitive data storage
- Audit logging for all operations

### Business Logic Security
- Booking ownership validation
- Payment amount validation
- Availability checking
- Pricing calculation verification
- Cancellation policy enforcement

## 📈 Business Logic

### Pricing Calculation
```typescript
// Base pricing formula
const travelerCost = (adults * adultPrice) + (children * childPrice) + (infants * infantPrice);
const accommodationCost = travelerCost * accommodationMultiplier * rooms;
const transportationCost = flightRequired ? calculateFlightCost() : 0;
const subtotal = travelerCost + accommodationCost + transportationCost;
const taxes = subtotal * 0.18; // 18% GST
const fees = subtotal * 0.02;  // 2% platform fee
const totalAmount = subtotal + taxes + fees - discounts;
```

### Cancellation Policy
```typescript
// Refund calculation based on days to departure
const daysToDeparture = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));

if (daysToDeparture > 30) {
  refundPercentage = 90; // 10% cancellation fee
} else if (daysToDeparture > 15) {
  refundPercentage = 70; // 30% cancellation fee
} else if (daysToDeparture > 7) {
  refundPercentage = 50; // 50% cancellation fee
} else {
  refundPercentage = 25; // 75% cancellation fee
}
```

### Availability Checking
- Package capacity limits (max 50 travelers per period)
- Date conflict detection
- Accommodation availability
- Transportation availability

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd tmkoc/backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the development server
npm run dev
```

### Environment Variables
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/tmkoc
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Database Setup
```bash
# Start MongoDB
mongod

# Run database migrations (if any)
npm run migrate

# Seed sample data
npm run seed
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm run test:booking
```

### Test Coverage
- Unit tests for all business logic
- Integration tests for API endpoints
- Database operation tests
- Authentication and authorization tests

## 📊 Monitoring & Analytics

### Key Metrics
- **Booking Conversion Rate**: Draft to confirmed bookings
- **Cancellation Rate**: Percentage of cancelled bookings
- **Average Booking Value**: Revenue per booking
- **Payment Success Rate**: Successful payment percentage
- **Customer Satisfaction**: Average review ratings

### Logging
- All booking operations logged
- Payment transactions tracked
- Error monitoring and alerting
- Performance metrics collection

## 🔄 Integration Points

### External Services
- **Payment Gateway**: Razorpay, Stripe integration
- **Email Service**: SendGrid, AWS SES for notifications
- **SMS Service**: Twilio for booking updates
- **File Storage**: AWS S3 for document storage
- **Analytics**: Google Analytics, Mixpanel

### Internal Dependencies
- User authentication service
- Package management service
- Destination management service
- Notification service

## 🚀 Deployment

### Production Setup
```bash
# Build the application
npm run build

# Start production server
npm start

# Using PM2 for process management
pm2 start ecosystem.config.js
```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📋 Future Enhancements

### Planned Features
- [ ] Multi-currency support
- [ ] Real-time availability checking
- [ ] Group booking management
- [ ] Loyalty points integration
- [ ] Dynamic pricing based on demand
- [ ] AI-powered recommendations
- [ ] Mobile app push notifications
- [ ] Integration with travel insurance
- [ ] Booking modification workflow
- [ ] Advanced analytics dashboard

### Technical Improvements
- [ ] Microservices architecture
- [ ] Event-driven architecture with message queues
- [ ] Caching layer (Redis)
- [ ] Real-time updates with WebSockets
- [ ] Advanced monitoring and alerting
- [ ] Automated testing pipeline
- [ ] Load balancing and auto-scaling
- [ ] Disaster recovery planning

## 📞 Support

For technical support or questions:
- Email: support@tmkoc.com
- Documentation: [API Docs](./docs/BOOKING_API.md)
- Issues: GitHub Issues

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ by the TMKOC Development Team**
