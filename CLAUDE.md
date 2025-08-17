# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Start
```bash
npm run build          # Build the NestJS application
npm run start          # Start in production mode
npm run start:dev      # Start in development with watch mode
npm run start:debug    # Start in debug mode with watch
npm run start:prod     # Start production build
```

### Testing
```bash
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:debug     # Run tests in debug mode
npm run test:e2e       # Run end-to-end tests
```

### Code Quality
```bash
npm run lint           # Run ESLint with auto-fix
npm run format         # Format code with Prettier
```

### Git Commands (Available in package.json)
```bash
npm run update         # Pull latest changes from git
npm run igonre-edits   # Reset hard and ignore local changes (typo in original)
```

## Architecture Overview

This is a **NestJS-based certificate generation and verification system** with the following key components:

### Core Modules
- **CertificatesModule**: Main business logic for certificate generation, verification, and management
- **AuthModule**: JWT-based authentication with Passport
- **UsersModule**: User management and authentication
- **PaymentModule**: Multi-provider payment processing (Stripe, PayPal, PayID19)
- **SubscriptionsModule**: Subscription management for users
- **EmailModule**: Email services with Mailgun integration
- **DatabaseModule**: TypeORM configuration with SQLite

### Database Architecture
- **Database**: SQLite (database.sqlite in root)
- **ORM**: TypeORM with auto-sync enabled
- **Entities**: Certificate, User, Transaction, Subscription, Settings

### Certificate System
The application generates PDF certificates with multiple templates:
- **Templates**: 8 different certificate templates (Template_1 through Template_8)
- **PDF Generation**: Uses pdf-lib for dynamic certificate creation
- **Components**: Each certificate includes both a certificate and ID card
- **QR Codes**: Generated for verification using the verify endpoint
- **File Storage**: Certificates stored in `/certificates` directory

### Key Features
- **Multi-template Support**: 8 predefined certificate templates with customizable positioning
- **PDF Processing**: Dynamic text overlay on certificate templates with QR code generation
- **Email Integration**: Automated certificate delivery via email
- **Verification System**: Public certificate verification via unique IDs
- **Payment Integration**: Support for Stripe, PayPal, and PayID19
- **Settings Management**: Configurable certificate settings per template

### Web Interface
- **View Engine**: EJS templates in `/views` directory
- **Static Files**: Public assets served from `/public`
- **Routes**: RESTful API with web interface for certificate management

### Configuration
- **Environment**: Uses dotenv for configuration
- **Session**: Express sessions with secret key
- **CORS**: Enabled for all origins
- **Port**: Defaults to 4000 or process.env.PORT

### File Structure Patterns
- Controllers handle HTTP requests and responses
- Services contain business logic
- Entities define database models
- DTOs for data transfer objects
- Spec files for tests alongside source files

### Important Implementation Details
- Certificate IDs are generated as 10-digit numeric strings (except Template_8 which uses 22-character alphanumeric)
- QR codes link to verification URL: `{BASE_URL}/certificates/verify/{certificateId}`
- Email templates support placeholder replacement for dynamic content
- Multiple file outputs per certificate: combined PDF, certificate PDF, and ID card PDF