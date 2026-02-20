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
        primary: {
          DEFAULT: "var(--color-primary)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
        },
        muted: "var(--color-muted)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
        },
        border: "var(--color-border)",
        glass: {
          light: "var(--color-glass-light)",
          dark: "var(--color-glass-dark)",
        }
      },
      spacing: {
        "4": "4px",
        "8": "8px",
        "12": "12px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "48": "48px",
        "64": "64px",
        "96": "96px",
        "128": "128px",
      },
      fontSize: {
        "hero": ["72px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "600" }],
        "h1": ["48px", { lineHeight: "1.2", letterSpacing: "-0.03em", fontWeight: "600" }],
        "h2": ["32px", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "500" }],
        "body-large": ["20px", { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400" }],
        "body": ["16px", { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400" }],
        "small": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
      },
      borderRadius: {
        "sm": "8px",
        "md": "16px",
        "lg": "32px",
        "xl": "48px",
        "pill": "9999px",
      },
      boxShadow: {
        "float": "0 10px 40px -10px rgba(0, 0, 0, 0.03)",
        "glass": "0 4px 24px rgba(0, 0, 0, 0.02)",
      },
      backgroundImage: {
        "overlay-gradient": "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)",
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.32, 0.72, 0, 1)",
        "smooth": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        "fast": "200ms",
        "med": "400ms",
        "slow": "700ms",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
