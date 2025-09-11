# Task 03: Enhanced Loading & Error System

## Status: Ready
## Priority: High
## Assignee: Unassigned
## Created: 2025-09-11
## Updated: 2025-09-11
## Estimated Time: 2-3 hours

## Objective
Create a comprehensive but beginner-friendly loading and error handling system with both page-level state management (LoadingState wrapper) and inline validation components. This foundation will support complex features like the sales system.

## Requirements
- [ ] Create LoadingState wrapper component for page-level states
- [ ] Create individual UI components (Spinner, ErrorMessage, EmptyState, ErrorText)
- [ ] Replace current basic loading/error handling in products page
- [ ] Establish patterns for both page-level and inline error handling
- [ ] Ensure components are reusable and consistent
- [ ] Maintain existing functionality while improving UX

## Current State Analysis
**Current Pattern (products page):**
```tsx
if (isLoading) return <div className="flex min-h-screen justify-center items-center">Loading</div>
if (error) return <div className="flex min-h-screen justify-center items-center">Error</div>
if (!data) return null
```

**Problems with current approach:**
- Inconsistent styling across components
- Basic error messages with no details
- No empty state handling
- Full-screen takeover for simple operations

## Component Specifications

### 1. LoadingState Wrapper Component
**File:** `components/ui/loading-state.tsx`

**Purpose:** Handle page-level states (loading, error, empty) with automatic fallbacks

**Props:**
```tsx
interface LoadingStateProps {
  loading?: boolean
  error?: Error | string | null
  empty?: boolean
  children: React.ReactNode
  
  // Optional customization
  loadingComponent?: React.ReactNode
  errorComponent?: React.ReactNode
  emptyComponent?: React.ReactNode
}
```

**Logic:**
```tsx
if (loading) return loadingComponent || <Spinner />
if (error) return errorComponent || <ErrorMessage error={error} />
if (empty) return emptyComponent || <EmptyState />
return children
```

### 2. Individual UI Components

#### Spinner Component
**File:** `components/ui/spinner.tsx`
- Animated loading spinner
- Optional size variants (sm, md, lg)
- Optional text label

#### ErrorMessage Component  
**File:** `components/ui/error-message.tsx`
- Display error details in a nice card/alert format
- Optional retry button functionality
- Support for different error types (string, Error object, API errors)

#### EmptyState Component
**File:** `components/ui/empty-state.tsx`
- "No data found" states with icon
- Customizable message and optional action button
- Consistent styling for all empty scenarios

#### ErrorText Component
**File:** `components/ui/error-text.tsx`
- Small inline error text (for form validation)
- Red styling, consistent with design system
- Optional icon for visual emphasis

## Implementation Steps

### Phase 1: Create Core Components
- [ ] Create `components/ui/spinner.tsx` with loading animation
- [ ] Create `components/ui/error-message.tsx` with error display and optional retry
- [ ] Create `components/ui/empty-state.tsx` with no-data display
- [ ] Create `components/ui/error-text.tsx` for inline validation

### Phase 2: Create LoadingState Wrapper
- [ ] Create `components/ui/loading-state.tsx` 
- [ ] Implement conditional rendering logic
- [ ] Add TypeScript interfaces and proper exports
- [ ] Test component composition (LoadingState wrapping content)

### Phase 3: Refactor Products Page
- [ ] Update `app/(front)/products/page.tsx` to use LoadingState wrapper
- [ ] Replace current loading/error divs with new system
- [ ] Test all states: loading, error, empty, success
- [ ] Ensure same functionality with better UX

### Phase 4: Documentation & Testing
- [ ] Add usage examples in component files
- [ ] Test error handling with network failures
- [ ] Test empty states with no data
- [ ] Verify consistent styling across all states

## Usage Examples

### Page-Level States (After implementation):
```tsx
// Products page
export default function ProductsPage() {
  const { data, error, isLoading } = useFetchProducts()

  return (
    <div className="container mx-auto py-10">
      <LoadingState 
        loading={isLoading} 
        error={error} 
        empty={!data?.length}
      >
        <DataTable columns={columns} data={data} />
        <AddProductDialog />
      </LoadingState>
    </div>
  )
}
```

### Inline Validation (Future sales form):
```tsx
// Form with inline validation
<Input type="number" value={quantity} onChange={setQuantity} />
{quantityError && <ErrorText>{quantityError}</ErrorText>}

<LoadingState loading={isSubmitting} error={submitError}>
  <Button type="submit">Create Sale</Button>
</LoadingState>
```

## Files to Create

### New Components
- [ ] `components/ui/loading-state.tsx` - Main wrapper component
- [ ] `components/ui/spinner.tsx` - Loading spinner
- [ ] `components/ui/error-message.tsx` - Error display with retry
- [ ] `components/ui/empty-state.tsx` - No data state
- [ ] `components/ui/error-text.tsx` - Inline validation text

### Modified Files  
- [ ] `app/(front)/products/page.tsx` - Update to use LoadingState
- [ ] `components/ui/index.ts` - Add exports (if exists)

## Success Criteria
- [ ] LoadingState wrapper correctly handles all state combinations
- [ ] Products page uses new system and maintains functionality
- [ ] All components have consistent styling and behavior
- [ ] Loading states show spinner instead of basic text
- [ ] Error states show detailed error messages
- [ ] Empty states show appropriate no-data messages  
- [ ] Components are properly typed with TypeScript
- [ ] `npm run build` succeeds with no errors
- [ ] All existing functionality preserved

## Testing Checklist
```bash
# Build verification
npm run build

# Manual testing:
# 1. Products page loading state (refresh while loading)
# 2. Products page error state (disconnect network)  
# 3. Products page empty state (empty database)
# 4. Products page success state (normal operation)
# 5. All components render consistently
# 6. No TypeScript errors in IDE
```

## Error Handling Strategy
**Page-Level Errors (use LoadingState):**
- Network failures (500, timeout)
- Authentication errors (401)
- Permission errors (403)
- General "something went wrong" scenarios

**Inline Errors (use ErrorText):**
- Form validation errors (400 with field details)
- Business rule violations ("Not enough stock")
- User input feedback ("Passwords don't match")

## Implementation Notes
[Space for developer to add notes during implementation]

## Review Notes
[Space for coordinator feedback]

## Dependencies
- Depends on: Task 02 (Navbar extraction)

## Blocks
- Task 04 (Sales feature) - needs this foundation