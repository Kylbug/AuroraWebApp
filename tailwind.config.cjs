/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        europaLight: {
          "primary": "#f87171",
          "secondary": "#e7e5e4",
          "accent": "#d6d3d1",
          "neutral": "#6b7280",
          "base-100": "#f5f5f4",
          "info": "#0ea5e9",
          "success": "#84cc16",
          "warning": "#facc15",
          "error": "#b91c1c",
        },
        europaDark: {
          "primary": "#dc2626",
          "secondary": "#44403c",
          "accent": "#78716c",
          "neutral": "#6b7280",
          "base-100": "#1c1917",
          "info": "#0ea5e9",
          "success": "#84cc16",
          "warning": "#facc15",
          "error": "#b91c1c",
        }
      }
    ]
  }
};
