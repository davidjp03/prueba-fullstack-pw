# 💰 Financial Management System

A full-stack financial management application built with **Next.js 15**, **TypeScript**, **Prisma**, and **PostgreSQL**. Features role-based access control, real-time financial tracking, and comprehensive reporting.

## ✨ Features

- 🔐 **Role-Based Access Control** (Admin/User roles)
- 💸 **Financial Movement Tracking** (Income/Expense)
- 👥 **User Management** (Admin only)
- 📊 **Financial Reports & Charts**
- 📄 **CSV Export Functionality**
- 🔧 **REST API with OpenAPI Documentation**
- 🧪 **Unit Tests with Jest**
- 📱 **Responsive Design with Tailwind CSS**

## 🚀 Local Development Setup

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** database
- **Git**

### 1. Clone Repository

```bash
git clone <repository-url>
cd prueba
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL locally
# Create a new database
createdb financial_management
```

**Option B: Docker PostgreSQL**
```bash
docker run --name postgres-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=financial_management -p 5432:5432 -d postgres:15
```

### 4. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/financial_management"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-here-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 5. Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed database with sample data
npx prisma db seed
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Create First Admin User

1. Register a new account at `/sign-up`
2. Manually update the user role in the database:

```sql
UPDATE "user" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint
```

## 📚 API Documentation

Once running locally, visit:
- **Swagger UI**: [http://localhost:3000/docs](http://localhost:3000/docs)
- **API Base**: [http://localhost:3000/api](http://localhost:3000/api)

## 🌐 Vercel Deployment

### 1. Prepare Database

**Option A: Vercel Postgres**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Create Postgres database
vercel postgres create
```

**Option B: External PostgreSQL**
Use services like:
- [Supabase](https://supabase.com) (Free tier available)
- [Railway](https://railway.app) (Free tier available)
- [Neon](https://neon.tech) (Free tier available)

### 2. Deploy to Vercel

**Method 1: Vercel CLI**
```bash
# Deploy from local machine
vercel

# Follow prompts to configure project
# Set environment variables when prompted
```

**Method 2: GitHub Integration**
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Deploy

### 3. Environment Variables (Vercel)

In Vercel dashboard, add these environment variables:

```env
DATABASE_URL=postgresql://user:pass@host:port/db
BETTER_AUTH_SECRET=your-production-secret
BETTER_AUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 4. Database Migration (Production)

```bash
# Run migrations on production database
npx prisma db push --accept-data-loss

# Generate Prisma client for production
npx prisma generate
```

### 5. Create Production Admin

1. Visit your deployed app
2. Register first user
3. Connect to production database and update role:

```sql
UPDATE "user" SET role = 'ADMIN' WHERE email = 'admin@yourcompany.com';
```

## 🔧 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API endpoints
│   ├── dashboard/      # Admin dashboard
│   ├── user-dashboard/ # User dashboard
│   ├── users/         # User management
│   ├── reports/       # Financial reports
│   └── docs/          # API documentation
├── components/         # UI Components (Atomic Design)
│   ├── atoms/         # Basic elements
│   ├── molecules/     # Component combinations
│   ├── organisms/     # Complex sections
│   └── ui/            # shadcn/ui components
├── lib/               # Utilities
├── types/             # TypeScript definitions
└── hooks/             # Custom React hooks
```

## 🔐 Default User Roles

- **ADMIN**: Full access (CRUD operations, user management, reports)
- **USER**: Read-only access (view movements and personal dashboard)

## 📖 Usage Guide

### Admin Features
- Create/Edit/Delete financial movements
- Manage user accounts and roles
- View financial reports and charts
- Export data to CSV
- Access API documentation

### User Features
- View all financial movements
- Personal dashboard with account info
- Read-only access to financial data

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Better Auth
- **Charts**: Chart.js + React Chart.js 2
- **Testing**: Jest + Testing Library
- **Documentation**: OpenAPI 3.0 + Swagger UI

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check DATABASE_URL format
# Ensure PostgreSQL is running
# Verify database exists
npx prisma db push
```

**Authentication Issues**
```bash
# Check BETTER_AUTH_SECRET is set
# Verify BETTER_AUTH_URL matches your domain
# Clear browser cookies and try again
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

**Need help?** Check the [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) for detailed system documentation.
