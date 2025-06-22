# TMKOC Tourism Frontend

A comprehensive React application for tourism management with authentication, routing, and API integration.

## 🚀 Features

- **Authentication System**: Complete login/register with JWT tokens
- **Route Protection**: Role-based access control (user/admin)
- **API Integration**: Axios instance with interceptors
- **State Management**: Redux Toolkit for global state
- **Error Handling**: Error boundaries and global error handling
- **Loading States**: Comprehensive loading indicators
- **Responsive Design**: Tailwind CSS for styling

## 🔧 Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your backend API URL.

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 🔐 Authentication & Routing

### Demo Credentials
- **Admin**: admin@tmkoc.com / password123
- **User**: user@tmkoc.com / password123

### Route Protection
- **Public Routes**: `/`, `/packages`
- **Auth Routes**: `/login`, `/register` (redirect if authenticated)
- **Protected Routes**: `/dashboard` (authentication required)
- **Admin Routes**: `/admin` (admin role required)

## 🌐 API Integration

Uses axios instance with:
- Automatic cookie handling
- Request/response interceptors
- Error handling and logging
- Token refresh capability

## 📚 Key Technologies

- React 18 + Vite
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
