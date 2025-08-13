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
        
        // Fast versions (5x faster, continuous) - for ultra-fast initial burst
        'spiral-from-top-fast': 'spiral-from-top 7.6s ease-in-out infinite',
        'spiral-from-top-delayed-fast': 'spiral-from-top 8.6s ease-in-out infinite',
        'spiral-from-top-tight-fast': 'spiral-from-top-tight 7.2s ease-in-out infinite',
        'spiral-from-top-wide-fast': 'spiral-from-top-wide 8.4s ease-in-out infinite',
        'spiral-from-top-half-fast': 'spiral-from-top-half 7.6s ease-in-out infinite',
        'spiral-from-top-delayed-half-fast': 'spiral-from-top-half 8.6s ease-in-out infinite',
        'spiral-from-top-tight-half-fast': 'spiral-from-top-tight-half 7.2s ease-in-out infinite',
        'spiral-from-top-wide-half-fast': 'spiral-from-top-wide-half 8.4s ease-in-out infinite',
        'spiral-from-bottom-fast': 'spiral-from-bottom 8.2s ease-in-out infinite',
        'spiral-from-bottom-delayed-fast': 'spiral-from-bottom 9.2s ease-in-out infinite',
        'spiral-from-bottom-tight-fast': 'spiral-from-bottom-tight 7.8s ease-in-out infinite',
        'spiral-from-bottom-wide-fast': 'spiral-from-bottom-wide 8.8s ease-in-out infinite',
        'spiral-from-bottom-half-fast': 'spiral-from-bottom-half 8.2s ease-in-out infinite',
        'spiral-from-bottom-delayed-half-fast': 'spiral-from-bottom-half 9.2s ease-in-out infinite',
        'spiral-from-bottom-tight-half-fast': 'spiral-from-bottom-tight-half 7.8s ease-in-out infinite',
        'spiral-from-bottom-wide-half-fast': 'spiral-from-bottom-wide-half 8.8s ease-in-out infinite',
        
        // Rapid versions (69% slower than original) - for SlowSpiral burst phase
        'spiral-from-top-rapid': 'spiral-from-top 21.2s ease-in-out infinite',  // was 16.3s
        'spiral-from-top-delayed-rapid': 'spiral-from-top 24.6s ease-in-out infinite',  // was 18.9s
        'spiral-from-top-tight-rapid': 'spiral-from-top-tight 20.3s ease-in-out infinite',  // was 15.6s
        'spiral-from-top-wide-rapid': 'spiral-from-top-wide 23.7s ease-in-out infinite',  // was 18.2s
        'spiral-from-top-half-rapid': 'spiral-from-top-half 21.2s ease-in-out infinite',  // was 16.3s
        'spiral-from-top-delayed-half-rapid': 'spiral-from-top-half 24.6s ease-in-out infinite',  // was 18.9s
        'spiral-from-top-tight-half-rapid': 'spiral-from-top-tight-half 20.3s ease-in-out infinite',  // was 15.6s
        'spiral-from-top-wide-half-rapid': 'spiral-from-top-wide-half 23.7s ease-in-out infinite',  // was 18.2s
        'spiral-from-bottom-rapid': 'spiral-from-bottom 22.9s ease-in-out infinite',  // was 17.6s
        'spiral-from-bottom-delayed-rapid': 'spiral-from-bottom 26.3s ease-in-out infinite',  // was 20.2s
        'spiral-from-bottom-tight-rapid': 'spiral-from-bottom-tight 22.0s ease-in-out infinite',  // was 16.9s
        'spiral-from-bottom-wide-rapid': 'spiral-from-bottom-wide 24.6s ease-in-out infinite',  // was 18.9s
        'spiral-from-bottom-half-rapid': 'spiral-from-bottom-half 22.9s ease-in-out infinite',  // was 17.6s
        'spiral-from-bottom-delayed-half-rapid': 'spiral-from-bottom-half 26.3s ease-in-out infinite',  // was 20.2s
        'spiral-from-bottom-tight-half-rapid': 'spiral-from-bottom-tight-half 22.0s ease-in-out infinite',  // was 16.9s
        'spiral-from-bottom-wide-half-rapid': 'spiral-from-bottom-wide-half 24.6s ease-in-out infinite',  // was 18.9s
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
        }
      }
    },
  },
  plugins: [],
} satisfies Config;