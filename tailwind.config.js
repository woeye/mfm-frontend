/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "lightgray": "#f9f9f9",
      "mediumgray": "#a4a4a4",
      "darkgray": "#3d3d3d",
      "gray": "#CDCDCD",
    },
    fontFamily: {
      "rubik": ["Rubik Dirt"],
      "nunito": ["Nunito"],
    },
    extend: {},
  },
  plugins: [],
}

