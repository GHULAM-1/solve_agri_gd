import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'DG': '#004743',
        'LG':'#A8CF45',
        'LLG':'#F3FFFE',
        'DB': '#000C36',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
};
export default config;
