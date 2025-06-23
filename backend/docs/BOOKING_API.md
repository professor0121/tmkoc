# Booking API Documentation

## Overview

The Booking API provides comprehensive functionality for managing travel bookings in the TMKOC travel application. It supports the complete booking lifecycle including creation, payment processing, cancellation, and review management.

## Base URL

```
http://localhost:3000/api/bookings
```

## Authentication

All booking endpoints require authentication via JWT token. Include the token in cookies or Authorization header.

```http
Cookie: authToken=your_jwt_token
```

## Endpoints

### 1. Create Booking

Creates a new travel booking with comprehensive validation and pricing calculation.

**Endpoint:** `POST /api/bookings`

**Request Body:**
```json
{
  "package": "64a7b8c9d1e2f3a4b5c6d7e8",
  "destination": "64a7b8c9d1e2f3a4b5c6d7e9",
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
      "roomType": "Deluxe Double",
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
    "taxes": 9000,
    "fees": 1000,
    "discounts": 2000,
    "totalAmount": 58000,
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
  },
  "specialRequests": ["vegetarian meals", "wheelchair access"]
}
```

**Response:**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "bookingId": "BK1234567890ABCDE",
    "status": "draft",
    "user": "64a7b8c9d1e2f3a4b5c6d7e7",
    "package": {
      "title": "Goa Beach Paradise",
      "price": 25000
    },
    "destination": {
      "name": "Goa Beaches",
      "city": "Panaji"
    },
    "bookingDetails": { /* ... */ },
    "pricing": { /* ... */ },
    "payment": {
      "status": "pending",
      "totalPaid": 0,
      "remainingAmount": 58000
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get User Bookings

Retrieves all bookings for the authenticated user.

**Endpoint:** `GET /api/bookings/my-bookings`

**Response:**
```json
{
  "message": "User bookings retrieved successfully",
  "bookings": [
    {
      "bookingId": "BK1234567890ABCDE",
      "status": "confirmed",
      "package": {
        "title": "Goa Beach Paradise",
        "images": ["image1.jpg"]
      },
      "destination": {
        "name": "Goa Beaches",
        "city": "Panaji"
      },
      "bookingDetails": {
        "travelDates": {
          "startDate": "2024-07-15T00:00:00.000Z",
          "endDate": "2024-07-22T00:00:00.000Z"
        },
        "travelers": {
          "adults": 2,
          "children": 1
        }
      },
      "pricing": {
        "totalAmount": 58000,
        "currency": "INR"
      },
      "payment": {
        "status": "completed",
        "totalPaid": 58000
      }
    }
  ]
}
```

### 3. Get Booking Details

Retrieves detailed information about a specific booking.

**Endpoint:** `GET /api/bookings/{bookingId}`

**Response:**
```json
{
  "message": "Booking retrieved successfully",
  "booking": {
    "bookingId": "BK1234567890ABCDE",
    "status": "confirmed",
    "user": {
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "package": { /* full package details */ },
    "destination": { /* full destination details */ },
    "bookingDetails": { /* complete booking details */ },
    "pricing": { /* pricing breakdown */ },
    "payment": { /* payment history */ },
    "emergencyContact": { /* emergency contact info */ },
    "documents": [ /* uploaded documents */ ],
    "reviews": [ /* user reviews */ ]
  }
}
```

### 4. Add Payment

Processes a payment for a booking.

**Endpoint:** `POST /api/bookings/{bookingId}/payment`

**Request Body:**
```json
{
  "transactionId": "TXN123456789",
  "amount": 29000,
  "paymentMethod": "credit_card"
}
```

**Response:**
```json
{
  "message": "Payment processed successfully",
  "booking": {
    "bookingId": "BK1234567890ABCDE",
    "payment": {
      "status": "partial",
      "totalPaid": 29000,
      "remainingAmount": 29000,
      "transactions": [
        {
          "transactionId": "TXN123456789",
          "amount": 29000,
          "status": "success",
          "paymentDate": "2024-01-15T11:00:00.000Z"
        }
      ]
    }
  }
}
```

### 5. Cancel Booking

Cancels a booking and calculates refund amount.

**Endpoint:** `POST /api/bookings/{bookingId}/cancel`

**Request Body:**
```json
{
  "reason": "Change in travel plans due to emergency"
}
```

**Response:**
```json
{
  "message": "Booking cancelled successfully",
  "booking": {
    "bookingId": "BK1234567890ABCDE",
    "status": "cancelled",
    "cancellation": {
      "cancellationDate": "2024-01-15T12:00:00.000Z",
      "cancellationReason": "Change in travel plans due to emergency"
    }
  },
  "refundDetails": {
    "refundAmount": 52200,
    "cancellationFee": 5800
  }
}
```

### 6. Add Review

Adds a review for a completed booking.

**Endpoint:** `POST /api/bookings/{bookingId}/review`

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent service and amazing experience! The destination was beautiful and the accommodation was top-notch."
}
```

**Response:**
```json
{
  "message": "Review added successfully",
  "booking": {
    "bookingId": "BK1234567890ABCDE",
    "reviews": [
      {
        "rating": 5,
        "comment": "Excellent service and amazing experience!",
        "reviewDate": "2024-01-15T13:00:00.000Z",
        "verified": true
      }
    ]
  }
}
```

### 7. Get Upcoming Bookings

Retrieves upcoming bookings for the user.

**Endpoint:** `GET /api/bookings/upcoming`

**Response:**
```json
{
  "message": "Upcoming bookings retrieved successfully",
  "bookings": [
    {
      "bookingId": "BK1234567890ABCDE",
      "status": "confirmed",
      "bookingDetails": {
        "travelDates": {
          "startDate": "2024-07-15T00:00:00.000Z",
          "endDate": "2024-07-22T00:00:00.000Z"
        }
      },
      "package": { /* package info */ },
      "destination": { /* destination info */ }
    }
  ]
}
```

### 8. Get Past Bookings

Retrieves completed or cancelled bookings for the user.

**Endpoint:** `GET /api/bookings/past`

### 9. Update Booking Status (Admin)

Updates the status of a booking.

**Endpoint:** `PATCH /api/bookings/{bookingId}/status`

**Request Body:**
```json
{
  "status": "confirmed"
}
```

### 10. Get Booking Statistics (Admin)

Retrieves comprehensive booking analytics and statistics.

**Endpoint:** `GET /api/bookings/statistics`

**Response:**
```json
{
  "message": "Booking analytics retrieved successfully",
  "analytics": {
    "totalBookings": 1250,
    "confirmedBookings": 980,
    "cancelledBookings": 125,
    "completedBookings": 890,
    "pendingPayments": 45,
    "conversionRate": 78.4,
    "cancellationRate": 10.0,
    "averageBookingValue": 45000,
    "revenue": {
      "totalRevenue": 44100000,
      "totalPaid": 42500000
    },
    "monthlyTrends": [
      {
        "_id": { "year": 2024, "month": 1 },
        "count": 125,
        "revenue": 5625000
      }
    ],
    "popularDestinations": [
      {
        "destination": {
          "name": "Goa Beaches",
          "city": "Panaji"
        },
        "bookingCount": 245,
        "totalRevenue": 11025000
      }
    ]
  }
}
```

## Query Parameters

### Filtering (for GET /api/bookings)

- `userId` - Filter by user ID (admin only)
- `packageId` - Filter by package ID
- `destinationId` - Filter by destination ID
- `status` - Filter by booking status (`draft`, `confirmed`, `cancelled`, `completed`, `refunded`)
- `paymentStatus` - Filter by payment status (`pending`, `partial`, `completed`, `failed`, `refunded`)
- `startDate` - Filter by travel start date (from)
- `endDate` - Filter by travel start date (to)
- `minAmount` - Filter by minimum total amount
- `maxAmount` - Filter by maximum total amount
- `bookingSource` - Filter by booking source

### Pagination

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sort` - Sort criteria (JSON string, default: `{"createdAt": -1}`)

