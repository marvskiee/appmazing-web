/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
      },
      colors: {
        primary: "#fd9a05",
        // primary: "#FFB600",
        cstmgray: "#4C4C4C",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
