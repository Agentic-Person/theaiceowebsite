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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spiral-from-top': 'spiral-from-top 38s ease-in-out infinite',
        'spiral-from-top-delayed': 'spiral-from-top 43s ease-in-out infinite',
        'spiral-from-top-tight': 'spiral-from-top-tight 36s ease-in-out infinite',
        'spiral-from-top-wide': 'spiral-from-top-wide 42s ease-in-out infinite',
        'spiral-from-top-half': 'spiral-from-top-half 38s ease-in-out infinite',
        'spiral-from-top-delayed-half': 'spiral-from-top-half 43s ease-in-out infinite',
        'spiral-from-top-tight-half': 'spiral-from-top-tight-half 36s ease-in-out infinite',
        'spiral-from-top-wide-half': 'spiral-from-top-wide-half 42s ease-in-out infinite',
        'spiral-from-bottom': 'spiral-from-bottom 41s ease-in-out infinite',
        'spiral-from-bottom-delayed': 'spiral-from-bottom 46s ease-in-out infinite',
        'spiral-from-bottom-tight': 'spiral-from-bottom-tight 39s ease-in-out infinite',
        'spiral-from-bottom-wide': 'spiral-from-bottom-wide 44s ease-in-out infinite',
        'spiral-from-bottom-half': 'spiral-from-bottom-half 41s ease-in-out infinite',
        'spiral-from-bottom-delayed-half': 'spiral-from-bottom-half 46s ease-in-out infinite',
        'spiral-from-bottom-tight-half': 'spiral-from-bottom-tight-half 39s ease-in-out infinite',
        'spiral-from-bottom-wide-half': 'spiral-from-bottom-wide-half 44s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
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
        },
        'spiral-from-top-tight': {
          '0%': { 
            transform: 'rotate(0deg) translateY(-32vh) rotate(0deg)',
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
        'spiral-from-top-wide': {
          '0%': { 
            transform: 'rotate(0deg) translateY(-48vh) rotate(0deg)',
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
        'spiral-from-bottom-tight': {
          '0%': { 
            transform: 'rotate(0deg) translateY(32vh) rotate(0deg)',
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
        'spiral-from-bottom-wide': {
          '0%': { 
            transform: 'rotate(0deg) translateY(48vh) rotate(0deg)',
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
        'spiral-from-top-tight-half': {
          '0%': { 
            transform: 'rotate(0deg) translateY(-32vh) rotate(0deg)',
            opacity: '0',
            scale: '1.0'
          },
          '10%': { 
            opacity: '0.8',
          },
          '50%': { 
            transform: 'rotate(360deg) translateY(-16vh) rotate(-360deg)',
            opacity: '0',
            scale: '0.5'
          },
          '100%': { 
            transform: 'rotate(720deg) translateY(0vh) rotate(-720deg)',
            opacity: '0',
            scale: '0.1'
          }
        },
        'spiral-from-top-wide-half': {
          '0%': { 
            transform: 'rotate(0deg) translateY(-48vh) rotate(0deg)',
            opacity: '0',
            scale: '1.0'
          },
          '10%': { 
            opacity: '0.8',
          },
          '50%': { 
            transform: 'rotate(360deg) translateY(-24vh) rotate(-360deg)',
            opacity: '0',
            scale: '0.5'
          },
          '100%': { 
            transform: 'rotate(720deg) translateY(0vh) rotate(-720deg)',
            opacity: '0',
            scale: '0.1'
          }
        },
        'spiral-from-bottom-tight-half': {
          '0%': { 
            transform: 'rotate(0deg) translateY(32vh) rotate(0deg)',
            opacity: '0',
            scale: '1.0'
          },
          '10%': { 
            opacity: '0.8',
          },
          '50%': { 
            transform: 'rotate(360deg) translateY(16vh) rotate(-360deg)',
            opacity: '0',
            scale: '0.5'
          },
          '100%': { 
            transform: 'rotate(720deg) translateY(0vh) rotate(-720deg)',
            opacity: '0',
            scale: '0.1'
          }
        },
        'spiral-from-bottom-wide-half': {
          '0%': { 
            transform: 'rotate(0deg) translateY(48vh) rotate(0deg)',
            opacity: '0',
            scale: '1.0'
          },
          '10%': { 
            opacity: '0.8',
          },
          '50%': { 
            transform: 'rotate(360deg) translateY(24vh) rotate(-360deg)',
            opacity: '0',
            scale: '0.5'
          },
          '100%': { 
            transform: 'rotate(720deg) translateY(0vh) rotate(-720deg)',
            opacity: '0',
            scale: '0.1'
          }
        },
        'shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'sparkle': {
          '0%, 100%': {
            opacity: '0',
            transform: 'scale(0) rotate(0deg)'
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1) rotate(180deg)'
          }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.3' }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;