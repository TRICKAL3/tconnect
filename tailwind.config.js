/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef3ff',
          100: '#dbe5ff',
          200: '#bcceff',
          300: '#8eaaff',
          400: '#5d7eff',
          500: '#3b55ff',
          600: '#2332ff',
          700: '#1a25eb',
          800: '#1820cc',
          900: '#1a20a1',
          950: '#0d1145',
        },
      },
    },
  },
  plugins: [],
};