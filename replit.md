# ShopWave - Next.js E-commerce Application

## Overview
This is a Next.js-based e-commerce application that has been configured to run in the Replit environment. The app features user authentication, product browsing, shopping cart functionality, and a clean UI built with Radix UI components and Tailwind CSS.

## Recent Changes
- **2025-09-17**: Initial setup for Replit environment
  - Installed all project dependencies
  - Configured Next.js for Replit proxy environment
  - Updated dev/start scripts to use port 5000 and bind to 0.0.0.0
  - Set up frontend workflow configuration
  - Configured deployment settings for autoscale
  - Removed .env.local from repository (credentials should be in Replit Secrets)

## Project Architecture
- **Frontend**: Next.js 15.5.3 with React 18
- **Styling**: Tailwind CSS with Radix UI components
- **Database**: MongoDB with Mongoose (requires external connection)
- **Authentication**: JWT-based with bcryptjs for password hashing
- **Build System**: Next.js with Turbopack for development

## Required Environment Variables
The following environment variables must be configured in Replit Secrets for production deployment:

- `MONGODB_URI`: MongoDB connection string (e.g., MongoDB Atlas)
- `JWT_SECRET`: Strong secret key for JWT token generation
- `NODE_ENV`: Should be set to "production" for deployment

## Development Workflow
- Development server runs on port 5000
- Frontend workflow: `npm run dev`
- Hot reload enabled with Turbopack
- Binds to 0.0.0.0 to work with Replit's proxy system

## Deployment Configuration
- **Target**: Autoscale (stateless web application)
- **Build Command**: `npm run build`
- **Start Command**: `npm run start` (respects PORT environment variable)
- **Port**: Defaults to 5000, but will use $PORT in production

## Key Features
- Product catalog with categories (Electronics, Apparel, Books, Home Goods)
- User authentication (signup/login)
- Shopping cart functionality
- Wishlist management
- Responsive design
- Admin interface (basic setup)

## Database Setup
The application expects a MongoDB database. For production:
1. Set up MongoDB Atlas (free tier available)
2. Add the connection string to Replit Secrets as `MONGODB_URI`
3. Ensure network access is configured for Replit's IP ranges

## User Preferences
- Follows standard Next.js project structure
- Uses modern React patterns with hooks and context
- TypeScript configuration with build error ignoring enabled
- ESLint and Jest testing configured

## Deployment Steps
Before deploying to production:
1. Configure Replit Secrets:
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `JWT_SECRET`: Strong random secret for JWT tokens
   - `NODE_ENV`: Set to "production"
2. Deploy using Replit's autoscale deployment
3. Verify health: Check that root path "/" returns 200 and signup/login endpoints work

## Known Development Issues (Non-blocking)
- Cross-origin warnings in development (normal with Replit proxy)
- Hydration warnings (common with client-side components)
- These warnings don't affect functionality but should be addressed for production