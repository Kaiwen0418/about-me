module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      filter: { // this ensures filter utilities are enabled
        'none': 'none',
        'grayscale': 'grayscale(1)',
        'invert': 'invert(1)',
        'sepia': 'sepia(1)'
      },
      blur: {
        sm: '2px',
        DEFAULT: '4px', // default blur
        lg: '8px',
        xl: '16px'
      },
      keyframes: {
        slideInFromRight: {
          '0%': { transform: 'translateX(100%) translateY(-50%) scaleY(3)' },
          '100%': { transform: 'translateX(0) translateY(-50%) scaleY(3)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '75%': { transform: 'scale(1.1)', opacity: 0.8 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        blink: 'blink 1s linear infinite',
        'slide-in-right': 'slideInFromRight 1s ease-out forwards',
        fadeIn: 'fadeIn 0.4s ease-in-out',
        scaleIn: 'scaleIn 0.1s ease-in-out',
        bounceIn: 'bounceIn 0.4s ease-in-out', // Adjust the duration here
      },
    },
  },
  variants: {},
  plugins: [],
};
