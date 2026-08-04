# Event Management System

A **student-focused event management system** for university campuses, student clubs, and online communities. Built with a modern, cross-platform stack supporting both web and mobile, with offline capabilities.

---

## Features

| Feature | Description |
|---------|-------------|
| 📅 **Event Management** | Create, publish, and manage events (online/offline/hybrid) |
| ✅ **Attendance Tracking** | QR code registration & real-time check-in |
| 📋 **Logistics Coordination** | Item checklists, assignments, and status tracking |
| 💬 **Feedback Collection** | Post-event ratings, comments, and anonymous responses |
| 📊 **Analytics Dashboard** | Event statistics and attendance reports |
| 🔔 **Notifications** | In-app event alerts and reminders |
| 📱 **Mobile App** | Native iOS/Android app with QR scanner |
| 🌐 **PWA Support** | Works offline via service worker caching |
| 🔒 **Role-based Access** | Student / Organizer / Admin roles |

---

## Architecture

```bash
┌─────────────────────────────────────────────┐
│                 Clients                     │
│  Web App (React/Vite/PWA)  |  Mobile (Expo) │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         REST API (Node.js + Express)        │
│   Auth | Events | Attendance | Feedback     │
│   Logistics | Users | Notifications         │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│         PostgreSQL (via Prisma ORM)         │
└─────────────────────────────────────────────┘
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- (Mobile only) Expo CLI

### Option 1: Docker (Recommended)

```bash
# Clone the repo
git clone https://github.com/Shakiran-Nannyombi/Event-management.git
cd Event-management

# Start all services (API + PostgreSQL + Frontend)
docker-compose up -d

# Seed the database with sample data
docker exec eventms-backend npm run prisma:seed
```

Services will be available at:

- **Frontend**: <http://localhost:5173>
- **Backend API**: <http://localhost:5000>
- **Health check**: <http://localhost:5000/health>

### Option 2: Manual Setup

#### Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Run database migrations
npx prisma migrate dev

# Seed with sample data
npm run prisma:seed

# Start development server
npm run dev
```

#### Frontend (Web)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:5173
```

#### Mobile App

```bash
cd mobile

# Install dependencies
npm install

# Start Expo dev server
npm start
# Scan QR code with Expo Go app (iOS/Android)
```

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | <admin@university.edu> | Admin@123 |
| Organizer | <organizer@university.edu> | Organizer@123 |
| Student | <student@university.edu> | Student@123 |

---

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## Project Structure

```bash
Event-management/
├── backend/              # Node.js + Express + TypeScript REST API
│   ├── prisma/
│   │   └── schema.prisma # Database schema (Users, Events, Attendance, etc.)
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   │   ├── auth.controller.ts
│   │   │   ├── event.controller.ts
│   │   │   ├── attendance.controller.ts
│   │   │   ├── feedback.controller.ts
│   │   │   └── logistics.controller.ts
│   │   ├── middleware/   # Auth (JWT), validation, error handling
│   │   ├── routes/       # API route definitions
│   │   └── utils/        # Config, logger, Prisma client, seed data
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/             # React + TypeScript + Vite + Tailwind web app
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/   # Layout, Navbar
│   │   │   └── events/   # EventCard
│   │   ├── context/      # AuthContext
│   │   ├── pages/        # Login, Register, Events, Dashboard, etc.
│   │   ├── services/     # API client wrappers
│   │   └── types/        # TypeScript definitions
│   └── Dockerfile
│
├── mobile/               # React Native + Expo mobile app
│   ├── app/              # Expo Router screens
│   └── src/
│       ├── components/   # EventsScreen, ScannerScreen, LoginScreen
│       └── context/      # AuthContext with SecureStore
│
├── docs/
│   └── proposal.md       # Full project proposal
│
├── docker-compose.yml    # Full-stack orchestration
└── README.md
```

---

## API Reference

### Auth

```bash
POST   /api/auth/register        # Create account
POST   /api/auth/login           # Login
GET    /api/auth/me              # Current user
PUT    /api/auth/change-password # Update password
```

### Events

```bash
GET    /api/events               # List (supports ?search=&mode=&status=&page=&limit=)
POST   /api/events               # Create (Organizer/Admin)
GET    /api/events/:id           # Details
PUT    /api/events/:id           # Update
DELETE /api/events/:id           # Delete
PATCH  /api/events/:id/publish   # Publish
GET    /api/events/:id/stats     # Statistics
```

### Attendance

```bash
POST   /api/attendance/events/:id/register  # Register for event
DELETE /api/attendance/events/:id/cancel    # Cancel registration
GET    /api/attendance/events/:id           # Event attendees (Organizer)
GET    /api/attendance/my                   # My registrations
POST   /api/attendance/check-in             # Check in via QR
POST   /api/attendance/check-out            # Check out via QR
```

### Feedback

```bash
POST   /api/feedback/events/:id     # Submit feedback
GET    /api/feedback/events/:id     # Event feedback summary (Organizer)
PUT    /api/feedback/:id            # Update feedback
```

### Logistics

```bash
GET    /api/logistics/events/:id    # Event logistics
POST   /api/logistics/events/:id    # Add item
PUT    /api/logistics/:id           # Update item
DELETE /api/logistics/:id           # Delete item
```

---

## Constraints Met

| Requirement | Implementation |
|-------------|---------------|
| Cross-platform | React Web PWA + React Native mobile app |
| Offline support | Service worker (web) + AsyncStorage/offline queries (mobile) |
| Device-agnostic | Responsive Tailwind CSS, ES2020 target, progressive enhancement |
| Attendance tracking | QR code generation + real-time scanner check-in |
| Logistics coordination | Per-event item tracking with assignment and status |
| Feedback collection | Star ratings, comments, anonymous option, aggregated insights |
| Usability | Clean UI, accessible markup, keyboard navigation |
| Inclusivity | Works on older devices, PWA for low-bandwidth environments |

---

## Security

- JWT authentication with configurable expiry
- Bcrypt password hashing (12 rounds)
- Rate limiting (100 requests per 15 minutes)
- Helmet.js HTTP security headers
- CORS with explicit allow-list
- Role-based access control
- Input validation on all endpoints

---

## License

MIT — See [LICENSE](LICENSE) for details.
