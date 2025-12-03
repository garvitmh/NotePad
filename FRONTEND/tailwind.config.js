 /** @type {import('tailwindcss').Config} */
 import daisyui from "daisyui"
export default {
   content: [
    "./src/index.css",
    "./src/**/*.{html,jsx,js}",
  ],
   theme: {
     extend: {},
   },
   plugins: [
    daisyui,
   ],
   daisyui: {
    themes: [
       "light",
      "dark",
      "cupcake",
      "bumblebee",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "night",
      "coffee",
      "sunset",
    ],
  }
 }