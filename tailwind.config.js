/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#3A6B2A',
        'primary-light': '#5A9440',
        'primary-pale': '#EAF3DF',
        secondary: '#D4621A',
        'secondary-pale': '#FADED0',
        accent: '#F4A340',
        'text-primary': '#1C2416',
        'text-secondary': '#4A6040',
        'text-muted': '#8FA882',
        'glass-bg': 'rgba(255,255,255,0.55)',
        'glass-border': 'rgba(255,255,255,0.85)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        'app-bar': '64px',
        'bottom-nav': '72px',
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      }
    },
  },
  plugins: [],
}