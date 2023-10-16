/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      boxShadow: {
        sm: "0 0.25rem 0.3rem rgb(0 0 0 / 3%)",
      },
      colors: {
        primary: {
          600: "#FFBE32",
          650: "#FFB400",
        },
      },
    },
    fontFamily: {
      "roboto-slab": "Roboto Slab",
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
};
