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
      "dark",
      {
        europaLight: {
          "primary": "#b91c1c",
          "secondary": "#9ca3af",
          "accent": "#6b7280",
          "neutral": "#6b7280",
          "base-100": "#e7e5e4",
          "info": "#0ea5e9",
          "success": "#84cc16",
          "warning": "#facc15",
          "error": "#dc2626",
        },
        europaDark: {
          "primary": "#b91c1c",
          "secondary": "#9ca3af",
          "accent": "#6b7280",
          "neutral": "#6b7280",
          "base-100": "#44403c",
          "info": "#0ea5e9",
          "success": "#84cc16",
          "warning": "#facc15",
          "error": "#dc2626",
        }
      }
    ]
  }
};
