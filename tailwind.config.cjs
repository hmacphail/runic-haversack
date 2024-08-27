/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#171717',
        primary: '#4840a0',
        secondary: '#a4da2d',
        tertiary: '#e88030',
        regal: {
          50: '#f0eff4', // 'purple' background on square site
          100: '#dedce8', // empty photo background on square site
          200: '#b2afe4', // gradient secondary colour
          300: '#8270c6',
          400: '#5f4aad',
          500: '#605BAC', // secondary paletton
          600: '#4840a0', // primary
          700: '#311b86',
          800: '#241e62', // text on square site
          900: '#221066'
        },
        lime: {
          300: '#ccf472',
          400: '#bdee4f',
          500: '#a4da2d',
          600: '#82b414',
          700: '#628b05'
        },
        tangerine: {
          300: '#ffb277',
          400: '#fe9e54',
          500: '#e88030',
          600: '#c05f15',
          700: '#944406'
        },
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
          50: 'hsl(192, 33%, 97%)',
          100: 'hsl(198, 31%, 94%)',
          200: 'hsl(193, 32%, 86%)',
          300: 'hsl(191, 32%, 79%)',
          400: 'hsl(190, 31%, 60%)',
          500: 'hsl(190, 30%, 48%)',
          600: 'hsl(192, 33%, 39%)',
          700: 'hsl(192, 33%, 32%)',
          800: 'hsl(193, 30%, 27%)',
          900: 'hsl(193, 26%, 24%)',
          950: 'hsl(194, 26%, 16%)',
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
        sans: ["Sen", ...defaultTheme.fontFamily.sans],
        serif: ["IBM Plex Serif", ...defaultTheme.fontFamily.serif],
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
