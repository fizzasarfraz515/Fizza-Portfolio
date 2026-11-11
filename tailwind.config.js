/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette
        olive: {
          DEFAULT: "#66734B",
          // Darker / lighter tints of the same olive, used only where small text needs AA contrast
          dark: "#4E5A38",
          light: "#A5B27F",
        },
        beige: "#E9E1D2",
        ink: "#191A17",
        taupe: "#B7AD98",
        cream: "#F5F1E8",
      },
      fontFamily: {
        sans: ['"DM Sans Variable"', "system-ui", "sans-serif"],
        display: ['"Manrope Variable"', "system-ui", "sans-serif"],
        serif: ['"Playfair Display Variable"', "Georgia", "serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
