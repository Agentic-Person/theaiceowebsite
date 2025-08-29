import { supabase } from '@/lib/supabase';

export interface ImageUploadResult {
  url: string | null;
  error: string | null;
  path: string | null;
}

/**
 * Upload an image to Supabase Storage
 */
export async function uploadBlogImage(file: File): Promise<ImageUploadResult> {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return {
        url: null,
        error: 'Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.',
        path: null
      };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        url: null,
        error: 'File too large. Maximum size is 5MB.',
        path: null
      };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `blog-images/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        url: null,
        error: 'Failed to upload image. Please try again.',
        path: null
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return {
      url: publicUrl,
      error: null,
      path: filePath
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      url: null,
      error: 'An unexpected error occurred during upload.',
      path: null
    };
  }
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteBlogImage(path: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.storage
      .from('blog-images')
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return { error: 'Failed to delete image.' };
    }

    return { error: null };
  } catch (error) {
    console.error('Delete error:', error);
    return { error: 'An unexpected error occurred during deletion.' };
  }
}

/**
 * Compress and resize image before upload
 */
export function compressImage(file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      // Set canvas size
      canvas.width = width;
      canvas.height = height;

      // Draw and compress image
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Image compression failed'));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => reject(new Error('Image loading failed'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Validate image dimensions
 */
export function validateImageDimensions(file: File, minWidth?: number, minHeight?: number): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      const valid = (!minWidth || img.width >= minWidth) && (!minHeight || img.height >= minHeight);
      resolve(valid);
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      resolve(false);
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
  });
}