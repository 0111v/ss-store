# Task 02: Extract Navigation Bar Component

## Status: Review
## Priority: Medium
## Assignee: User (guided by Claude Brain)
## Created: 2025-09-11
## Updated: 2025-09-11
## Estimated Time: 1-2 hours

## Objective
Extract the inline navigation bar from the home page (`app/page.tsx`) into a reusable component and integrate it into the root layout for consistent navigation across all pages.

## Requirements
- [ ] Create new `Navbar` component from existing home page navigation
- [ ] Integrate navbar into root layout (`app/layout.tsx`)
- [ ] Remove inline navigation from home page
- [ ] Add conditional logic to hide navbar on auth pages
- [ ] Maintain existing functionality (AuthButton, ThemeSwitcher, brand link)
- [ ] Preserve responsive design and styling
- [ ] Ensure proper TypeScript types

## Current Navigation Code (from app/page.tsx)
```tsx
<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
  <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
    <div className="flex gap-5 items-center font-semibold">
      <Link href={"/"}>SS STORE</Link>
      <div className="flex items-center gap-2">
      </div>
    </div>
    <div className="flex gap-3">
      <AuthButton />
      <ThemeSwitcher />
    </div>
  </div>
</nav>
```

## Implementation Steps

### Phase 1: Component Creation
- [ ] Create `components/navbar.tsx` component
- [ ] Extract navigation JSX from `app/page.tsx:12-24`
- [ ] Import required dependencies (`Link`, `AuthButton`, `ThemeSwitcher`)
- [ ] Add proper TypeScript types and exports

### Phase 2: Layout Integration
- [ ] Add `Navbar` import to `app/layout.tsx`
- [ ] Place navbar component after providers but before `{children}`
- [ ] Adjust layout structure for proper flex layout
- [ ] Update `<main>` wrapper to account for navbar

### Phase 3: Page Cleanup
- [ ] Remove navbar JSX from `app/page.tsx`
- [ ] Remove unused navigation-related classes from main container
- [ ] Test home page still displays Hero1 component correctly

### Phase 4: Conditional Display Logic
- [ ] Add logic to hide navbar on auth pages (`/auth/*`)
- [ ] Use `usePathname()` hook for route detection
- [ ] Ensure navbar shows on: `/`, `/products`, other app pages
- [ ] Ensure navbar hides on: `/auth/login`, `/auth/sign-up`, etc.

## Files to Modify

### New Files
- [ ] `components/navbar.tsx` - New reusable navigation component

### Modified Files
- [ ] `app/layout.tsx` - Add navbar to root layout
- [ ] `app/page.tsx` - Remove inline navigation, clean up structure

## Success Criteria
- [ ] New `Navbar` component created with identical functionality
- [ ] Navbar appears on all pages except auth pages
- [ ] Home page displays cleanly without inline navigation
- [ ] Products page now has navigation bar
- [ ] All navigation functionality preserved:
  - [ ] SS STORE brand link works (routes to `/`)
  - [ ] AuthButton component functions correctly
  - [ ] ThemeSwitcher component functions correctly
- [ ] Responsive design maintained
- [ ] No TypeScript errors
- [ ] `npm run build` succeeds
- [ ] All pages render correctly

## Verification Steps
```bash
# Build check
npm run build

# Development server
npm run dev

# Manual testing checklist:
# 1. Visit / - navbar present, Hero1 displays
# 2. Visit /products - navbar present, products table displays  
# 3. Visit /auth/login - no navbar, login form displays
# 4. Click SS STORE brand - routes to home
# 5. Test AuthButton functionality
# 6. Test ThemeSwitcher functionality
```

## Implementation Notes
**Execution Summary:**
Task completed successfully using Brain-Arm coordination approach. User implemented all code while receiving guidance.

**Phase 1: Component Creation**
- ✅ Created `components/ui/navbar.tsx` with extracted navigation JSX
- ✅ Added proper imports: `Link`, `AuthButton`, `ThemeSwitcher`
- ✅ Used TypeScript with proper exports

**Phase 2: Layout Integration**
- ✅ Added `Navbar` import to `app/layout.tsx`
- ✅ Initially placed navbar before ThemeProvider (caused ThemeSwitcher issue)
- ✅ **Issue resolved:** Moved navbar inside ThemeProvider to fix theme context access
- ✅ Positioned navbar after providers but before `{children}`

**Phase 3: Page Cleanup**
- ✅ Removed navbar JSX from `app/page.tsx` (lines 12-24)
- ✅ Cleaned up unused imports (`AuthButton`, `Link`, `ThemeSwitcher`)
- ✅ Simplified page structure while preserving Hero1 component

**Phase 4: Conditional Display Logic**
- ✅ Added `"use client"` directive to navbar component
- ✅ Implemented `usePathname()` hook from `next/navigation`
- ✅ Added conditional logic: `if (pathname?.startsWith("/auth")) return null;`
- ✅ Tested successfully - navbar hidden on all `/auth/*` pages

**Key Learning Moments:**
1. **React Context Hierarchy:** ThemeSwitcher failed when navbar was outside ThemeProvider
2. **Client vs Server Components:** Needed `"use client"` for `usePathname()` hook
3. **Component Return Types:** Learned difference between `return null` vs `return` (undefined)

**Files Modified:**
- `components/ui/navbar.tsx` (new) - Reusable navbar component with conditional rendering
- `app/layout.tsx` - Added navbar to root layout inside ThemeProvider
- `app/page.tsx` - Removed inline navigation, cleaned up imports and structure

**Build & Verification:**
- ✅ `npm run build` passes successfully  
- ✅ All pages render correctly
- ✅ Navbar appears on: `/`, `/products` 
- ✅ Navbar hidden on: `/auth/login`, `/auth/sign-up`, `/auth/forgot-password`, `/auth/update-password`
- ✅ All functionality preserved: brand link, AuthButton, ThemeSwitcher
- ✅ Responsive design maintained
- ✅ No TypeScript errors

## Review Notes
[Space for coordinator feedback]

## Dependencies
- Depends on: Task 01 (Template Cleanup)

## Blocks
- None currently