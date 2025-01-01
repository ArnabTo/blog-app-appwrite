import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      width: {
        'revert-layer': 'revert-layer',
      },
      // colors: {
      //   //ligth theme
      //   primary: "#ffff",
      //   secondary: "#FD356E",
      //   accent: "#e3e0f3",
      //   neutral: "#303036",
      //   textcolor: "#121212",
      //   bedgebg:'#F1F0F1'

      //   //dark theme

      // },
      colors: {
        // Brand Colors
        primary: {
          light: "#4f46e5", // Indigo 600
          dark: "#818cf8",  // Indigo 400
        },
        secondary: {
          light: "#22c55e", // Green 500
          dark: "#16a34a",  // Green 600
        },
        // Button Colors
        button: {
          light: {
            bg: "#4f46e5",
            text: "#ffffff",
            hover: "#818cf8",
          },
          dark: {
            bg: "#1e293b",
            text: "#ffffff",
            hover: "#121212",
          },
        },
        // Background Colors
        background: {
          light: "#ffffff",
          dark: "#131313",
        },
        // Text Colors
        text: {
          light: "#121212",
          dark: "#ffffff",
        },
        // badge Colors
        badge: {
          bg: '#4f46e5',
          text:'#ffffff',
          text_light: "#",
          text_dark: "#1e293b",
        },
        card:{
          light: {
            bg: "#eeeeee",
            text: "#121212",
          },
          dark: {
            bg: "#0D0D0F",
            text: "#ffffff",
          },
        }
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