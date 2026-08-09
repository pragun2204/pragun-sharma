/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#06101E",
        surface: "#0F243C",
        surfaceBorder: "#1E3A5A",
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          DEFAULT: '#0ea5e9'
        },
        accent: {
          cyan: '#22d3ee',
          emerald: '#2dd4bf',
          purple: '#38bdf8',
          pink: '#14b8a6',
          amber: '#f59e0b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(14, 165, 233, 0.32))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(20, 184, 166, 0.48))' },
        }
      }
    },
  },
  plugins: [],
}
