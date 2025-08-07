import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ButtonVariant } from '@/types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariant {
  children: React.ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, asChild = false, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-lg";
    
    const variantClasses = {
      primary: "text-white hover:brightness-110 focus-visible:ring-2 shadow-lg hover:shadow-xl transform hover:scale-105",
      secondary: "text-white border-2 hover:brightness-110 focus-visible:ring-2",
      outline: "border-2 bg-transparent hover:brightness-110 focus-visible:ring-2",
      ghost: "hover:brightness-110 focus-visible:ring-2"
    };

    const sizeClasses = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-13 px-8 text-lg"
    };

    if (asChild) {
      // For link components, we'll just return children with classes
      return children;
    }

    const getVariantStyles = (variant: string) => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: 'var(--primary)',
            borderColor: 'var(--primary)',
          };
        case 'secondary':
          return {
            backgroundColor: 'var(--card-background)',
            borderColor: 'var(--primary)',
            color: 'var(--primary)',
          };
        case 'outline':
          return {
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
          };
        default:
          return {
            backgroundColor: 'var(--primary)',
            borderColor: 'var(--primary)',
          };
      }
    };

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        style={getVariantStyles(variant)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;