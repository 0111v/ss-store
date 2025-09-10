# Muscle Memory Template - Complete Rebuild Guide

This guide contains everything you need to rebuild this project from absolute zero. Follow it step by step to build the muscle memory for full-stack development.

## 🎯 What You're Building

A complete Next.js app with:
- **CRUD operations** for products
- **Authentication system** with Supabase
- **Row Level Security** (RLS)
- **Layered architecture** 
- **Comprehensive testing**
- **Modern UI** with shadcn/ui

---

## 📦 Dependencies to Install

### Core Framework
```bash
npx create-next-app@latest muscle-memory --typescript --tailwind --eslint --app --src-dir
cd muscle-memory
```

### Essential Dependencies
```bash
# Database & Auth
npm install @supabase/supabase-js @supabase/ssr

# Validation & Type Safety
npm install zod

# State Management
npm install zustand @tanstack/react-query

# UI Components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input label form card dialog table toast

# Testing
npm install -D jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (front-end)/
│   │   └── products/
│   │       ├── page.tsx
│   │       └── layout.tsx
│   ├── api/
│   │   └── products/
│   │       ├── route.ts
│   │       ├── [id]/route.ts
│   │       └── __tests__/
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── schemas/
│   │   ├── products.schema.ts
│   │   └── auth.schema.ts
│   ├── repositories/
│   │   ├── products.repo.ts
│   │   └── __tests__/
│   ├── services/
│   │   ├── products.service.ts
│   │   ├── auth.service.ts
│   │   └── __tests__/
│   ├── stores/
│   │   └── auth.store.ts
│   ├── queries/
│   │   └── products.queries.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── test-client.ts
│   └── utils/
├── types/
│   ├── products.types.ts
│   └── auth.types.ts
├── components/
│   └── auth/
│       └── AuthInitializer.tsx
└── middleware.ts
```

---

## 🏗️ Architecture Layers

### 1. **Schema Layer** (Validation)
- **Purpose**: Define data validation rules with Zod
- **Location**: `src/lib/schemas/`
- **Pattern**:
```typescript
// products.schema.ts
export const productsValidation = {
  product: z.object({
    id: z.uuid(),
    name: z.string(),
    quantity: z.number().int().nonnegative(),
    // ...
  }),
  productInsert: z.object({
    name: z.string(),
    quantity: z.coerce.number().int().nonnegative(),
    // ...
  })
}
```

### 2. **Types Layer** (Type Safety)
- **Purpose**: Infer TypeScript types from schemas
- **Location**: `src/types/`
- **Pattern**:
```typescript
// products.types.ts
export type Product = z.infer<typeof productsValidation.product>
export type ProductInsert = z.infer<typeof productsValidation.productInsert>
```

### 3. **Repository Layer** (Database)
- **Purpose**: Direct database operations with Supabase
- **Location**: `src/lib/repositories/`
- **Pattern**:
```typescript
// products.repo.ts
export const productsRepository = {
  async fetchProducts(): Promise<Product[]> {
    const supabase = await createClient()
    const { data, error } = await supabase.from('products').select('*')
    if (error) throw error
    return data
  }
}
```

### 4. **Service Layer** (Business Logic)
- **Purpose**: HTTP calls to API routes, business logic
- **Location**: `src/lib/services/`
- **Pattern**:
```typescript
// products.service.ts
export const productsService = {
  async fetchProducts(): Promise<Product[]> {
    const res = await fetch('/api/products')
    return res.json()
  }
}
```

### 5. **API Routes** (HTTP Endpoints)
- **Purpose**: Next.js API routes, validation, error handling
- **Location**: `src/app/api/`
- **Pattern**:
```typescript
// api/products/route.ts
export async function GET() {
  try {
    const products = await productsRepository.fetchProducts()
    return Response.json(products)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
```

### 6. **Store Layer** (Global State)
- **Purpose**: Global state with Zustand (for auth, not CRUD)
- **Location**: `src/lib/stores/`
- **Pattern**:
```typescript
// auth.store.ts
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: async (credentials) => { /* ... */ }
}))
```

### 7. **Query Layer** (Server State)
- **Purpose**: Server state management with React Query
- **Location**: `src/lib/queries/`
- **Pattern**:
```typescript
// products.queries.ts
export const useFetchProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.fetchProducts()
  })
}
```

