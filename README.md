# E-commerce Application

## Overview

full-stack e-commerce web application built with React and Express.js. The system provides a complete shopping experience with product browsing, cart management, user authentication, and an admin interface for product management. The application features a modern, responsive design using shadcn/ui components and Tailwind CSS styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## Features

- Browse and search products
- Filter products by categories and price
- Add products to cart
- Responsive design for mobile and desktop
- Smooth UI/UX with animations

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Framer Motion
- **State Management:** React Hooks
- **Icons:** Lucide React
- **Package Manager:** npm
- **Backend:** Node.js/Express and MongoDB (for APIs and storage)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 18.x)
- npm (>= 9.x)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dLomas26/single-page.git

# ShopFlow E-commerce Application

## Overview

ShopFlow is a full-stack e-commerce web application built with React and Express.js. The system provides a complete shopping experience with product browsing, cart management, user authentication, and an admin interface for product management. The application features a modern, responsive design using shadcn/ui components and Tailwind CSS styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management with optimistic updates
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Handling**: React Hook Form with Zod validation for type-safe forms

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Authentication**: Passport.js with local strategy using scrypt for password hashing
- **Session Management**: Express sessions with PostgreSQL session store
- **API Design**: RESTful endpoints with JSON responses and comprehensive error handling
- **Database Layer**: Drizzle ORM for type-safe database operations and migrations

### Database Schema
The application uses PostgreSQL with three main entities:
- **Users**: Authentication and user management with username/password
- **Products**: Product catalog with name, description, price, category, and image URL
- **Cart Items**: Shopping cart functionality linking users to products with quantities

### Authentication & Authorization
- **Strategy**: Session-based authentication using Passport.js local strategy
- **Security**: Password hashing with scrypt and salt, secure session configuration
- **Route Protection**: Middleware-based authentication checks for protected routes
- **Session Storage**: PostgreSQL-backed session store for persistence

### Development Tools
- **Build System**: Vite for fast development builds and hot module replacement
- **Type Safety**: TypeScript across the entire stack with shared types
- **Database Management**: Drizzle Kit for schema migrations and database operations
- **Code Quality**: ESLint and TypeScript strict mode for code consistency

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **Connection Pooling**: Neon serverless connection pooling for efficient database access

### UI Component Libraries
- **Radix UI**: Headless UI primitives for accessible component foundation
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel functionality for product displays

### Development Services
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Google Fonts**: Web fonts (Open Sans, DM Sans, Fira Code, Geist Mono) for typography

### Utility Libraries
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Utility for managing conditional CSS classes
- **Zod**: Runtime type validation for forms and API requests
- **Nanoid**: Unique ID generation for database records