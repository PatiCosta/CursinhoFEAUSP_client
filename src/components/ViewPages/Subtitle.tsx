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
    <Flex alignItems="center" {...rest}>
      <Box>
        <Flex alignItems="center" gap={2}>
          {icon}
          <Text
            fontSize={{
              base: size === 'sm' ? 18 : 24,
              lg: size === 'sm' ? 24 : 28,
            }}
            fontWeight="medium"
            color="gray.700"
          >
            {children}
          </Text>
        </Flex>
        <Box w="76px" h="2px" bgColor={lineColor} />
      </Box>
      {hasButton && button}
    </Flex>
  )
}
