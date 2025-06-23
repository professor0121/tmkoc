# Booking System Documentation

## Overview

The booking system is a comprehensive solution for managing travel bookings in the TMKOC travel application. It handles the complete booking lifecycle from creation to completion, including payments, cancellations, and reviews.

## Architecture

### Core Components

1. **Model** (`Booking.ts`) - MongoDB schema and business logic
2. **DAO** (`booking.dao.ts`) - Data access layer with database operations
3. **Controller** (`booking.controller.ts`) - HTTP request handlers and business logic
4. **Routes** (`booking.routes.ts`) - API endpoint definitions
5. **Validation** (`validation.ts`) - Input validation and business rules

## Database Schema

### Booking Model Structure

```typescript
interface IBooking {
  bookingId: string;              // Unique booking identifier
  user: ObjectId;                 // Reference to User
  package: ObjectId;              // Reference to Package
  destination: ObjectId;          // Reference to Destination
  
  bookingDetails: {
    travelers: {
      adults: number;
      children: number;
      infants: number;
    };
    travelDates: {
      startDate: Date;
      endDate: Date;
      duration: number;           // Auto-calculated
    };
    accommodation: {
      type: 'budget' | 'midRange' | 'luxury';
      roomType: string;
      rooms: number;
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
    remainingAmount: number;
    paymentSchedule?: PaymentSchedule[];
  };
  
  status: 'draft' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
  bookingSource: 'website' | 'mobile_app' | 'phone' | 'agent' | 'walk_in';
  specialRequests: string[];
  emergencyContact: EmergencyContact;
  documents: Document[];
  notifications: NotificationSettings;
  cancellation: CancellationDetails;
  reviews: Review[];
  metadata: BookingMetadata;
}
```

### Key Features

#### Auto-Generated Fields
- **bookingId**: Unique identifier (format: BK{timestamp}{random})
- **duration**: Auto-calculated from travel dates
- **remainingAmount**: Auto-calculated from total and paid amounts

#### Validation Rules
- Start date must be in the future
- End date must be after start date
- At least one adult traveler required
- Minimum rooms based on adult count
- Total amount calculation validation

#### Business Logic
- Automatic cancellation fee calculation based on days to departure
- Payment status updates based on amount paid
- Review system with verification
- Document management with verification status

## API Endpoints

### Public Endpoints
None - All booking endpoints require authentication

### Authenticated User Endpoints

#### Create Booking
```http
POST /api/bookings
Content-Type: application/json
Authorization: Bearer {token}

{
  "package": "packageId",
  "destination": "destinationId",
  "bookingDetails": {
    "travelers": {
      "adults": 2,
      "children": 1,
      "infants": 0
    },
    "travelDates": {
      "startDate": "2024-07-15T00:00:00.000Z",
      "endDate": "2024-07-22T00:00:00.000Z"
    },
    "accommodation": {
      "type": "midRange",
      "roomType": "Deluxe",
      "rooms": 1
    },
    "transportation": {
      "flightRequired": true,
      "flightDetails": {
        "departure": "DEL",
        "arrival": "GOI",
        "class": "economy"
      },
      "localTransport": ["taxi", "bus"]
    }
  },
  "pricing": {
    "basePrice": 50000,
    "taxes": 5000,
    "fees": 1000,
    "discounts": 2000,
    "totalAmount": 54000,
    "currency": "INR"
  },
  "payment": {
    "method": "credit_card"
  },
  "emergencyContact": {
    "name": "John Doe",
    "phone": "+91-9876543210",
    "email": "john@example.com",
    "relationship": "spouse"
  }
}
```

#### Get User Bookings
```http
GET /api/bookings/my-bookings
Authorization: Bearer {token}
```

#### Get Booking Details
```http
GET /api/bookings/{bookingId}
Authorization: Bearer {token}
```

#### Update Booking
```http
PUT /api/bookings/{bookingId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "specialRequests": ["vegetarian meals", "wheelchair access"]
}
```

#### Add Payment
```http
POST /api/bookings/{bookingId}/payment
Authorization: Bearer {token}
Content-Type: application/json

{
  "transactionId": "TXN123456789",
  "amount": 27000,
  "paymentMethod": "credit_card",
  "status": "success"
}
```

#### Cancel Booking
```http
POST /api/bookings/{bookingId}/cancel
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Change in travel plans due to emergency"
}
```

#### Add Review
```http
POST /api/bookings/{bookingId}/review
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent service and amazing experience!"
}
```