### 8. **Component Layer** (UI)
- **Purpose**: React components with shadcn/ui
- **Location**: `src/app/` and `src/components/`

---

## 🔄 Build Order (CRUD First!)

### Phase 1: Basic CRUD (No Auth)

1. **Project Setup**
   ```bash
   npx create-next-app@latest muscle-memory --typescript --tailwind --eslint --app --src-dir
   npm install dependencies...
   npx shadcn-ui@latest init
   ```

2. **Supabase Setup**
   - Create project
   - Create `products` table
   - Get environment variables
   - Set up client files

3. **Schema + Types**
   ```typescript
   // 1. Create products.schema.ts
   // 2. Create products.types.ts
   ```

4. **Repository Layer**
   ```typescript
   // Create products.repo.ts with all CRUD operations
   ```

5. **API Routes**
   ```typescript
   // Create /api/products routes
   // Test with Postman/curl
   ```

6. **Service Layer**
   ```typescript
   // Create products.service.ts
   ```

7. **Query Layer**
   ```typescript
   // Set up React Query
   // Create products.queries.ts
   ```

8. **UI Components**
   ```typescript
   // Create products page
   // List, Create, Edit, Delete
   ```

9. **Testing**
   ```typescript
   // Set up Jest
   // Test repository, API routes, services
   ```

✅ **Checkpoint**: You have working CRUD!

### Phase 2: Add Authentication

10. **RLS Policies**
    ```sql
    -- Add user_id column to products
    -- Create RLS policies
    -- CRUD breaks here! 😅
    ```

11. **Auth Schema + Types**
    ```typescript
    // auth.schema.ts
    // auth.types.ts
    ```

12. **Auth Service**
    ```typescript
    // auth.service.ts with login/signup
    ```

13. **Auth Store**
    ```typescript
    // Zustand store for global auth state
    ```

14. **Auth Pages**
    ```typescript
    // Login/signup pages
    ```

15. **Middleware**
    ```typescript
    // Route protection
    ```

16. **Fix CRUD for Auth**
    ```typescript
    // Update queries to include user context
    // Add user-scoped cache keys
    ```

17. **Update Tests**
    ```typescript
    // Add auth to all tests
    // Create test-client.ts
    ```

✅ **Checkpoint**: Complete authenticated system!

---

## 🧪 Testing Patterns

### Repository Tests
```typescript
// Mock server client, use real auth
jest.mock('../../supabase/server', () => ({
  createClient: () => createTestClient()
}))

beforeEach(async () => {
  const supabase = createTestClient()
  await supabase.auth.signInWithPassword({
    email: '1@gmail.com',
    password: '123456'
  })
})
```

### API Route Tests
```typescript
// Same pattern as repository tests
// Test HTTP responses, error handling
```

### Service Tests
```typescript
// Mock fetch, unit test the service logic
beforeEach(() => {
  global.fetch = jest.fn()
})
```

---

## 🔑 Key Patterns to Remember

### 1. Schema-First Development
Always start with Zod schemas, infer types from them.

### 2. Layer Separation
- **Repository**: Database operations
- **Service**: HTTP calls + business logic  
- **API Routes**: HTTP endpoints
- **Queries**: Server state management
- **Stores**: Global client state

### 3. Error Handling
```typescript
// Services: throw errors
if (error) throw error

// API routes: catch and return HTTP errors
try {
  // ...
} catch (error) {
  return Response.json({ error }, { status: 500 })
}
```

### 4. Authentication Flow
```
User → Auth Store → Auth Service → Supabase Auth
                ↓
              Middleware (route protection)
                ↓  
              Components (user context)
                ↓
              Queries (user-scoped data)
```

### 5. RLS Security
- Database enforces user isolation
- No user_id passing in application code
- Supabase handles it automatically

---

## ⏰ Time Expectations

- **1st rebuild**: 12-15 hours (learning patterns)
- **2nd rebuild**: 8-10 hours (muscle memory forming)
- **3rd+ rebuild**: 4-6 hours (confident execution)

---

## 🎯 Success Metrics

You've built the muscle memory when you can:
- Set up the project structure without thinking
- Know which layer handles what responsibility
- Debug issues by knowing where to look
- Add new features following the same patterns
- Write tests that actually test the right things

**Remember**: The goal isn't to memorize code, but to internalize the **decision patterns** that make you fast and confident in real projects!