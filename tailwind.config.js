/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          primary: '#1e40af', // Bleu foncé
          secondary: '#3b82f6', // Bleu légèrement plus clair
          accent: '#60a5fa', // Bleu clair pour les accents
          dark: '#1e3a8a', // Bleu très foncé
          light: '#f8fafc', // Blanc très léger
          border: '#e2e8f0', // Gris clair pour les bordures
          text: '#1e293b', // Gris foncé pour le texte
          'text-light': '#64748b', // Gris moyen pour le texte secondaire
        }
      },
      fontFamily: {
        instagram: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        brand: '0 0 0 1px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.07)',
        'brand-lg': '0 0 0 1px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        brand: '8px',
      },
    },
  },
}


