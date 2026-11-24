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
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          500: '#4ADE80',
          600: '#43A047', // Xanh tươi sáng
          700: '#388E3C', // Màu xanh chủ đạo mới (nhẹ nhàng, tươi sáng hơn)
          800: '#2E7D32', // Xanh đậm vừa phải (thay thế mức siêu tối cũ)
          900: '#1E5E24',
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
        ink: '#1A3820',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(46, 125, 50, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(27, 94, 32, 0.08)',
      }
    },
  },
  plugins: [],
}
