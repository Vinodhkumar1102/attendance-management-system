/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacific: ["Pacifico", "sans-serif"], // ✅ correct way
          greatvibes: ["cursive", "cursive"],
            dancing: ["'Dancing Script'", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
          bebas: ['Bebas Neue', 'sans-serif'],
        lobster: ['Lobster', 'cursive'],
        liter: ['Literata', 'serif'],
               lobster: ['Lobster', 'cursive'],
        pacifico: ['Pacifico', 'cursive'],
        roboto: ['"Roboto Mono"', 'monospace'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        worksans: ['"Work Sans"', 'sans-serif'],
             josefin: ['"Josefin Sans"', 'sans-serif'],
        literata: ['Literata', 'serif'],
         alfa: ['"Alfa Slab One"', 'cursive'],
      },
    },
  },
  plugins: [],
};
