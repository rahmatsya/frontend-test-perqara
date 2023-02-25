/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '2rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '7rem',
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'red': '#E74C3C',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'dark': '#1E232B',
      'darken': '#24282E',
      'black': '#000000',
      'light': '#E5E5E5',
      'white': '#ffffff',
      'dark-20': '#1E232B8a',

    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      serif: ['Inter', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
