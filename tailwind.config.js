module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Standard shadcn/ui color definitions
        border: "hsl(var(--border))",
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
        // Forest color palette
        mossGreen: "#596a48", // Primary color
        blueBlack: "#212528", // Dark blue-black
        taupe: "#999788",     // Medium taupe
        beige: "#c9c1b6",     // Light beige
        darkBrown: "#403b35", // Dark brown
        
        // Additional light mode colors
        lightBeige: "#E8E2D3", // Base2 color
        forestLight: "#F8F3E3", // Base3 color
        
        // Extended palette with variants
        forestGreen: {
          DEFAULT: "#596a48",
          light: "#6b7e58",
          dark: "#485639",
        },
        forestDark: {
          DEFAULT: "#212528",
          light: "#2d3339",
          dark: "#16191c",
        },
        taupe: {
          DEFAULT: "#999788",
          light: "#a8a699",
          dark: "#7d7b6e",
        },
        beige: {
          DEFAULT: "#c9c1b6",
          light: "#d8d2c9",
          dark: "#b8aea1",
        },
        darkBrown: {
          DEFAULT: "#403b35",
          light: "#524a43",
          dark: "#322e2a",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
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
  plugins: [require("tailwindcss-animate")],
}
