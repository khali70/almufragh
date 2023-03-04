/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: "class",
  plugins: [require("daisyui"), require("tailwindcss-flip")],
  daisyui: {
    base: false,
    styled: true,
    rtl: true,
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "neutral-content": "#e5e7eb",
        },
      },
      {
        dark: {
          primary: "#793ef9",
          "primary-focus": "#570df8",
          "primary-content": "#ffffff",
          secondary: "#f000b8",
          "secondary-focus": "#bd0091",
          "secondary-content": "#ffffff",
          accent: "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",
          neutral: "#2a2e37",
          "neutral-focus": "#16181d",
          "neutral-content": "#111827",
          "base-100": "#3d4451",
          "base-200": "#2a2e37",
          "base-300": "#16181d",
          "base-content": "#ebecf0",
          info: "#66c6ff",
          success: "#0F53F0",

          warning: "#e2d562",
          error: "#ff6f6f",
        },
      },
    ],
  },
};
