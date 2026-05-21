import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      canvas: "#F9F8F6",
      ink: "#1C1A19",
      terra: "#0292b7",
      oatmeal: "#EFECE7",
      void: "#141211",
      transparent: "transparent",
      current: "currentColor",
    },
    fontFamily: {
      serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
    },
    extend: {
      spacing: {
        "section-gap": "clamp(6rem, 15vw, 12rem)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".frosted": {
          "backdrop-filter": "blur(16px)",
          "-webkit-backdrop-filter": "blur(16px)",
          "background-color": "rgb(255 255 255 / 0.05)",
        },
      });
    }),
  ],
};

export default config;
