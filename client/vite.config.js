/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  server: {
    port: 5000,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8000",
    //     changeOrigin: true,
    //   }
    // }
  }
}