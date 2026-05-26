import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#f5efe3",
        ink: "#201915",
        cedar: "#9b6a3f",
        moss: "#4f6650",
        fog: "#d7d1c6"
      },
      fontFamily: {
        display: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        body: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        card: "0 10px 30px rgba(41, 27, 15, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
