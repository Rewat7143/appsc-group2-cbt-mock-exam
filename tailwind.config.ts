import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        exam: {
          header: "#1e3a8a",
          darkNavy: "#0f172a",
          primary: "#2563eb",
          accent: "#3b82f6",
          bgLight: "#f8fafc",
          panelBg: "#f1f5f9",
          border: "#cbd5e1",
          answered: "#22c55e",
          notAnswered: "#ef4444",
          markedReview: "#8b5cf6",
          markedAnswered: "#7c3aed",
          notVisited: "#94a3b8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
