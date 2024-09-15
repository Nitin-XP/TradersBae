/** @type {import('tailwindcss').Config} */
import daisyUIThemes from "daisyui/src/theming/themes";
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '375px',
      '2xs': '300px',
      ...defaultTheme.screens,
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter", {
      lofi: {
        ...daisyUIThemes["lofi"],
        primary: "000000",
        secondary: "FFFFFF",
      },
    }, "luxury",],
  },
}
