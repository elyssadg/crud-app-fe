/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'purple': {
        dark: '#243262',
        mid: '#545EE1',
        light: '#F3F5FD'
      },
      'orange': '#F76F02',
      'red': '#FF0000',
      'green': '#018677',
      'black': '#0B1740',
      'white': '#FFFFFF',
      'transparent': 'transparent'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    fontSize: {
      title: '1.875rem',
      heading: '1.3125rem',
      subheading: '1.125rem',
      name: '1rem',
      subname: '0.875rem',
    },
    borderRadius: {
        'default': '5px',
    },
  },
  plugins: [],
}

