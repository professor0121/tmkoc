# Authentication Middleware

This directory contains authentication and authorization middleware for the TMKOC backend application.

## Overview

The authentication system uses JWT tokens stored in HTTP-only cookies for secure authentication. The middleware provides several levels of protection:

1. **Basic Authentication** - Verifies JWT token and attaches user to request
2. **Role-Based Access Control** - Restricts access based on user roles
3. **Multiple Role Support** - Allows access for users with any of specified roles
4. **Optional Authentication** - Provides user context when available but doesn't require login

## Middleware Functions

### `authMiddleware`

Basic authentication middleware that verifies JWT token and attaches user to request.

```typescript
import { authMiddleware } from "../middleware/auth.middleware";

router.get("/profile", authMiddleware, (req, res) => {
  // req.user is available here
  res.json({ user: req.user });
});
```

**Features:**
- Verifies JWT token from cookies
- Attaches user object to `req.user`
- Returns 401 for invalid/missing tokens
- Returns 401 for non-existent users

### `checkRole(requiredRole: string)`

Role-based access control middleware that requires a specific role.

```typescript
import { checkRole } from "../middleware/auth.middleware";

// Only admin users can access this route
router.get("/admin", checkRole("admin"), (req, res) => {
  res.json({ message: "Admin only content" });
});
```

**Features:**
- Performs authentication first
- Checks if user has the required role
- Returns 403 for insufficient permissions
- Attaches user object to `req.user`

### `checkRoles(allowedRoles: string[])`

Multiple role access control middleware that allows any of the specified roles.

```typescript
import { checkRoles } from "../middleware/auth.middleware";

// Admin or moderator users can access this route
router.get("/moderate", checkRoles(["admin", "moderator"]), (req, res) => {
  res.json({ message: "Admin or moderator content" });
});
```

**Features:**
- Performs authentication first
- Allows access if user has any of the specified roles
- Returns 403 for insufficient permissions
- Attaches user object to `req.user`

### `optionalAuth`

Optional authentication middleware that attaches user if token is valid but doesn't require authentication.

```typescript
import { optionalAuth } from "../middleware/auth.middleware";

router.get("/public", optionalAuth, (req, res) => {
  if (req.user) {
    res.json({ message: "Hello " + req.user.name });
  } else {
    res.json({ message: "Hello anonymous user" });
  }
});
```

**Features:**
- Attempts to authenticate user if token is present
- Continues without error if no token or invalid token
- Attaches user object to `req.user` if authentication succeeds
- Useful for public routes that show different content for logged-in users

## User Object Structure

When authentication succeeds, the user object is attached to `req.user` with the following structure:

```typescript
interface User {
  id: string;      // MongoDB ObjectId as string
  name: string;    // User's display name
  email: string;   // User's email address
  role: string;    // User's role (e.g., "admin", "user")
}
```

## Error Responses

### 401 Unauthorized
Returned when:
- No authentication token is provided
- Token is invalid or expired
- User associated with token doesn't exist

```json
{
  "success": false,
  "message": "Access token required"
}
```

### 403 Forbidden
Returned when:
- User is authenticated but doesn't have required role
- Role-based access control fails

```json
{
  "success": false,
  "message": "Access denied. Required role: admin"
}
```

## Usage Examples

### Basic Protected Route
```typescript
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
    data: "Protected dashboard data"
  });
});
```

### Admin Only Route
```typescript
router.delete("/users/:id", checkRole("admin"), (req, res) => {
  // Only admin users can delete users
  res.json({ success: true, message: "User deleted" });
});
```

### Multiple Role Route
```typescript
router.get("/reports", checkRoles(["admin", "manager"]), (req, res) => {
  // Admin or manager users can view reports
  res.json({ success: true, reports: [] });
});
```

### Public Route with Optional Auth
```typescript
router.get("/posts", optionalAuth, (req, res) => {
  const posts = getPosts();
  
  if (req.user) {
    // Show personalized content for logged-in users
    posts.forEach(post => {
      post.isLiked = checkIfUserLiked(post.id, req.user.id);
    });
  }
  
  res.json({ success: true, posts });
});
```

## Security Features

- **HTTP-Only Cookies**: Tokens stored in HTTP-only cookies prevent XSS attacks
- **Secure Cookies**: HTTPS-only in production environment
- **SameSite Protection**: CSRF protection through SameSite cookie attribute
- **Token Expiration**: 7-day token expiration for security
- **Password Exclusion**: User passwords never included in responses
- **Type Safety**: Full TypeScript support for better development experience
