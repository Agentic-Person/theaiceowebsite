# Storage Policy Fix

## Issue
Image uploads are failing with "new row violates row-level security policy" error.

## Fix Required
Run this SQL in your Supabase SQL editor:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Enable public read for blog images" ON storage.objects;
DROP POLICY IF EXISTS "Enable upload for authenticated users" ON storage.objects;

-- Create new policies for blog-images bucket
CREATE POLICY "Enable public read for blog images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'blog-images');

CREATE POLICY "Enable upload for authenticated users" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete for authenticated users" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);
```

## Alternative
If the above doesn't work, temporarily disable RLS on storage.objects:

```sql
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

**Note:** This removes security restrictions, so re-enable RLS after testing:

```sql
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```