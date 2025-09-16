# Task 05: Product Soft Delete Migration

## Status: Ready
## Priority: High
## Assignee: Unassigned
## Created: 2025-09-15
## Updated: 2025-09-15
## Estimated Time: 2-3 hours

## Objective
Migrate the products table from hard delete to soft delete by adding a `deleted_at` timestamp column and updating all repository methods to filter out deleted products. This prepares the foundation for the future sales system by preserving product data integrity and historical references.

## Requirements
- [ ] Add `deleted_at` column to products table
- [ ] Update all repository methods to filter out deleted products
- [ ] Modify delete functionality to set `deleted_at` instead of removing records
- [ ] Update frontend product list to show only active products
- [ ] Ensure existing functionality is preserved
- [ ] Add database index for performance

## Database Changes

### Schema Migration
```sql
-- Add updated_at column (currently missing)
ALTER TABLE products ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();

-- Add soft delete column to products table
ALTER TABLE products ADD COLUMN deleted_at TIMESTAMP NULL;

-- Create index for performance on filtered queries
CREATE INDEX idx_products_deleted_at ON products(deleted_at);

-- Update existing products to have current timestamp for updated_at
UPDATE products SET updated_at = created_at WHERE updated_at IS NULL;
```

**Migration Notes:**
- All existing products will have `deleted_at = NULL` (active state)
- Existing products will have `updated_at` set to their `created_at` value
- No complex data migration required
- Foreign key constraints remain unchanged

## Repository Updates

### File: `lib/repositories/products.repo.ts`

**Methods to Update:**

#### 1. Get All Products
```typescript
// BEFORE
async getProducts() {
  return await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
}

// AFTER
async getProducts() {
  return await supabase
    .from('products')
    .select('*')
    .is('deleted_at', null)  // Only active products
    .order('created_at', { ascending: false });
}
```

#### 2. Get Product by ID
```typescript
// BEFORE
async getProductById(id: string) {
  return await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
}

// AFTER
async getProductById(id: string) {
  return await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)  // Only if not deleted
    .single();
}
```

#### 3. Delete Product (Change to Soft Delete)
```typescript
// BEFORE
async deleteProduct(id: string) {
  return await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .select()
    .single();
}

// AFTER
async deleteProduct(id: string) {
  return await supabase
    .from('products')
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
}
```

#### 4. Update Product (No Change Needed)
```typescript
// Remains the same - updates work on deleted products too
async updateProduct(id: string, productData: ProductUpdate) {
  return await supabase
    .from('products')
    .update({
      ...productData,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
}
```

#### 5. Create Product (No Change Needed)
```typescript
// Remains the same - new products are active by default (deleted_at = null)
async createProduct(productData: ProductInsert) {
  return await supabase
    .from('products')
    .insert(productData)
    .select()
    .single();
}
```

## TypeScript Type Updates

### File: `types/products.types.ts`

```typescript
// Add deleted_at to Product interface
export interface Product {
  id: string;
  name: string;
  quantity: number;
  purchase_price: number;
  sale_price: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ProductInsert and ProductUpdate remain the same
// (deleted_at is managed by the system, not user input)
```

## Frontend Updates

### File: `app/(front)/products/page.tsx`
**No changes needed** - DataTable will automatically show filtered results from repository

### File: `app/(front)/products/delete-product-button.tsx`
**No changes needed** - Uses repository method which will be updated to soft delete

### File: `app/(front)/products/data-table.tsx`
**No changes needed** - Displays data from repository which filters deleted products

## Validation Schema Updates

### File: `lib/schemas/products.schema.ts`
**No changes needed** - Soft delete is handled at repository level, not user input level

## Implementation Steps

### Phase 1: Database Migration (30 minutes)
- [ ] Add `updated_at` column with default value
- [ ] Run database migration to add `deleted_at` column
- [ ] Create performance index on `deleted_at`
- [ ] Update existing products to have `updated_at = created_at`
- [ ] Verify all existing products have `deleted_at = NULL`

