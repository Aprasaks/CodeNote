/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/app/**/*.{js,jsx,ts,tsx,mdx}", "./src/components/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        // 폰트 등록
        movesans: ["MoveSans-Bold", "sans-serif"],
        komi: ["KNPSKkomi-Regular00", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")], // ✅ 여기 추가!],
};
