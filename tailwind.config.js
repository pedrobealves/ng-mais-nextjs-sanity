/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '760px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1232px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        body: ['var(--font-open-sans)', ...fontFamily.sans],
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        primary: {
          9: '#05000E',
          8: '#0B001D',
          7: '#10002B',
          6: '#240046',
          5: '#3C096C',
          4: '#5A189A',
          3: '#7B2CBF',
          2: '#9D4EDD',
          1: '#C77DFF',
          0: '#E0AAFF',
        },
        secundary: {
          9: '#6D2507',
          8: '#892E08',
          7: '#A4370A',
          6: '#BF410C',
          5: '#DB4A0D',
          4: '#F6530F',
          3: '#F8753F',
          2: '#FA986F',
          1: '#FBBA9F',
          0: '#FDDDCF',
        },
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'blue-500': '#2276FC',
        'yellow-100': '#fef7da',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
        7.3: '1.813rem',
        7.5: '1.875rem',
      },
      fontSize: {
        '1xl': '1.375rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'gradient-newsletter':
          'radial-gradient(circle closest-corner at 50% 220%, #240046, #100919)',
      },
    },
  },
  plugins: [],
}
