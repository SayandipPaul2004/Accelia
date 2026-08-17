// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2547D0",
          light: "#4C6AE0",
          dark: "#1B36A6",
        },
        secondary: {
          DEFAULT: "#2DD4BF",
          light: "#5EEAD4",
          dark: "#14B8A6",
        },
        dark: "#0A1730",
        light: "#F8FAFC",
        muted: "#64748B",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
};
