module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D87D4A",
        "primary-light": "#FBAF85",
        dark: "#101010",
        "dark-gray": "#000000",
        "light-gray": "#F1F1F1",
        "very-light": "#FAFAFA",
        white: "#FFFFFF",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      screens: {
        tablet: "768px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
};
