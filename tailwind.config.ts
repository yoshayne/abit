import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ABIT brand palette (approx. from the mockup — we fine-tune in M1)
        brand: {
          purple: "#4B1E71",
          "purple-dark": "#2E1148",
          gold: "#E5A823",
          teal: "#158A8C",
        },
      },
    },
  },
  plugins: [],
};

export default config;
