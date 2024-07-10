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
      lofi: {
        ...daisyUIThemes["lofi"],
        primary: "000000",
        secondary: "FFFFFF",
      },
    }, "luxury",],
  },
}
