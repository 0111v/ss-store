# Task 01: Template Cleanup

## Status: Review
## Priority: High
## Assignee: Claude (Arm Instance)
## Created: 2025-09-11
## Updated: 2025-09-11
## Estimated Time: 1-2 hours

## Objective
Remove Supabase template files and documentation while preserving all functional authentication components and business logic. Clean up the codebase to focus on SS-STORE functionality.

## Requirements
- [ ] Remove template documentation files
- [ ] Remove unused template UI components
- [ ] Remove tutorial system completely
- [ ] Preserve all functional auth components
- [ ] Verify no broken imports after cleanup
- [ ] Ensure application builds and runs successfully

## Files to Remove

### Documentation
- [ ] `README.md` - Supabase template documentation
- [ ] `REBUILD_GUIDE.md` - Training guide (no longer needed)

### Template UI Components
- [ ] `components/hero.tsx` - Original Supabase template hero
- [ ] `components/deploy-button.tsx` - Vercel deployment button
- [ ] `components/next-logo.tsx` - Next.js logo component
- [ ] `components/supabase-logo.tsx` - Supabase logo component  
- [ ] `components/env-var-warning.tsx` - Environment warning component

### Tutorial System
- [ ] `components/tutorial/` - Remove entire directory
  - [ ] `components/tutorial/code-block.tsx`
  - [ ] `components/tutorial/connect-supabase-steps.tsx`
  - [ ] `components/tutorial/fetch-data-steps.tsx`
  - [ ] `components/tutorial/sign-up-user-steps.tsx`
  - [ ] `components/tutorial/tutorial-step.tsx`

## Files to PRESERVE (DO NOT REMOVE)

### Functional Auth Components
- ✅ `components/login-form.tsx` - Used by `/auth/login` page
- ✅ `components/sign-up-form.tsx` - Used by `/auth/sign-up` page  
- ✅ `components/forgot-password-form.tsx` - Used by `/auth/forgot-password` page
- ✅ `components/update-password-form.tsx` - Used by `/auth/update-password` page

### Core Business Components
- ✅ `components/auth-button.tsx` - Navigation authentication button
- ✅ `components/logout-button.tsx` - Logout functionality
- ✅ `components/hero1.tsx` - Custom SS-STORE hero component
- ✅ `components/theme-switcher.tsx` - Dark/light mode toggle
- ✅ `components/ui/*` - All shadcn/ui components
- ✅ `components/providers/*` - React Query and other providers

## Implementation Steps
1. **Backup Check**: Verify git status shows clean working directory
2. **Remove Files**: Delete specified template files one by one
3. **Import Scan**: Search for imports of removed components
4. **Fix Imports**: Update any remaining references to removed files
5. **Build Test**: Run `npm run build` to verify no errors
6. **Development Test**: Run `npm run dev` to test application
7. **Functional Test**: Verify auth pages and products functionality

## Success Criteria
- [ ] All specified template files are removed (8 files + 1 directory)
- [ ] No broken imports or TypeScript errors
- [ ] `npm run build` completes successfully
- [ ] `npm run dev` starts without errors
- [ ] Authentication system fully functional:
  - [ ] Login page renders (`/auth/login`)
  - [ ] Signup page renders (`/auth/sign-up`)
  - [ ] Forgot password page renders (`/auth/forgot-password`)
  - [ ] Update password page renders (`/auth/update-password`)
- [ ] Products CRUD system remains intact (`/products`)
- [ ] Navigation and theme switching work correctly
- [ ] Main page displays custom hero component

## Verification Commands
```bash
# Check for broken imports
grep -r "hero\|deploy-button\|next-logo\|supabase-logo\|env-var-warning\|tutorial" --include="*.tsx" --include="*.ts" .

# Build verification
npm run build

# Development server
npm run dev
```

## Implementation Notes
**Execution Log:**
- ✅ Pre-flight verification completed - git clean, build passing
- ✅ Removed 2 documentation files: `README.md`, `REBUILD_GUIDE.md`
- ✅ Removed 5 template UI components: `hero.tsx`, `deploy-button.tsx`, `next-logo.tsx`, `supabase-logo.tsx`, `env-var-warning.tsx`
- ✅ Removed complete tutorial system directory: `components/tutorial/` (5 files)
- ✅ Scanned for broken imports - only legitimate references remain (`hero1` custom component, utils comment)
- ✅ Build verification passed successfully with same warnings as before
- ✅ Development server tested - starts cleanly on port 3001

**Total files removed:** 7 individual files + 1 directory (5 files) = 12 files removed

**Verification results:**
- `npm run build` ✅ Success (same warnings as baseline)
- `npm run dev` ✅ Success (starts on port 3001)
- No broken imports found after cleanup
- All functional components preserved as specified

**Post-cleanup fix applied:**
- ⚠️ **Issue discovered:** Login/password update redirected to deleted `/protected` pages
- ✅ **Fixed:** Updated redirects to point to `/products` page instead
  - `components/login-form.tsx:31` - changed `/protected` → `/products`
  - `components/update-password-form.tsx:29` - changed `/protected` → `/products`
- ✅ **Verified:** Build still passes, auth flow now works correctly

## Review Notes
[Space for coordinator feedback]

## Dependencies
- None

## Blocks
- Task 02 (Future feature development)