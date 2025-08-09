import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-purple': '#7c3aed',
        'deep-blue': '#3b82f6',
        'dark-background': '#1e1b4b',
        'text-white': '#f8fafc',
        'light-gray': '#cbd5e1',
        'accent-cyan': '#06b6d4',
        'success-green': '#10b981',
        'subtle-border': 'rgba(255, 255, 255, 0.1)',
        'glass-bg': 'rgba(255, 255, 255, 0.05)'
      },
      animation: {
        'spiral-from-top': 'spiral-from-top 38s ease-in-out infinite',
        'spiral-from-top-delayed': 'spiral-from-top 43s ease-in-out infinite',
        'spiral-from-top-half': 'spiral-from-top-half 38s ease-in-out infinite',
        'spiral-from-top-delayed-half': 'spiral-from-top-half 43s ease-in-out infinite',
        'spiral-from-bottom': 'spiral-from-bottom 41s ease-in-out infinite',
        'spiral-from-bottom-delayed': 'spiral-from-bottom 46s ease-in-out infinite',
        'spiral-from-bottom-half': 'spiral-from-bottom-half 41s ease-in-out infinite',
        'spiral-from-bottom-delayed-half': 'spiral-from-bottom-half 46s ease-in-out infinite',
      },
      keyframes: {
        'spiral-from-top': {
          '0%': { 
            transform: 'rotate(0deg) translateY(-40vh) rotate(0deg)',
            opacity: '0',
            scale: '1.0'
          },
          '10%': { 
            opacity: '0.8',
          },
          '90%': { 
            opacity: '0.8',
          },
          '100%': { 
            transform: 'rotate(720deg) translateY(0vh) rotate(-720deg)',
            opacity: '0',
            scale: '0.1'
          }
        },
        'spiral-from-bottom': {
          '0%': { 
            transform: 'rotate(0deg) translateY(40vh) rotate(0deg)',
            opacity: '0',
            scale: '1.0'
          },
          '10%': { 
            opacity: '0.8',
          },
          '90%': { 
            opacity: '0.8',
          },
          '100%': { 
            transform: 'rotate(720deg) translateY(0vh) rotate(-720deg)',
            opacity: '0',
            scale: '0.1'
          }
        },
        'spiral-from-top-half': {
          '0%': { 
            transform: 'rotate(0deg) translateY(-40vh) rotate(0deg)',
            opacity: '0',
            scale: '1.0'
          },
          '10%': { 
            opacity: '0.8',
          },
          '50%': { 
            transform: 'rotate(360deg) translateY(-20vh) rotate(-360deg)',
            opacity: '0',
            scale: '0.5'
          },
          '100%': { 
            transform: 'rotate(720deg) translateY(0vh) rotate(-720deg)',
            opacity: '0',
            scale: '0.1'
          }
        },
        'spiral-from-bottom-half': {
          '0%': { 
            transform: 'rotate(0deg) translateY(40vh) rotate(0deg)',
            opacity: '0',
            scale: '1.0'
          },
          '10%': { 
            opacity: '0.8',
          },
          '50%': { 
            transform: 'rotate(360deg) translateY(20vh) rotate(-360deg)',
            opacity: '0',
            scale: '0.5'
          },
          '100%': { 
            transform: 'rotate(720deg) translateY(0vh) rotate(-720deg)',
            opacity: '0',
            scale: '0.1'
          }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;