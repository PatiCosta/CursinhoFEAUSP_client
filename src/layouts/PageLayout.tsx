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
      h={
        hasPagination
          ? {
              base: 'calc(100vh - 80px)',
              sm: 'calc(100vh - 80px)',
              lg: '100vh',
            }
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
          <Flex gap={{ base: 2, sm: 2, lg: 4 }} alignItems="center">
            {variant === 'list' ? (
              <StarFour
                size={isLg ? 48 : 24}
                color="#1A202C"
                weight="fill"
                style={{ flexShrink: '0' }}
              />
            ) : (
              <Box onClick={returnTo} cursor="pointer">
                <ArrowLeft
                  size={isLg ? 48 : 24}
                  color="#1A202C"
                  weight="light"
                  style={{ flexShrink: '0' }}
                />
              </Box>
            )}
            <Text
              fontSize={{ base: 24, sm: 24, lg: 40 }}
              lineHeight="1.2"
              fontWeight="semibold"
            >
              {title}
            </Text>
          </Flex>
          <Flex
            gap={{ base: 2, sm: 2, lg: 4 }}
            alignItems="center"
            mt={{ base: 3, sm: 3, lg: 0 }}
          >
            <Box
              w={{ base: '32px', sm: '32px', lg: '48px' }}
              h={{ base: '32px', sm: '32px', lg: '48px' }}
            ></Box>
            <Text fontSize={{ base: 14, sm: 14, lg: 18 }}>{subtitle}</Text>
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
