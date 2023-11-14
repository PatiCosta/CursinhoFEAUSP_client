import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
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
    },
    yellow: {
      400: '#E9C46A',
    },
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.50',
      },
    },
  },
})
