/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3c72',
          dark: '#0f1e3d',
        },
        purple: {
          DEFAULT: '#667eea',
        },
        accent: '#f5576c',
        teal: '#00bcd4',
      },
    },
  },
  plugins: [],
}
