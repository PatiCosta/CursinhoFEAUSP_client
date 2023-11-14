import { Box, BoxProps, Text } from '@chakra-ui/react'

interface InfoBoxProps extends BoxProps {
  title: string
  info: string
}

export function InfoBox({ title, info, ...rest }: InfoBoxProps) {
  return (
    <Box {...rest}>
      <Text
        color="gray.700"
        fontSize={{ base: 16, lg: 18 }}
        letterSpacing={0.8}
        fontWeight="bold"
      >
        {title}
      </Text>
      <Text fontSize={{ base: 14, lg: 16 }}>{info}</Text>
    </Box>
  )
}
