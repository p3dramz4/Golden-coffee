/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sabz: "#008979",
        hovercolor: "#711d1c",
        brown: {
          100: "#ECE0D1",
          300: "#DBC1AC",
          600: "#967259",
          900: "#634832",
        },
      },
      boxShadow: {
        normal: "0 1px 10px rgba(0, 0, 0, 0.05)",
        login: "0px 3px 6px 0px rgba(0, 0, 0, 0.16)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        Dana: ['"Dana"', "sans-serif"],
        DanaMedium: ['"Dana Medium"', "sans-serif"],
        DanaDemiBold: ['"Dana DemiBold"', "sans-serif"],
        MorabbaLight: ['"Morabba Light"', "sans-serif"],
        MorabbaMedium: ['"Morabba Medium"', "sans-serif"],
        MorabbaDemiBold: ['"Morabba DemiBold"', "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.065em",
      },
      spacing: {
        4.5: "1.125",
        25: "6.25rem",
        50: "12.5rem",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "0.625rem",
        },
      },
      backgroundImage: {
        "home-mobile": "url(/images/headerBgMobile.webp)",
        "home-desktop": "url(/images/headerBgDesktop.webp)",
        "custom-gradient":
          "linear-gradient(rgb(158, 124, 86), rgb(192, 184, 175))",
      },
      direction: {
        rtl: "rtl",
        ltr: "ltr",
      },
    },
    screens: {
      xxs: "400px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1780px",
    },
  },
  plugins: [
    function ({ addVariant, addUtilities }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");

      addUtilities({
        ".webkit-none": {
          "-webkit-appearance": "none",
        },
        ".direction-ltr": {
          direction: "ltr",
        },
        ".direction-rtl": {
          direction: "rtl",
        },
      });
    },
  ],
};
