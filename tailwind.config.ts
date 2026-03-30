import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        tiny: '0.625rem'
      }
    },
  },
  plugins: [],
} satisfies Config