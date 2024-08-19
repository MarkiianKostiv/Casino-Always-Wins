/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#F7EBFF",
          DEFAULT: "#120920",
          dark: "#240300",
        },
        secondary: {
          light: "#C6FCED",
          DEFAULT: "#00C89F",
          dark: "#4E8074",
        },
      },
      transform: {
        "translate-y-50": "translateY(-50%);",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