**Example:**
```
GET /api/bookings?status=confirmed&page=1&limit=20&sort={"createdAt":-1}
```

## Error Responses

### 400 Bad Request
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

### 401 Unauthorized
```json
{
  "message": "User not authenticated"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin privileges required."
}
```

### 404 Not Found
```json
{
  "message": "Booking not found"
}
```

### 409 Conflict
```json
{
  "message": "Package not available",
  "error": "Package not available for selected dates"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error creating booking",
  "error": "Database connection failed"
}
```

## Business Rules

### Booking Creation
- User must be authenticated
- Package and destination must exist and be active
- Travel dates must be in the future
- At least one adult traveler required
- Sufficient rooms for travelers (min 1 room per 2 adults)
- Valid pricing calculations
- Availability check for selected dates

### Payment Processing
- Payment amount must be positive
- Cannot pay more than remaining amount
- Automatic status updates based on payment completion
- Transaction history maintained for audit

### Cancellation Policy
- **30+ days before travel**: 10% cancellation fee (90% refund)
- **15-30 days before travel**: 30% cancellation fee (70% refund)
- **7-15 days before travel**: 50% cancellation fee (50% refund)
- **Less than 7 days**: 75% cancellation fee (25% refund)

### Review System
- Reviews only allowed after travel completion
- Rating must be between 1-5
- Comment required (10-1000 characters)
- One review per booking
- Reviews are automatically verified for completed bookings

## Rate Limiting

- **General endpoints**: 100 requests per 15 minutes per user
- **Payment endpoints**: 10 requests per 15 minutes per user
- **Admin endpoints**: 1000 requests per 15 minutes

## Security Features

- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Rate limiting
- Audit logging for all operations
- Encrypted sensitive data storage
