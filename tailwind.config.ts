import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ABIT brand palette, matched to the homepage mockup
        brand: {
          purple: "#4B1E71",
          "purple-dark": "#2E1148",
          gold: "#E5A823",
          teal: "#158A8C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