### Admin Endpoints

#### Get All Bookings
```http
GET /api/bookings?status=confirmed&page=1&limit=10
Authorization: Bearer {adminToken}
```

#### Get Booking Statistics
```http
GET /api/bookings/statistics
Authorization: Bearer {adminToken}
```

#### Delete Booking
```http
DELETE /api/bookings/{bookingId}
Authorization: Bearer {adminToken}
```

## Query Parameters

### Filtering Options
- `userId` - Filter by user ID
- `packageId` - Filter by package ID
- `destinationId` - Filter by destination ID
- `status` - Filter by booking status
- `paymentStatus` - Filter by payment status
- `startDate` - Filter by travel start date (from)
- `endDate` - Filter by travel start date (to)
- `minAmount` - Filter by minimum total amount
- `maxAmount` - Filter by maximum total amount
- `bookingSource` - Filter by booking source

### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sort` - Sort criteria (default: `{createdAt: -1}`)

## Business Rules

### Booking Creation
1. User must be authenticated
2. Package and destination must exist and be active
3. Travel dates must be in the future
4. At least one adult traveler required
5. Sufficient rooms for travelers
6. Valid pricing calculations

### Payment Processing
1. Payment amount must be positive
2. Cannot pay more than remaining amount
3. Payment status updates automatically
4. Transaction history maintained

### Cancellation Policy
- **30+ days before travel**: 10% cancellation fee
- **15-30 days before travel**: 30% cancellation fee
- **Less than 15 days**: 50% cancellation fee

### Review System
1. Reviews only allowed after travel completion
2. Rating must be between 1-5
3. Comment required (10-1000 characters)
4. One review per booking

## Error Handling

### Common Error Responses

#### Validation Errors (400)
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "bookingDetails.travelers.adults",
      "message": "At least one adult is required"
    }
  ]
}
```

#### Authentication Errors (401)
```json
{
  "message": "User not authenticated"
}
```

#### Authorization Errors (403)
```json
{
  "message": "Access denied. Admin privileges required."
}
```

#### Not Found Errors (404)
```json
{
  "message": "Booking not found"
}
```

#### Server Errors (500)
```json
{
  "message": "Error creating booking",
  "error": "Database connection failed"
}
```

## Database Indexes

### Performance Optimization
```javascript
// Compound indexes for common queries
{ user: 1, status: 1 }
{ package: 1, status: 1 }
{ destination: 1, status: 1 }
{ 'bookingDetails.travelDates.startDate': 1 }
{ 'payment.status': 1 }
{ createdAt: -1 }

// Unique index
{ bookingId: 1 } // unique
```

## Security Considerations

### Authentication & Authorization
- All endpoints require valid JWT token
- User can only access their own bookings
- Admin can access all bookings
- Role-based access control implemented

### Data Protection
- Sensitive payment data encrypted
- PII data handling compliance
- Audit trail for all modifications
- Secure document storage

### Input Validation
- Comprehensive validation middleware
- Business rule enforcement
- SQL injection prevention
- XSS protection

## Integration Points

### External Services
- **Payment Gateway**: For processing payments
- **Email Service**: For booking confirmations and notifications
- **SMS Service**: For booking updates
- **Document Storage**: For file uploads
- **Analytics**: For tracking and reporting

### Internal Dependencies
- **User Service**: For user authentication and profile
- **Package Service**: For package details and pricing
- **Destination Service**: For destination information
- **Notification Service**: For sending alerts

## Monitoring & Analytics

### Key Metrics
- Total bookings created
- Conversion rate (draft to confirmed)
- Cancellation rate
- Average booking value
- Payment success rate
- Customer satisfaction (review ratings)

### Logging
- All booking operations logged
- Payment transactions tracked
- Error monitoring and alerting
- Performance metrics collection

## Future Enhancements

### Planned Features
- [ ] Multi-currency support
- [ ] Installment payment plans
- [ ] Group booking management
- [ ] Loyalty points integration
- [ ] Dynamic pricing based on demand
- [ ] AI-powered recommendations
- [ ] Real-time availability checking
- [ ] Integration with travel insurance
- [ ] Mobile app push notifications
- [ ] Booking modification workflow

### Technical Improvements
- [ ] Caching layer for better performance
- [ ] Event-driven architecture
- [ ] Microservices decomposition
- [ ] Real-time updates with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Automated testing suite
- [ ] Load balancing and scaling
- [ ] Disaster recovery planning
