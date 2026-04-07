/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#070b1a",
        slateGlow: "#111936",
        aqua: "#76e4f7",
        aurora: "#8b5cf6",
      },
      boxShadow: {
        glass: "0 30px 80px rgba(15, 23, 42, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
