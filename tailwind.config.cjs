const { createPlugin } = require("windy-radix-palette");
const colors = createPlugin({
  rootSelector: ":host",
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./@/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        // font-size theme in pixel units
        "2xs": ["10px", "12px"],
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "20px"],
        // md: ["14px", "18px"],
        // lg: ["16px", "20px"],
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
      spacing: {
        // spacing theme on 4px grid in pixesl
        px: "1px",
        0.5: "2px",
        1.0: "4px",
        1.5: "6px",
        2.0: "8px",
        2.5: "10px",
        3: "12px",
        3.5: "14px",
        4: "16px",
        4.5: "18px",
        5: "20px",
        5.5: "22px",
        6: "24px",
        6.5: "26px",
        7: "28px",
        7.5: "30px",
        8: "32px",
        8.5: "34px",
        9: "36px",
        9.5: "38px",
        10: "40px",
      },
      colors: {
        scale: colors.alias("slate"),
        border: colors.alias("slate.3"),
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    colors.plugin,
    require("tailwindcss-animate"),
    require("@iconify/tailwind").addDynamicIconSelectors(),
  ],
};
