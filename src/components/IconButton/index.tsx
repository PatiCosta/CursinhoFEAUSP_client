import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react'

interface IconButtonProps extends ChakraIconButtonProps {
  bgVariant: 'yellow' | 'green' | 'blue' | 'danger' | 'sidebar' | 'ghost'
}

export function IconButton({ bgVariant, ...rest }: IconButtonProps) {
  return (
    <ChakraIconButton
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
    />
  )
}
