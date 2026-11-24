/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        green: {
          50:  '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          600: '#388E3C',
          700: '#2E7D32', // Màu xanh chủ đạo
          800: '#1B5E20', // Màu xanh rừng đậm
          900: '#0F3E13',
        },
        sun: {
          DEFAULT: '#F9A825', // Vàng nắng
          light: '#FFF9C4',
          dark: '#F57F17',
        },
        earth: {
          DEFAULT: '#5D4037', // Nâu đất
          light: '#8D6E63',
          dark: '#3E2723',
        },
        cream: '#FAF8F1', // Kem nền dịu mắt
        alert: '#D84315',
        ink: '#1B3A1E',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(46, 125, 50, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(27, 94, 32, 0.08)',
      }
    },
  },
  plugins: [],
}
