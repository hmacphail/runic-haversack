/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    extend: {
       colors: {
        black: "#273846",
        wood: {
          50: "#FFFFFF",
          100: "#FEFDFB",
          200: "#FCFAF7",
          300: "#FCFAF7",
          400: "#FBF8F4",
          500: "#FAF6F0",
          600: "#E2CAA7",
          700: "#C99F5E",
          800: "#916B30",
          900: "#493518",
        },
        mist: {
         '50': 'hsl(192, 33%, 97%)',
    '100': 'hsl(198, 31%, 94%)',
    '200': 'hsl(193, 32%, 86%)',
    '300': 'hsl(191, 32%, 79%)',
    '400': 'hsl(190, 31%, 60%)',
    '500': 'hsl(190, 30%, 48%)',
    '600': 'hsl(192, 33%, 39%)',
    '700': 'hsl(192, 33%, 32%)',
    '800': 'hsl(193, 30%, 27%)',
    '900': 'hsl(193, 26%, 24%)',
    '950': 'hsl(194, 26%, 16%)',
        },
        salmon: {
          50: "#FEF5F0",
          100: "#FEEEE7",
          200: "#FDD9C9",
          300: "#FBC7B1",
          400: "#FAB699",
          500: "#F9A27D",
          600: "#F67037",
          700: "#D7470A",
          800: "#8D2F07",
          900: "#491803",
        },
        glow: {
          50: "#FEFAF0",
          100: "#FEF6E7",
          200: "#FCECCA",
          300: "#FBE4B2",
          400: "#F9D995",
          500: "#F8D17D",
          600: "#F4B734",
          700: "#D5950B",
          800: "#8C6208",
          900: "#493304",
        },
      },
       fontFamily: {
        sans: ["inter", ...defaultTheme.fontFamily.sans],
        serif: ["Gilda Display", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
	plugins: [
		 require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
}
