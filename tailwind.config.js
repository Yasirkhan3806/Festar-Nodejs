/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Ensure all JSX/TSX files are included
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,  // Add the important mode inside the exported object
}
