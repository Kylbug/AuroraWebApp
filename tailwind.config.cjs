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
          "primary": "#dc2626",
          "secondary": "#9ca3af",
          "accent": "#6b7280",
          "neutral": "#6b7280",
          "base-100": "#f5f5f4",
          "info": "#0ea5e9",
          "success": "#84cc16",
          "warning": "#facc15",
          "error": "#b91c1c",
        },
        europaDark: {
          "primary": "#dc2626",
          "secondary": "#9ca3af",
          "accent": "#6b7280",
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
