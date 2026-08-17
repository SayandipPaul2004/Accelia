// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── original brand tokens (kept for backward compatibility) ──
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

        // ── tokens the careers page components actually use ──
        // text colors
        ink: "#0A1730", // primary body/heading text — matches your brand navy
        "ink-soft": "#4B5568", // secondary/supporting text
        "ink-faint": "#94A3B8", // placeholders, meta text, icons

        // surfaces
        paper: "#F8FAFC", // page background
        line: "#E2E8F0", // borders/dividers

        // navy scale (buttons, dark surfaces) — anchored to your brand navy
        navy: {
          50: "#EEF1F9",
          100: "#D6DCEF",
          400: "#4C5D8A",
          900: "#13234A",
          950: "#0A1730",
        },

        // teal scale — anchored to your brand secondary
        teal: {
          50: "#EFFDFB",
          100: "#CCFBF1",
          500: "#2DD4BF",
          600: "#14B8A6",
        },

        // accent colors used for errors / featured badges
        coral: {
          500: "#F4574D",
        },
        gold: {
          500: "#F5B301",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        // used for headings/titles across the careers page (font-display)
        display: ["var(--font-jakarta)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem", // used as rounded-xl2 on job cards
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(10,23,48,0.04), 0 1px 6px -1px rgba(10,23,48,0.06)",
        "card-hover":
          "0 4px 12px -2px rgba(10,23,48,0.10), 0 2px 6px -2px rgba(10,23,48,0.06)",
      },
    },
  },
};