### Phase 2: Repository Updates (1 hour)
- [ ] Update `getProducts()` method to filter deleted products
- [ ] Update `getProductById()` method to filter deleted products
- [ ] Change `deleteProduct()` method to soft delete
- [ ] Update TypeScript Product interface
- [ ] Test all repository methods

### Phase 3: Testing & Verification (1 hour)
- [ ] Test product list shows only active products
- [ ] Test product deletion sets `deleted_at` timestamp
- [ ] Test product creation/editing still works
- [ ] Verify "deleted" products don't appear in lists
- [ ] Test product selection in existing forms (add/edit dialogs)

### Phase 4: Build & Deploy (30 minutes)
- [ ] Run `npm run build` to verify no TypeScript errors
- [ ] Test all existing product functionality
- [ ] Verify no breaking changes in UI

## Success Criteria
- [ ] `updated_at` column added to products table with default value
- [ ] `deleted_at` column added to products table with index
- [ ] All repository methods filter out deleted products automatically
- [ ] All repository methods update `updated_at` timestamp on changes
- [ ] Product deletion sets timestamp instead of removing record
- [ ] Product list shows only active products
- [ ] Product creation and editing functionality preserved
- [ ] Product selection in dialogs shows only active products
- [ ] TypeScript Product interface includes both new fields
- [ ] `npm run build` succeeds with no errors
- [ ] All existing product workflows function correctly
- [ ] No breaking changes to existing functionality

## Testing Checklist

### Manual Testing Scenarios
```bash
# 1. Product List
#    - Verify only active products show in list
#    - Delete a product, verify it disappears from list
#    - Create new product, verify it appears in list

# 2. Product Dialogs
#    - Add Product Dialog: Should work normally
#    - Edit Product Dialog: Should work for active products only
#    - Product selection: Should show only active products

# 3. Database Verification
#    - Check deleted products have deleted_at timestamp
#    - Verify active products have deleted_at = NULL
#    - Confirm foreign key constraints still work

# 4. Build Verification
npm run build
```

### Database Testing Queries
```sql
-- Verify soft delete working
SELECT id, name, deleted_at FROM products WHERE deleted_at IS NOT NULL;

-- Verify active products
SELECT COUNT(*) FROM products WHERE deleted_at IS NULL;

-- Test foreign key integrity (should still work)
SELECT * FROM sale_items si
JOIN products p ON si.product_id = p.id
WHERE p.deleted_at IS NOT NULL;
```

## Benefits for Future Sales System
- ✅ **Historical Integrity**: Sales can reference deleted products without data loss
- ✅ **Business Analytics**: Product performance tracking preserved over time
- ✅ **Data Recovery**: Manual recovery possible through database if needed
- ✅ **Clean Architecture**: Repository layer handles filtering automatically

## Migration Safety
- **Zero Downtime**: Adding nullable column doesn't affect existing queries
- **Backwards Compatible**: Existing code works during migration
- **Rollback Plan**: Can remove `deleted_at` column if needed (though not recommended)
- **Data Safety**: No data loss during migration

## Future Considerations (Not in Scope)
- **Admin Interface**: UI to view/restore deleted products (manual DB recovery for now)
- **Bulk Operations**: Restore multiple products at once
- **Audit Trail**: Track who deleted products and when
- **Cascade Rules**: Handle related data when products are deleted

## Implementation Notes
[Space for developer to add notes during implementation]

## Review Notes
[Space for coordinator feedback]

## Dependencies
- Depends on: Current products table structure
- Depends on: Existing repository pattern

## Blocks
- Task 06 (Sales System) - needs this foundation for data integrity

---

**Note**: This migration prioritizes minimal changes and maximum safety. The soft delete implementation provides the foundation for robust sales system data integrity while maintaining all existing functionality.
