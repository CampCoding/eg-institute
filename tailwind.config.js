// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#02AAA0",
        secondary: "#C9AE6C",
        accent: "#4ade80",
        background: "#f3f4f6",
        text: "#111827",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans - serif"],
      },
      extend: {
        animation: {
          "spin-slow": "spin 3s linear infinite",
          float: "float 6s ease-in-out infinite",
          "fade-in": "fadeIn 1s ease-in forwards",
        },
        keyframes: {
          float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
          },
          fadeIn: {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        },
      },
    },
  },
  plugins: [],
};

