/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      transitionDuration: { DEFAULT: '200ms' },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
