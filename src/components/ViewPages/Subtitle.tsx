import { Box, Flex, FlexProps, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SubtitleProps extends FlexProps {
  icon: ReactNode
  children: string
  lineColor: string
  hasButton?: boolean
  button?: ReactNode
  size: 'sm' | 'lg'
}

export function Subtitle({
  icon,
  children,
  lineColor,
  hasButton = false,
  button,
  size,
  ...rest
}: SubtitleProps) {
  return (
    <Flex alignItems="center" justify="space-between" w="100%" {...rest}>
      <Box>
        <Flex alignItems="center" gap={2}>
          {icon}
          <Text
            fontSize={{ base: size === 'sm' ? 16 : 20, lg: size === 'sm' ? 18 : 22 }}
            fontWeight="semibold"
            color="gray.700"
            letterSpacing="-0.3px"
          >
            {children}
          </Text>
        </Flex>
        <Box w="36px" h="3px" bgColor={lineColor} borderRadius="full" mt={1} />
      </Box>
      {hasButton && button}
    </Flex>
  )
}
