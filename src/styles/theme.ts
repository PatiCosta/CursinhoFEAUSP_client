import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  colors: {
    courses: {
      tse: '#17304A',
      tsa: '#F9B03F',
      tsm: '#EE5E35',
      tsi: '#800080',
    },
    brand: {
      yellow: '#ffd500',
      blue: '#2a255a',
      blueMid: '#3d3a7a',
      blueLight: '#eeedf8',
    },
    yellow: {
      400: '#E9C46A',
      500: '#d4a94e',
    },
  },
  shadows: {
    card: '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.07)',
    cardHover: '0 8px 20px -4px rgba(42,37,90,0.18)',
    formCard: '0 4px 32px -4px rgba(42,37,90,0.14)',
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#f5f5fa',
        color: 'gray.800',
      },
    },
  },
})
