# Zwawla - Stadium Management Platform

[![CI/CD](https://github.com/zwawla/frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/zwawla/frontend/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

A modern, professional stadium management platform for booking football stadiums, organizing matches, and managing facilities in Algeria.

## 🚀 Features

- **Stadium Management**: Create, update, and manage stadium listings
- **Booking System**: Real-time booking with payment processing
- **Match Organization**: Create and manage football matches
- **Analytics Dashboard**: Track revenue, bookings, and performance
- **User Profiles**: Manage user information and preferences
- **Responsive Design**: Mobile-first, works on all devices
- **Real-time Updates**: Live data synchronization
- **Secure Authentication**: JWT-based authentication system

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## 🏁 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zwawla/frontend.git
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure environment variables (see [Environment Variables](#environment-variables))

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3004](http://localhost:3004) in your browser

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Tailwind CSS** for styling

## 🏗️ Building

Build the application for production:

```bash
npm run build
```

The build output will be in the `.next` directory.

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Docker

1. Build the Docker image:
```bash
docker build -t zwawla-frontend .
```

2. Run the container:
```bash
docker run -p 3004:3004 zwawla-frontend
```

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📁 Project Structure

```
zwawla-frontend/
├── app/                      # Next.js app directory
│   ├── analytics/           # Analytics dashboard
│   ├── bookings/            # Booking management
│   │   ├── [id]/           # Booking details
│   │   ├── hooks/          # Booking hooks
│   │   └── services/       # Booking services
│   ├── login/              # Authentication
│   ├── matches/            # Match management
│   │   ├── [id]/          # Match details
│   │   ├── hooks/         # Match hooks
│   │   └── services/      # Match services
│   ├── overview/           # Dashboard
│   ├── profile/            # User profile
│   ├── signup/             # User registration
│   └── stadiums/           # Stadium management
│       ├── [id]/          # Stadium details
│       ├── hooks/         # Stadium hooks
│       └── services/      # Stadium services
├── components/             # Reusable components
│   ├── layout/            # Layout components
│   ├── providers/         # Context providers
│   └── ui/                # UI components
├── lib/                   # Utility libraries
│   ├── api.ts            # API client
│   ├── authService.ts    # Authentication service
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── .github/              # GitHub workflows
│   └── workflows/        # CI/CD pipelines
├── docs/                 # Documentation
└── tests/                # Test files
```

## 🔌 API Integration

The application integrates with the Zwawla Backend API:

### Base URL
```
http://localhost:3000
```

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Key Endpoints

#### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout user

#### Stadiums
- `GET /stadiums` - List all stadiums
- `GET /stadiums/:id` - Get stadium details
- `POST /stadiums` - Create stadium
- `PUT /stadiums/:id` - Update stadium
- `DELETE /stadiums/:id` - Delete stadium

#### Bookings
- `GET /bookings` - List user bookings
- `GET /bookings/:id` - Get booking details
- `POST /bookings` - Create booking
- `POST /bookings/:id/cancel` - Cancel booking
- `POST /bookings/:id/payment` - Process payment

#### Matches
- `GET /matches` - List all matches
- `GET /matches/:id` - Get match details
- `POST /matches` - Create match
- `POST /matches/:id/join` - Join match
- `POST /matches/:id/leave` - Leave match

For complete API documentation, see [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)

## 🎨 Design System

### Colors
- **Primary**: Emerald (#10b981)
- **Secondary**: Blue (#3b82f6)
- **Accent**: Purple (#a855f7)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: text-sm to text-xl
- **Body**: text-xs to text-sm
- **Labels**: text-xs

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Padding**: p-2 to p-4
- **Gaps**: gap-2 to gap-3
- **Margins**: my-2 to my-3

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

### Coverage
```bash
npm run test:coverage
```

## 📊 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 200KB (gzipped)

## 🔒 Security

- JWT-based authentication
- HTTPS only in production
- CSRF protection
- XSS prevention
- Input validation
- Rate limiting
- Secure headers

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Team**: Next.js, TypeScript, Tailwind CSS
- **Backend Team**: Node.js, PostgreSQL, Prisma
- **DevOps Team**: CI/CD, Docker, Vercel

## 📞 Support

- **Email**: support@zwawla.com
- **Documentation**: [docs.zwawla.com](https://docs.zwawla.com)
- **Issues**: [GitHub Issues](https://github.com/zwawla/frontend/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TanStack Query](https://tanstack.com/query)
- [Lucide Icons](https://lucide.dev/)

---

Made with ❤️ by the Zwawla Team
