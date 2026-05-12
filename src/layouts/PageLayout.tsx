import { Box, BoxProps, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { ArrowLeft, StarFour } from '@phosphor-icons/react'
import { ReactNode } from 'react'

interface PageLayoutProps extends BoxProps {
  children: ReactNode
  variant: 'list' | 'view'
  title: string
  subtitle: string
  hasButton: boolean
  button?: ReactNode
  hasPagination?: boolean
  pagination?: ReactNode
  returnTo?: () => void
}

export function PageLayout({
  children,
  variant,
  title,
  subtitle,
  hasButton,
  button,
  hasPagination = false,
  pagination,
  returnTo,
  ...rest
}: PageLayoutProps) {
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  return (
    <Flex
      direction="column"
      w={{ base: '100vw', sm: '100vw', lg: 'calc(100vw - 280px)' }}
      ml="auto"
      mt={{ base: '80px', sm: '80px', lg: 0 }}
      px={{ base: 2, sm: 2, lg: 8 }}
      pt={{ base: 4, sm: 4, lg: 10 }}
      pb={4}
      minH={
        hasPagination
          ? { base: 'calc(100vh - 80px)', sm: 'calc(100vh - 80px)', lg: '100vh' }
          : 'fit-content'
      }
      {...rest}
    >
      <Flex
        justifyContent="space-between"
        align="start"
        color="gray.800"
        borderBottom="1px solid"
        borderColor="gray.500"
        pb={2}
      >
        <Box>
          <Flex gap={{ base: 2, sm: 2, lg: 3 }} alignItems="center">
            {variant === 'list' ? (
              <StarFour
                size={isLg ? 32 : 20}
                color="#2a255a"
                weight="fill"
                style={{ flexShrink: '0', opacity: 0.7 }}
              />
            ) : (
              <Box
                onClick={returnTo}
                cursor="pointer"
                p={1}
                borderRadius="md"
                _hover={{ bg: 'brand.blueLight' }}
                transition="background 0.15s"
              >
                <ArrowLeft
                  size={isLg ? 28 : 20}
                  color="#2a255a"
                  weight="bold"
                  style={{ flexShrink: '0' }}
                />
              </Box>
            )}
            <Text
              fontSize={{ base: 22, sm: 22, lg: 32 }}
              lineHeight="1.1"
              fontWeight="bold"
              color="brand.blue"
              letterSpacing="-0.5px"
            >
              {title}
            </Text>
          </Flex>
          <Flex
            gap={{ base: 2, sm: 2, lg: 3 }}
            alignItems="center"
            mt={1}
          >
            <Box w={{ base: '20px', sm: '20px', lg: '28px' }} />
            <Box>
              <Text fontSize={{ base: 13, sm: 13, lg: 15 }} color="gray.500">{subtitle}</Text>
              <Box w="32px" h="3px" bgColor="yellow.400" borderRadius="full" mt={1} />
            </Box>
          </Flex>
        </Box>
        {hasButton && button}
      </Flex>
      {children}
      {hasPagination && (
        <Box mt="auto" pb={{ base: 2, lg: 0 }}>
          {pagination}
        </Box>
      )}
    </Flex>
  )
}
