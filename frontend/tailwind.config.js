/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'), // 👈 This line ONLY works with DaisyUI v4
    ],
    daisyui: {
        themes: ["lemonade", "abyss", "valentine"],
    },
}