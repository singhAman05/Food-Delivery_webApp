/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "warm-orange": "#FFA500",
        "deep-red": "#C0392B",
        "dark-chocolate-brown": "#4E342E",
        "harvest-gold": "#ECA400",
        "ghost-white": "#F7F7FF",
        gunmetal: "#012A36",
        "chilli-red": "#E3170A",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
