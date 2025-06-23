/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores do Íon Investimentos
        ion: {
          primary: '#133134',      // Verde escuro
          secondary: '#A7CE2E',    // Verde claro
          'primary-light': '#1a4145',
          'primary-dark': '#0d2426',
          'secondary-light': '#b8d94a',
          'secondary-dark': '#8fb525',
          accent: '#EC7000',       // Laranja Itaú
          'accent-light': '#ff8533',
          'accent-dark': '#cc5c00',
        },
        // Cores de sentimentos com tema Íon
        positive: '#A7CE2E',
        neutral: '#EC7000',
        negative: '#ef4444',
        // Cores de status
        success: '#A7CE2E',
        warning: '#EC7000',
        error: '#ef4444',
        info: '#133134',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

