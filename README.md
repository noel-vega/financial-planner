# 💰 Financial Planner

A modern, full-stack expense tracking application built with a focus on clean architecture, type safety, and developer experience.

## 🎯 Project Goals

This application demonstrates professional-grade patterns for building scalable full-stack TypeScript applications:

- **Type-Safe Full Stack** - End-to-end type safety from database to UI using Drizzle ORM, tRPC, and Zod
- **Monorepo Architecture** - Clean separation of concerns with shared packages
- **Modern Stack** - React, TanStack Router, TanStack Query, and TanStack Table
- **Production Patterns** - Custom resolvers, responsive design, and optimized bundle splitting
- **Developer Experience** - Hot reload, type checking, and automated tooling

## ✨ Features

- 📊 **Expense Tracking** - Add, view, and categorize monthly expenses
- 📈 **Visual Analytics** - Interactive pie charts for expense breakdown
- 🔍 **Smart Filtering** - Real-time search and category filtering
- 📱 **Responsive Design** - Mobile-friendly interface with adaptive layouts
- ⚡ **Optimized Performance** - Client-side filtering, pagination, and sorting
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS

## 🏗️ Architecture

```
financial-planner/
├── packages/
│   ├── models/      # Database schemas, types, and Zod validation
│   ├── db/          # Database connection and migrations (PostgreSQL + Drizzle)
│   ├── api/         # tRPC API server
│   └── web/         # React frontend (Vite + TanStack Router)
├── .github/         # CI/CD workflows
└── turbo.json       # Turborepo configuration
```

### Package Dependencies

```
models → (standalone - types, schemas, table definitions)
   ↓
  db → models (database runtime + connection)
   ↓
  api → models + db (tRPC routes)
   ↓
  web → models (frontend - NO database code in bundle)
```

This architecture prevents accidental database code from being bundled into the frontend while maintaining shared type safety.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/noel-vega/financial-planner.git
   cd financial-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your database connection:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/financial_planner
   ```

4. **Start the database**
   ```bash
   cd packages/db
   npm run dev  # Starts PostgreSQL via Docker Compose
   ```

5. **Push database schema**
   ```bash
   npm run db:push
   ```

6. **Start the development server**
   ```bash
   # In the root directory
   npm run dev
   ```

   This starts:
   - 🎨 Frontend: http://localhost:5173
   - 🔌 API: http://localhost:3000

## 📦 Available Scripts

### Root Level
- `npm run dev` - Start all packages in development mode
- `npm install` - Install all dependencies

### Database (`packages/db`)
- `npm run dev` - Start PostgreSQL via Docker
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:generate` - Generate migration files

### Frontend (`packages/web`)
- Development runs automatically via `turbo dev`
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### API (`packages/api`)
- Development runs automatically via `turbo dev`
- `npm run build` - Build for production

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Router** - File-based routing
- **TanStack Query** - Data fetching and caching
- **TanStack Table** - Powerful table with sorting, filtering, pagination
- **shadcn/ui** - Beautiful, accessible components
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Icon library

### Backend
- **tRPC** - End-to-end type-safe APIs
- **Express** - HTTP server
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Relational database
- **Zod** - Schema validation

### Tooling
- **Turborepo** - Monorepo build system
- **Biome** - Linting and formatting
- **Docker** - Database containerization

## 📁 Project Structure

```
packages/
├── models/
│   ├── src/
│   │   ├── tables/    # Drizzle table definitions
│   │   ├── schemas/   # Zod validation schemas
│   │   └── types/     # TypeScript types
│   └── package.json
│
├── db/
│   ├── src/
│   │   └── index.ts   # Database connection
│   ├── drizzle/       # Migration files
│   └── drizzle.config.ts
│
├── api/
│   ├── src/
│   │   ├── trpc/      # tRPC router and procedures
│   │   └── main.ts    # Express server
│   └── package.json
│
└── web/
    ├── src/
    │   ├── components/  # React components
    │   ├── routes/      # TanStack Router routes
    │   ├── lib/         # Utilities and helpers
    │   └── main.tsx     # Application entry point
    └── package.json
```

## 🎨 Key Design Decisions

### Custom Zod Resolver
To avoid Zod version conflicts between packages, we implemented a custom resolver for React Hook Form instead of using `@hookform/resolvers`. This provides:
- Version independence
- Full control over validation
- Zero dependencies

### Bundle Optimization
The `models` package contains only schema definitions and types (no database runtime), allowing the frontend to import validation schemas without bundling PostgreSQL drivers or connection code.

## 🔧 Development Tips

### Adding a New Component
```bash
cd packages/web
npx shadcn@latest add <component-name>
```

### Database Changes
1. Modify tables in `packages/models/src/tables/`
2. Run `npm run db:push` from `packages/db`
3. Update schemas in `packages/models/src/schemas/` if needed

### Adding a New Route
Create a file in `packages/web/src/routes/`:
```tsx
// packages/web/src/routes/settings.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: Settings,
})

function Settings() {
  return <div>Settings Page</div>
}
```

## 📝 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# API (optional)
PORT=3000
```

## 🤝 Contributing

This is a portfolio project demonstrating modern TypeScript patterns. Feel free to explore the code and use it as a reference for your own projects.

## 📄 License

MIT

---

**Built with** ❤️ **and** ☕ **by** [Noel Vega](https://github.com/noel-vega)
