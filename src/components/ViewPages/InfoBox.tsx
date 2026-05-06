import { Box, BoxProps, Text } from '@chakra-ui/react'

interface InfoBoxProps extends BoxProps {
  title: string
  info: string
}

export function InfoBox({ title, info, ...rest }: InfoBoxProps) {
  return (
    <Box
      bg="white"
      p={3}
      borderRadius="md"
      boxShadow="card"
      borderLeft="3px solid"
      borderLeftColor="yellow.400"
      {...rest}
    >
      <Text
        color="gray.400"
        fontSize={{ base: 10, lg: 11 }}
        fontWeight="semibold"
        letterSpacing={1}
        textTransform="uppercase"
        mb={1}
      >
        {title}
      </Text>
      <Text fontSize={{ base: 14, lg: 15 }} fontWeight="medium" color="gray.700">
        {info || '—'}
      </Text>
    </Box>
  )
}
