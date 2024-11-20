module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all relevant files are scanned for Tailwind classes
  ],
  darkMode: 'class', // Enable dark mode with a class (e.g., "dark")
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#e0f2f1', // Example custom light mode color
          dark: '#004d40',  // Example custom dark mode color
        },
        background: {
          light: '#f9f9f9',
          dark: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
