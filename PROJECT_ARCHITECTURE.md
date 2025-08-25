# Financial Management System - Project Architecture

## 🏗️ **System Overview**

This is a full-stack financial management application built with **Next.js 15**, **TypeScript**, **Prisma**, and **PostgreSQL**. The system implements role-based access control (RBAC) with comprehensive CRUD operations for financial movements.

## 🔐 **Security Architecture**

### Authentication & Authorization
- **Better Auth**: Modern authentication with session management
- **Role-Based Access Control (RBAC)**: Two roles - ADMIN and USER
- **Server-Side Protection**: All routes protected with `requireRole()` function
- **API Security**: JWT-based authentication for all API endpoints

### Security Features
- Session validation on every request
- Role-based UI rendering (admin-only buttons/features)
- Protected API routes with proper error handling
- Automatic redirection for unauthorized access

## 🎨 **Frontend Architecture**

### Atomic Design Pattern
```
Atoms (Basic UI elements)
├── Badge (Movement type indicators)
├── Button (Actions and navigation)
├── Input (Form fields)
└── Select (Dropdowns)

Molecules (Component combinations)
├── MovementCard (Display + actions)
├── CreateMovementForm (Form with validation)
├── EditMovementForm (Inline editing)
├── DashboardHeader (Navigation + user info)
└── StatsCard (Metrics display)

Organisms (Complex sections)
├── MovementsList (Data fetching + display)
├── AdminMovements (CRUD operations)
├── DashboardStats (Financial overview)
└── ReportsSection (Charts + export)

Pages (Full layouts)
├── AdminDashboard (/dashboard)
├── UserDashboard (/user-dashboard)
├── UsersManagement (/users)
└── Reports (/reports)
```

### UI Framework
- **shadcn/ui**: Professional component library
- **Tailwind CSS**: Utility-first styling
- **Chart.js**: Financial data visualization
- **React Hook Form**: Form validation and management

## 🗄️ **Backend Architecture**

### Database Design (Prisma + PostgreSQL)
```sql
-- Core Models
User {
  id: String (Primary Key)
  name: String
  email: String (Unique)
  role: Role (ADMIN | USER)
  movements: Movement[] (One-to-many)
}

Movement {
  id: String (Primary Key)
  concept: String
  amount: Decimal
  type: MovementType (INCOME | EXPENSE)
  date: DateTime
  userId: String (Foreign Key)
  user: User (Many-to-one)
}
```

### API Structure
```
/api/
├── movements/
│   ├── GET    - List all movements (AUTH: USER+)
│   ├── POST   - Create movement (AUTH: ADMIN)
│   └── [id]/
│       ├── PUT    - Update movement (AUTH: ADMIN)
│       └── DELETE - Delete movement (AUTH: ADMIN)
├── users/
│   ├── GET - List users (AUTH: ADMIN)
│   └── [id]/
│       └── PUT - Update user (AUTH: ADMIN)
└── reports/
    └── GET - Financial reports (AUTH: ADMIN)
```

## 📊 **Key Features**

### 1. **Dashboard System**
- **Admin Dashboard**: Full CRUD + user management + reports
- **User Dashboard**: Read-only view with account info
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Optimistic UI with server sync

### 2. **Financial Management**
- **Movement Tracking**: Income/Expense categorization
- **User Assignment**: Track who created each movement
- **Date Management**: Automatic timestamps with manual override
- **Amount Formatting**: Proper currency display

### 3. **User Management** (Admin Only)
- **Role Assignment**: Promote/demote users
- **User Information**: Edit names and roles
- **Access Control**: Prevent self-demotion safeguards

### 4. **Reporting System** (Admin Only)
- **Financial Overview**: Balance, income, expense totals
- **Monthly Breakdown**: Time-series data visualization
- **CSV Export**: Downloadable reports for external analysis
- **Interactive Charts**: Bar charts with Chart.js

### 5. **API Documentation**
- **OpenAPI 3.0**: Complete API specification
- **Swagger UI**: Interactive documentation at `/docs`
- **Request/Response Examples**: Full schema definitions
- **Authentication Guide**: Bearer token usage

## 🧪 **Testing Strategy**

### Unit Tests (Jest + Testing Library)
```
__tests__/
├── requireRole.test.ts      - Security/authorization logic
├── MovementCard.test.tsx    - Component rendering + interactions
└── movements-api.test.ts    - Business logic validation
```

### Test Coverage
- **Security Functions**: Role-based access control
- **UI Components**: Rendering and user interactions
- **Business Logic**: Data validation and formatting
- **API Endpoints**: Authentication and CRUD operations

## 🚀 **Deployment Architecture**

### Environment Setup
```bash
# Development
npm run dev          # Next.js development server
npm run test         # Run unit tests
npm run test:watch   # Watch mode testing

# Production
npm run build        # Build optimized application
npm run start        # Production server
```

### Required Environment Variables
```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
```

## 📁 **Project Structure**
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Admin dashboard
│   ├── user-dashboard/    # User dashboard
│   ├── users/            # User management
│   ├── reports/          # Financial reports
│   └── docs/             # API documentation
├── components/            # UI Components (Atomic Design)
│   ├── atoms/            # Basic elements
│   ├── molecules/        # Component combinations
│   ├── organisms/        # Complex sections
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and configurations
│   ├── auth.ts          # Better Auth setup
│   ├── prisma.ts        # Database client
│   ├── roles.ts         # RBAC functions
│   └── swagger.ts       # API documentation
├── types/                # TypeScript definitions
└── hooks/                # Custom React hooks
```

## 🔄 **Data Flow**

1. **Authentication**: User logs in → Better Auth creates session
2. **Authorization**: Page checks user role → Redirects if unauthorized
3. **Data Fetching**: Component fetches from API → Validates session
4. **User Actions**: Form submission → API validation → Database update
5. **UI Updates**: Optimistic updates → Server confirmation → Sync state

## 🛡️ **Security Considerations**

- **Server-Side Validation**: All inputs validated on backend
- **SQL Injection Prevention**: Prisma ORM with parameterized queries
- **XSS Protection**: React's built-in escaping + CSP headers
- **CSRF Protection**: SameSite cookies + CSRF tokens
- **Role Validation**: Every API call checks user permissions
- **Session Security**: Secure HTTP-only cookies with expiration

This architecture ensures scalability, maintainability, and security while providing a smooth user experience across different roles and devices.