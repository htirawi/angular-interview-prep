/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class", '[data-theme="dark"]'],
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
      container: { center: true, padding: "1rem" },
      extend: {
        fontFamily: {
          sans: ["ui-sans-serif", "system-ui", "sans-serif"],
          mono: ["ui-monospace", "SFMono-Regular", "monospace"],
        },
      },
    },
    plugins: [],
  };
  