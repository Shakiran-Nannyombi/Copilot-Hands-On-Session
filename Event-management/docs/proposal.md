# Event Management System — Project Proposal

**Title:** Draft Event Management System Proposal  
**Version:** 1.0  
**Date:** April 2024  

---

## 1. Executive Summary

This document presents a proposal for a **Student-Focused Event Management System** designed for university campuses, student clubs, and online student communities. The system provides a comprehensive platform for creating, managing, and tracking events while ensuring inclusivity through cross-platform, device-agnostic design.

---

## 2. Problem Statement

Student communities face significant challenges in organizing events:

- **Fragmented tools**: Attendance is tracked via spreadsheets, feedback via paper forms, and logistics via email chains.
- **Accessibility gaps**: Not all students have access to high-end devices or reliable internet, leading to exclusion.
- **Poor insights**: Organizers lack actionable data to improve future events.
- **Multi-mode complexity**: Managing hybrid (online + offline) events is cumbersome without integrated tooling.

---

## 3. Proposed Solution

A **unified, cross-platform event management system** with three main interfaces:

| Interface | Technology | Purpose |
|-----------|-----------|---------|
| Web App | React + TypeScript + Vite | Full-featured browser experience |
| Mobile App | React Native + Expo | iOS/Android with offline support |
| Backend API | Node.js + Express + TypeScript | REST API + data layer |

---

## 4. Core Features

### 4.1 Event Management
- Create, edit, publish, and cancel events
- Support for **Online**, **Offline**, and **Hybrid** modes
- Event scheduling with agenda/session management
- Capacity management
- Tag-based event categorization

### 4.2 Attendance Tracking
- Student registration with unique **QR code** generation
- Real-time **QR code check-in** via mobile scanner
- Check-in/check-out timestamps
- Attendance reporting per event
- Export attendance lists

### 4.3 Logistics Coordination
- Per-event logistics checklist
- Item assignment to team members
- Status tracking (pending → confirmed → delivered)
- Notes and quantity management

### 4.4 Feedback Collection
- Post-event star rating (1–5) system
- Optional written comments
- Anonymous feedback option for honest responses
- Aggregated statistics (average rating, distribution)
- Insights viewable by organizers and admins

### 4.5 User Management
- Role-based access: **Student**, **Organizer**, **Admin**
- JWT-based secure authentication
- Profile management with student ID support
- Admin panel for user oversight

### 4.6 Notifications
- In-app notification system
- Event reminders and updates

---

## 5. Technical Architecture

```
┌────────────────────────────────────────────────────┐
│                    Clients                         │
│  ┌──────────────────┐    ┌──────────────────────┐  │
│  │   Web App        │    │   Mobile App         │  │
│  │ (React/Vite/PWA) │    │ (React Native/Expo)  │  │
│  └────────┬─────────┘    └──────────┬───────────┘  │
└───────────┼──────────────────────────┼─────────────┘
            │                          │
            ▼                          ▼
┌───────────────────────────────────────────────────┐
│              REST API (Node.js/Express)            │
│  Authentication │ Events │ Attendance │ Feedback  │
│  Logistics      │ Users  │ Schedules  │ Notifs    │
└───────────────────────┬───────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────┐
│              PostgreSQL Database                   │
│         (Prisma ORM for type-safe queries)        │
└───────────────────────────────────────────────────┘
```

### Data Models
- **Users** — Students, Organizers, Admins with role-based permissions
- **Events** — Full lifecycle management (Draft → Published → Ongoing → Completed)
- **Attendances** — QR-code-linked registration with check-in/out timestamps
- **Feedback** — Ratings + comments with anonymous option
- **Logistics** — Item tracking per event
- **Schedules** — Session/agenda items per event
- **Notifications** — User-specific event alerts

---

## 6. Cross-Platform & Accessibility Design

| Constraint | Solution |
|-----------|---------|
| Cross-platform | React (web PWA) + React Native (iOS/Android) |
| Offline support | Service Worker caching (web), AsyncStorage (mobile), offline-first queries |
| Device-agnostic | Responsive Tailwind CSS, progressive enhancement |
| Low bandwidth | Paginated API responses, image optimization, lazy loading |
| Accessibility | ARIA labels, keyboard navigation, high-contrast support |
| Older devices | ES2020 target, no experimental APIs, graceful degradation |

