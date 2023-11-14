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
      color={bgVariant === 'ghost' ? 'gray.800' : 'gray.50'}
      transition=".4s"
      _hover={{
        filter: 'contrast(110%)',
      }}
      size={{ base: 'sm', sm: 'sm', lg: 'md' }}
      {...rest}
    >
      {text}
    </ChakraButton>
  )
}
