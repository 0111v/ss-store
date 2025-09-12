# Task 04: Enhanced Form System (React Hook Form + Zod + shadcn)

## Status: Ready
## Priority: High  
## Assignee: Unassigned
## Created: 2025-09-11
## Updated: 2025-09-11
## Estimated Time: 4-5 hours

## Objective
Implement a comprehensive form system using React Hook Form + Zod + shadcn/ui to achieve 100% form consistency across the application. Migrate all existing forms (auth forms + product forms) to the new system and establish patterns for future complex forms (sales system).

## Requirements
- [ ] Install React Hook Form, @hookform/resolvers, and shadcn form components
- [ ] Create reusable form patterns and components
- [ ] Migrate ProductDialog to React Hook Form + Zod integration
- [ ] Migrate all auth forms (login, sign-up, forgot-password, update-password)
- [ ] Ensure all forms maintain existing functionality while improving UX
- [ ] Establish form validation patterns for future sales system
- [ ] Remove manual useState form management across the app

## Current Form Analysis

### Products Form (product-dialog.tsx)
- ✅ **Already has Zod**: Uses `productsValidation.productInsert.parse`
- ❌ **Manual state**: Individual useState for each field
- ❌ **No field validation**: Only validates on submit
- ❌ **Manual reset**: Manually clearing form state

### Auth Forms (login-form.tsx, sign-up-form.tsx, etc.)
- ❌ **Basic validation**: HTML required attributes only  
- ❌ **Manual state**: Individual useState for each field
- ❌ **Basic errors**: Simple error text display
- ❌ **No field validation**: Only server-side validation

## Implementation Steps

### Phase 1: Dependencies & Base Components
- [ ] Install dependencies: `npm install react-hook-form @hookform/resolvers`
- [ ] Add shadcn form: `npx shadcn-ui add form`
- [ ] Test shadcn form integration with a simple example

### Phase 2: Enhanced Product Form
- [ ] Migrate `product-dialog.tsx` to React Hook Form
- [ ] Use existing `productsValidation.productInsert` schema with `zodResolver`
- [ ] Replace manual useState with `useForm` hook
- [ ] Add field-level validation with `<FormMessage>`
- [ ] Implement proper form reset after successful submission
- [ ] Test all product CRUD operations (create, edit)

### Phase 3: Auth Forms Migration

#### Login Form (components/login-form.tsx)
- [ ] Create auth validation schema if needed (or use existing patterns)
- [ ] Replace useState with useForm + zodResolver
- [ ] Add field-level validation (email format, password requirements)
- [ ] Integrate with existing `useAuthStore` patterns
- [ ] Maintain existing error handling from auth store

#### Sign-up Form (components/sign-up-form.tsx)
- [ ] Migrate to React Hook Form
- [ ] Add password confirmation validation
- [ ] Add client-side email validation
- [ ] Maintain existing functionality

#### Forgot Password Form (components/forgot-password-form.tsx)
- [ ] Migrate to React Hook Form  
- [ ] Add email validation
- [ ] Maintain existing functionality

#### Update Password Form (components/update-password-form.tsx)
- [ ] Migrate to React Hook Form
- [ ] Add password confirmation validation
- [ ] Add password strength requirements
- [ ] Maintain existing functionality

### Phase 4: Form System Documentation & Patterns
- [ ] Create reusable form component patterns
- [ ] Document form validation strategies (page-level vs field-level errors)
- [ ] Create examples for future sales system forms
- [ ] Test all forms across different scenarios

## Target Architecture

### Form Component Pattern
```tsx
// Example: Enhanced ProductDialog
const form = useForm<ProductInsert>({
  resolver: zodResolver(productsValidation.productInsert),
  defaultValues: product || {
    name: "",
    quantity: 0,
    purchase_price: 0,
    sale_price: 0
  }
})

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter product name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* More fields... */}
    </form>
  </Form>
)
```

