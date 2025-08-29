'use client';

import { useState, useRef } from 'react';
import { uploadBlogImage, compressImage } from '@/lib/imageUpload';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  onError?: (error: string) => void;
  className?: string;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  compress?: boolean;
  disabled?: boolean;
}

export default function ImageUpload({
  onImageUploaded,
  onError,
  className,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  maxSize = 5,
  compress = true,
  disabled = false
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    await handleFileUpload(file);
  };

  const handleFileUpload = async (file: File) => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      const error = `Invalid file type. Please upload: ${acceptedTypes.join(', ')}`;
      onError?.(error);
      return;
    }

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      const error = `File too large. Maximum size is ${maxSize}MB.`;
      onError?.(error);
      return;
    }

    setUploading(true);

    try {
      let fileToUpload = file;

      // Compress image if enabled
      if (compress && file.type.startsWith('image/')) {
        try {
          fileToUpload = await compressImage(file);
        } catch (error) {
          console.warn('Image compression failed, using original:', error);
        }
      }

      // Upload to Supabase
      const result = await uploadBlogImage(fileToUpload);

      if (result.error) {
        onError?.(result.error);
      } else if (result.url) {
        onImageUploaded(result.url);
      }
    } catch (error) {
      onError?.('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled || uploading) return;
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const openFileDialog = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (disabled || uploading) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("relative", className)}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={disabled || uploading}
      />

      {/* Upload area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200",
          dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
          disabled ? "cursor-not-allowed opacity-50" : "",
          uploading ? "bg-gray-50" : "hover:bg-gray-50"
        )}
        style={{
          borderColor: dragOver ? '#36b0d9' : 'rgba(89, 109, 140, 0.3)',
          backgroundColor: dragOver ? 'rgba(54, 176, 217, 0.1)' : uploading ? 'rgba(89, 109, 140, 0.05)' : 'transparent'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 mb-2" style={{ borderColor: '#36b0d9' }}></div>
            <p className="text-sm" style={{ color: '#596d8c' }}>
              Uploading image...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 mb-4"
              style={{ color: '#36b0d9' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm font-medium mb-2" style={{ color: '#FFFFFF' }}>
              Click to upload or drag and drop
            </p>
            <p className="text-xs" style={{ color: '#9ab6e0' }}>
              {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {maxSize}MB
            </p>
          </div>
        )}
      </div>

      {/* Upload button alternative */}
      <div className="mt-4 text-center">
        <Button
          onClick={(e) => openFileDialog(e)}
          disabled={disabled || uploading}
          variant="outline"
          size="sm"
          type="button"
        >
          {uploading ? 'Uploading...' : 'Choose File'}
        </Button>
      </div>
    </div>
  );
}