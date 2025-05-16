module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          900: '#0a1a3a',
          800: '#0d2352',
          700: '#13306f',
          600: '#1a3d8c',
          500: '#2251a8',
          400: '#3a6bc4',
          300: '#5d8ae0',
          200: '#8aadf5',
          100: '#b8d1ff',
        },
      },
    },
  },
  plugins: [],
};