const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontSize: {
        caption: ['13px', '15px'],
        xs: ['14px', '19px'],
        sm: ['15px', '19px'],
        base: ['16px', '24px'],
        md: ['17px', '24px'],
        lg: ['18px', '24px'],
        xl: ['20px', '20px'],
        "display-xs": ['20px', '30px'],
        "display-sm": ['22px', '28px'],
        "display-base": ['24px', '32px'],
        "display-lg": ['28px', '30px'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        gray: {
          100: '#fff',
          200: '#f3f3f3',
          300: '#eee',
          400: '#dbdbdb',
          500: '#ccc',
          600: '#757575',
          700: '#404040',
          800: '#333',
          900: '#222',
        }
      },
      boxShadow: {
        'sm': '0 0px 3px var(--shadow-c)',
        'md': '0 -2px 10px var(--shadow-c)',
        'lg': '0 -2px 20px var(--shadow-c)',
      },
      borderRadius: {
        '2xl': '32px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), plugin(function ({ addUtilities }: any) {
    // hide scrollbar https://github.com/reslear/tailwind-scrollbar-hide/blob/main/src/index.js
    addUtilities({
      '.scrollbar-hide': {
        /* IE and Edge */
        '-ms-overflow-style': 'none',

        /* Firefox */
        'scrollbar-width': 'none',

        /* Safari and Chrome */
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      },

      '.scrollbar-default': {
        /* IE and Edge */
        '-ms-overflow-style': 'auto',

        /* Firefox */
        'scrollbar-width': 'auto',

        /* Safari and Chrome */
        '&::-webkit-scrollbar': {
          display: 'block'
        }
      }
    }, ['responsive'])
  })]
}
