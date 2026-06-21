/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A5F",
        secondary: "#4A90E2",
        accent: "#FF6B6B",
        neutral: "#F5F7FA",
        "neutral-light": "#E8EDF5",
        text: "#2C3E50",
      }
    },
  },
  plugins: [],
}
