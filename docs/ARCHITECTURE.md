# Architecture Documentation

## 📐 System Architecture

### Overview

Zwawla is built using a modern, scalable architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Next.js 15 (App Router)                  │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │   Pages    │  │ Components │  │   Hooks    │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │  Services  │  │    API     │  │   Utils    │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend API                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Node.js + Express                        │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │Controllers │  │  Services  │  │Middleware  │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       PostgreSQL                             │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Frontend Architecture

### Layer Structure

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Pages, Components, UI)                │
├─────────────────────────────────────────┤
│         Business Logic Layer            │
│  (Hooks, Services, State Management)    │
├─────────────────────────────────────────┤
│         Data Access Layer               │
│  (API Client, Cache, Storage)           │
├─────────────────────────────────────────┤
│         Infrastructure Layer            │
│  (Utils, Config, Types)                 │
└─────────────────────────────────────────┘
```

### Directory Structure

```
app/
├── (auth)/              # Authentication routes
│   ├── login/
│   └── signup/
├── (dashboard)/         # Protected routes
│   ├── overview/
│   ├── stadiums/
│   ├── bookings/
│   ├── matches/
│   ├── analytics/
│   └── profile/
├── api/                 # API routes (if needed)
├── layout.tsx           # Root layout
└── page.tsx             # Home page

components/
├── layout/              # Layout components
│   ├── NavBar.tsx
│   └── TopNavBar.tsx
├── ui/                  # Reusable UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
└── providers/           # Context providers
    └── QueryProvider.tsx

lib/
├── api.ts               # API client
├── authService.ts       # Authentication
├── types.ts             # TypeScript types
└── utils.ts             # Utility functions
```

## 🔄 Data Flow

### Request Flow

```
User Action
    │
    ▼
Component
    │
    ▼
Hook (useQuery/useMutation)
    │
    ▼
Service Layer
    │
    ▼
API Client (axios)
    │
    ▼
Backend API
    │
    ▼
Database
```

### State Management

```
┌─────────────────────────────────────────┐
│         Server State                    │
│  (TanStack Query)                       │
│  - API data caching                     │
│  - Automatic refetching                 │
│  - Optimistic updates                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         Client State                    │
│  (React State + Context)                │
│  - UI state                             │
│  - Form state                           │
│  - Local preferences                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         Persistent State                │
│  (localStorage)                         │
│  - Auth tokens                          │
│  - User preferences                     │
│  - Theme settings                       │
└─────────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌──────────┐
│  Login  │────▶│  API    │────▶│  JWT    │────▶│localStorage│
│  Page   │     │ Request │     │  Token  │     │           │
└─────────┘     └─────────┘     └─────────┘     └──────────┘
                                      │
                                      ▼
                              ┌──────────────┐
                              │ Axios        │
                              │ Interceptor  │
                              │ (Auto-inject)│
                              └──────────────┘
                                      │
                                      ▼
                              ┌──────────────┐
                              │ Protected    │
                              │ API Requests │
                              └──────────────┘
```

## 📦 Component Architecture

### Component Hierarchy

```
App
├── Layout
│   ├── NavBar
│   │   └── NavItem
│   └── TopNavBar
│       └── SearchBar
├── Pages
│   ├── Overview
│   │   ├── StatsCards
│   │   ├── BookingTrendsGraph
│   │   └── RecentBookingsTable
│   ├── Stadiums
│   │   ├── StadiumCard
│   │   └── StadiumFilters
│   └── ...
└── Providers
    ├── QueryProvider
    └── AuthProvider
```

### Component Patterns

#### Container/Presentational Pattern

```typescript
// Container (Smart Component)
export default function StadiumsPage() {
  const { data, isLoading } = useStadiums();
  return <StadiumsList stadiums={data} loading={isLoading} />;
}

// Presentational (Dumb Component)
interface StadiumsListProps {
  stadiums: Stadium[];
  loading: boolean;
}

export function StadiumsList({ stadiums, loading }: StadiumsListProps) {
  if (loading) return <Loader />;
  return <div>{stadiums.map(s => <StadiumCard key={s.id} stadium={s} />)}</div>;
}
```

#### Custom Hooks Pattern

```typescript
// Hook encapsulates logic
export function useStadiums(page: number) {
  return useQuery({
    queryKey: ['stadiums', page],
    queryFn: () => stadiumsService.getAllStadiums(page),
  });
}

// Component uses hook
export default function StadiumsPage() {
  const { data, isLoading, error } = useStadiums(1);
  // ...
}
```

## 🔌 API Integration

### Service Layer

```typescript
// Service handles API calls
export const stadiumsService = {
  getAllStadiums: async (page: number) => {
    const response = await api.get('/stadiums', { params: { page } });
    return response.data;
  },
  
  getStadiumById: async (id: string) => {
    const response = await api.get(`/stadiums/${id}`);
    return response.data;
  },
};
```

### Hook Layer

```typescript
// Hook provides React Query integration
export const useStadiums = (page: number) => {
  return useQuery({
    queryKey: ['stadiums', page],
    queryFn: () => stadiumsService.getAllStadiums(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

## 🎨 Styling Architecture

### Tailwind CSS Utility-First

```typescript
// Component with Tailwind classes
<div className="px-2 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
  Content
</div>
```

### Design System

```typescript
// colors.ts
export const colors = {
  primary: '#10b981',    // emerald-600
  secondary: '#3b82f6',  // blue-600
  accent: '#a855f7',     // purple-600
};

// spacing.ts
export const spacing = {
  xs: '0.5rem',  // 2
  sm: '0.75rem', // 3
  md: '1rem',    // 4
  lg: '1.5rem',  // 6
};
```

## 🚀 Performance Optimization

### Code Splitting

```typescript
// Dynamic imports
const Analytics = dynamic(() => import('./Analytics'), {
  loading: () => <Loader />,
});
```

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/stadium.jpg"
  alt="Stadium"
  width={800}
  height={600}
  loading="lazy"
/>
```

### Caching Strategy

```typescript
// React Query cache configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      cacheTime: 10 * 60 * 1000,     // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

## 🔒 Security Architecture

### Authentication

- JWT tokens stored in localStorage
- Automatic token injection via Axios interceptors
- Token refresh on 401 errors
- Secure logout with token cleanup

### Authorization

- Route protection with middleware
- Role-based access control
- API endpoint validation

### Data Protection

- Input sanitization
- XSS prevention
- CSRF protection
- HTTPS only in production

## 📊 Monitoring & Logging

### Error Tracking

```typescript
// Sentry integration
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Analytics

```typescript
// Google Analytics
gtag('event', 'page_view', {
  page_path: window.location.pathname,
});
```

## 🧪 Testing Strategy

### Unit Tests
- Components
- Hooks
- Utilities
- Services

### Integration Tests
- API integration
- User flows
- Form submissions

### E2E Tests
- Critical user journeys
- Authentication flow
- Booking process

## 📈 Scalability

### Horizontal Scaling
- Stateless architecture
- CDN for static assets
- Load balancing

### Vertical Scaling
- Code splitting
- Lazy loading
- Optimized bundles

### Caching
- React Query cache
- Browser cache
- CDN cache

## 🔄 Deployment Pipeline

```
Code Push
    │
    ▼
GitHub Actions
    │
    ├─▶ Lint & Type Check
    ├─▶ Run Tests
    ├─▶ Build Application
    │
    ▼
Deploy to Vercel
    │
    ├─▶ Staging (develop branch)
    └─▶ Production (main branch)
```

---

Last Updated: January 2026
