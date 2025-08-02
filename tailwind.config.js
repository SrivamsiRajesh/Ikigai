/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: { fontFamily: {
    manrope: ['Manrope_400Regular'],
    manropeLight: ['Manrope_300Light'],
    manropeMedium: ['Manrope_500Medium'],
    manropeSemiBold: ['Manrope_600SemiBold'],
  },},
  },
  plugins: [],
}