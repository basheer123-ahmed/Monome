module.exports = {
  content: [
    "./*.html",
    "./*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: '#F5A623',
          'orange-light': '#F7B84B',
          'orange-dark': '#D4891A',
        },
        cream: {
          50: '#FEFDFB',
          100: '#FAF8F3',
          200: '#F5F0E8',
          300: '#EDE4D4',
          400: '#DDD0BC',
        },
        pastel: {
          blue: '#B8D4E8',
          mint: '#B8E4D4',
          lavender: '#D4B8E4',
          peach: '#E4C8B8',
          sky: '#D0E8F5',
        },
        glass: {
          white: 'rgba(255,255,255,0.25)',
          card: 'rgba(255,255,255,0.45)',
          dark: 'rgba(0,0,0,0.15)',
        },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        'glass-hover': '0 20px 60px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.8)',
        luxury: '0 4px 24px rgba(245,166,35,0.15), 0 1px 4px rgba(0,0,0,0.06)',
        'luxury-hover': '0 12px 48px rgba(245,166,35,0.25), 0 4px 12px rgba(0,0,0,0.10)',
        soft: '0 2px 16px rgba(0,0,0,0.06)',
        card: '0 8px 40px rgba(0,0,0,0.08)',
      },
      animation: {
        'float': 'float 10s ease-in-out infinite',
        'float-slow': 'float 14s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    }
  },
  plugins: [],
}
