/** @type {import('tailwindcss').Config} */
import daisyUIThemes from "daisyui/src/theming/themes";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter", {
      luxury: {
        ...daisyUIThemes["luxury"],
        primary: "fffdb6",
        secondary: "2e2d04",
      },
    }, "lofi",],
  },
}