### Auth Form Pattern
```tsx
// Example: Enhanced LoginForm
const form = useForm<LoginSchema>({
  resolver: zodResolver(loginValidation),
  defaultValues: { email: "", password: "" }
})

const onSubmit = async (values: LoginSchema) => {
  const success = await signIn(values)
  if (success) router.push("/products")
}
```

### Error Handling Strategy
**Field-Level Validation (use FormMessage from shadcn form):**
- Input format errors (email, password strength)
- Required field validation
- Business rules (quantity > 0, etc.)

**Page-Level Errors (use ErrorMessage + LoadingState from Task 03):**
- Network failures during form submission
- Server authentication errors
- System-level form submission errors

## Files to Create

### New Components
- None (leveraging existing ErrorMessage + LoadingState from Task 03 + FormMessage from shadcn)

### Modified Files
- [ ] `components/sign-up-form.tsx` - Migrate to React Hook Form
- [ ] `components/login-form.tsx` - Migrate to React Hook Form  
- [ ] `components/forgot-password-form.tsx` - Migrate to React Hook Form
- [ ] `components/update-password-form.tsx` - Migrate to React Hook Form
- [ ] `app/(front)/products/product-dialog.tsx` - Migrate to React Hook Form

## Success Criteria
- [ ] All forms use React Hook Form + Zod validation consistently
- [ ] Field-level validation working on all forms
- [ ] Existing functionality preserved across all forms:
  - [ ] Login form works correctly
  - [ ] Sign-up form works correctly  
  - [ ] Password reset flows work correctly
  - [ ] Product creation/editing works correctly
- [ ] Forms show appropriate loading states during submission
- [ ] Error handling works for both field-level and page-level errors
- [ ] Form reset functionality working properly
- [ ] No manual useState form management remaining in codebase
- [ ] `npm run build` succeeds
- [ ] All existing user flows continue to work

## Validation Schema Strategy

### Product Schema (existing)
```tsx
// lib/schemas/products.schema.ts - already exists
export const productsValidation = {
  productInsert: z.object({
    name: z.string().min(1, "Name is required"),
    quantity: z.coerce.number().int().nonnegative("Quantity must be 0 or greater"),
    purchase_price: z.coerce.number().positive("Purchase price must be greater than 0"),
    sale_price: z.coerce.number().positive("Sale price must be greater than 0")
  })
}
```

### Auth Schema (existing)
```tsx
// lib/schemas/auth.schema.ts - already exists and well-designed!
export const authValidation = {
  signIn: z.object({
    email: z.email('Please enter a valid email'),
    password: z.string().min(6, 'password must be at least 6 characters')
  }),
  
  signUp: z.object({
    email: z.email('Please enter a valid email'),
    password: z.string().min(6, 'password must be at least 6 characters'),
    repeatPassword: z.string(),
  }).refine((data) => data.password === data.repeatPassword, { 
    message: `Password don't match`, 
    path: ['repeatPassword']
  }),
  
  forgotPassword: z.object({
    email: z.email('Please enter a valid email')
  }),
  
  updatePassword: z.object({
    password: z.string().min(6, 'Password must be at least 6 characters')
  })
}
```

## Testing Checklist
```bash
# Build verification
npm run build

# Form functionality testing:
# 1. Product Dialog
#    - Create new product with validation
#    - Edit existing product
#    - Test field-level error messages
#    - Test form reset after success

# 2. Authentication Forms
#    - Login with valid/invalid credentials
#    - Sign up with password confirmation
#    - Password reset flow
#    - Update password flow
#    - Test all field validations

# 3. Error Handling
#    - Network errors during form submission
#    - Validation errors display correctly
#    - Loading states show appropriately
```

## Future Sales System Benefits
With this form system, the future sales system will have:
- ✅ Product selection with validation
- ✅ Quantity validation against available stock  
- ✅ Complex multi-field validation
- ✅ Consistent error handling patterns
- ✅ Professional form UX across the app

## Implementation Notes
[Space for developer to add notes during implementation]

## Review Notes
[Space for coordinator feedback]

## Dependencies
- Depends on: Task 03 (Enhanced Loading & Error System)

## Blocks
- Task 05 (Sales feature) - needs form foundation