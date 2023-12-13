import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: "1fr min(60ch,calc(100% - 64px)) 1fr"
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config