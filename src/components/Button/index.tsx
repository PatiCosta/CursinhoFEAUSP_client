import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'

interface ButtonProps extends ChakraButtonProps {
  bgVariant: 'yellow' | 'green' | 'blue' | 'danger' | 'sidebar' | 'ghost'
  text: string
}

export function Button({ bgVariant, text, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      borderRadius="md"
      bgColor={
        bgVariant === 'yellow'
          ? 'yellow.400'
          : bgVariant === 'blue'
          ? 'blue.500'
          : bgVariant === 'green'
          ? 'teal.500'
          : bgVariant === 'danger'
          ? 'red.400'
          : bgVariant === 'sidebar'
          ? 'brand.blue'
          : bgVariant === 'ghost'
          ? 'gray.200'
          : 'inherit'
      }
      color={bgVariant === 'ghost' ? 'gray.700' : 'gray.50'}
      transition="all 0.2s ease"
      _hover={{
        transform: 'translateY(-1px)',
        boxShadow: 'md',
        filter: 'brightness(1.05)',
        _disabled: { transform: 'none', boxShadow: 'none' },
      }}
      _active={{ transform: 'translateY(0)', boxShadow: 'none' }}
      size={{ base: 'sm', sm: 'sm', lg: 'md' }}
      {...rest}
    >
      {text}
    </ChakraButton>
  )
}
