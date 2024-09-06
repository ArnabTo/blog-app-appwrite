import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react"); 

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        //ligth theme
        primary: "#CAFF33",
        secondary: "#faf8ff",
        accent: "#e3e0f3",
        neutral: "#303036",
        textcolor: "#121212",
        bedgebg:'#F1F0F1'

        //dark theme
  
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;


// #E7E247


// #EBF2FA

// #303036

// #F3FB25