---

## 7. Security

- **JWT** authentication with configurable expiry
- **Bcrypt** password hashing (12 rounds)
- **Rate limiting** on all API endpoints (100 req/15 min)
- **Helmet.js** HTTP security headers
- **CORS** with explicit allow-list
- Role-based access control on all protected routes
- Input validation with `express-validator`

---

## 8. Technology Stack Summary

### Backend
| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20 LTS | Runtime |
| Express | 4.x | HTTP framework |
| TypeScript | 5.x | Type safety |
| Prisma | 5.x | ORM |
| PostgreSQL | 15 | Primary database |
| JWT | 9.x | Authentication |
| Bcrypt | 2.x | Password hashing |
| Winston | 3.x | Logging |

### Frontend (Web)
| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI library |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| React Query | 5.x | Server state + caching |
| React Router | 6.x | Client routing |
| Vite PWA | 0.17 | Offline / PWA support |
| Zod | 3.x | Schema validation |

### Mobile
| Tool | Version | Purpose |
|------|---------|---------|
| React Native | 0.73 | Cross-platform mobile |
| Expo | 50 | Development toolchain |
| Expo Router | 3.x | File-based navigation |
| Expo Camera | 14.x | QR code scanning |
| Expo Secure Store | 12.x | Encrypted token storage |
| React Query | 5.x | Data fetching |

---

## 9. Project Structure

```
Event-management/
├── backend/              # Express REST API
│   ├── prisma/           # Database schema & migrations
│   ├── src/
│   │   ├── controllers/  # Business logic handlers
│   │   ├── middleware/   # Auth, validation, error handling
│   │   ├── routes/       # API route definitions
│   │   └── utils/        # Config, logger, Prisma client
│   └── Dockerfile
├── frontend/             # React Web App
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React context (auth, etc.)
│   │   ├── pages/        # Route-level page components
│   │   ├── services/     # API service layer
│   │   └── types/        # TypeScript type definitions
│   └── Dockerfile
├── mobile/               # React Native App
│   ├── app/              # Expo Router file-based routes
│   └── src/
│       ├── components/   # Screen & UI components
│       ├── context/      # Auth context
│       └── services/     # API service layer
├── docs/                 # Project documentation
├── docker-compose.yml    # Full-stack orchestration
└── README.md
```

---

## 10. API Endpoints

### Authentication
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/register | Create new account |
| POST | /api/auth/login | Authenticate user |
| GET | /api/auth/me | Get current user |
| PUT | /api/auth/change-password | Update password |

### Events
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/events | List events (with filters) |
| POST | /api/events | Create event (Organizer/Admin) |
| GET | /api/events/:id | Get event details |
| PUT | /api/events/:id | Update event |
| DELETE | /api/events/:id | Delete event |
| PATCH | /api/events/:id/publish | Publish event |
| GET | /api/events/:id/stats | Get event statistics |

### Attendance
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/attendance/events/:id/register | Register for event |
| DELETE | /api/attendance/events/:id/cancel | Cancel registration |
| GET | /api/attendance/events/:id | Get event attendees |
| GET | /api/attendance/my | Get user's registrations |
| POST | /api/attendance/check-in | Check in via QR code |
| POST | /api/attendance/check-out | Check out via QR code |

### Feedback
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/feedback/events/:id | Submit feedback |
| GET | /api/feedback/events/:id | Get event feedback (Organizer) |
| PUT | /api/feedback/:id | Update feedback |

### Logistics
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/logistics/events/:id | Get logistics list |
| POST | /api/logistics/events/:id | Add logistics item |
| PUT | /api/logistics/:id | Update item |
| DELETE | /api/logistics/:id | Delete item |

---

## 11. Getting Started

See [README.md](../README.md) for full setup instructions.

---

## 12. Future Enhancements

- [ ] Email notifications via SendGrid/SES
- [ ] Push notifications (mobile)
- [ ] Event analytics dashboard with charts
- [ ] Multi-language (i18n) support
- [ ] Social sharing of events
- [ ] Calendar integration (Google Calendar, iCal)
- [ ] Waitlist management
- [ ] Sponsorship/resource tracking module
- [ ] Student club management module
- [ ] Integration with university LMS systems
