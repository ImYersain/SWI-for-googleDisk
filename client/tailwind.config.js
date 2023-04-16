/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    // colors: {
    //   'red': '#8f0e07',
    //   'gray':'#757474'
    // }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
