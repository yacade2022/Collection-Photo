/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wall: "#E7E9E4", // gallery wall — page background
        mount: "#FBFBF8", // print mount / surfaces
        ink: "#1C2220", // primary text
        graphite: "#56605B", // secondary text
        line: "#CBD0CA", // borders
        cyan: {
          DEFAULT: "#23408E", // cyanotype blue — the single accent
          deep: "#1A2F6B",
          soft: "#DDE4F3",
        },
        danger: "#A8261D",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ["Figtree", "system-ui", "sans-serif"],
      },
      boxShadow: {
        print: "0 1px 1px rgba(28,34,32,.06), 0 8px 24px -12px rgba(28,34,32,.25)",
      },
    },
  },
  plugins: [],
};
