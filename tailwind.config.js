// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reference custom CSS variables for Tailwind utility classes
        'background': 'var(--color-background)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'primary': 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'secondary': 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        'accent': 'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
        'card-background': 'var(--color-card-background)',
        'border-color': 'var(--color-border)',

        // Map gradient stops to new variables
        'gradient-hero-from': 'var(--gradient-hero-from)',
        'gradient-hero-to': 'var(--gradient-hero-to)',

        // You can keep some of Tailwind's defaults if you still use them
        // For example, if you still use 'gray-200' directly and don't want it mapped to a variable:
        // 'gray': {
        //   100: 'oklch(96.7% 0.003 264.542)',
        //   // ... etc.
        // },
      },
      // Keep keyframes and animation for blob
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      animation: {
        blob: "blob 7s infinite cubic-bezier(0.6, 0.4, 0.4, 0.8)",
      },
    },
  },
  plugins: [],
}
