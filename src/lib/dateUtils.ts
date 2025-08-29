/**
 * Utility functions for consistent date formatting across the application
 * These functions help avoid hydration mismatches between server and client
 */

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return 'Not published';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    // Use Intl.DateTimeFormat for consistent formatting
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Ensure consistent timezone
    }).format(dateObj);
  } catch (error) {
    return 'Invalid date';
  }
}

export function formatDateShort(date: string | Date | null | undefined): string {
  if (!date) return 'Draft';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(dateObj);
  } catch (error) {
    return 'Invalid date';
  }
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return 'Not scheduled';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    }).format(dateObj);
  } catch (error) {
    return 'Invalid date';
  }
}

export function getRelativeTime(date: string | Date | null | undefined): string {
  if (!date) return 'Unknown';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
    
    // For older dates, use the standard format
    return formatDateShort(dateObj);
  } catch (error) {
    return 'Unknown';
  }
}

export function isValidDate(date: string | Date | null | undefined): boolean {
  if (!date) return false;
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(dateObj.getTime());
}