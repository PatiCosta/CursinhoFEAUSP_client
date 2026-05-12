import { Box, Flex } from '@chakra-ui/react'
import { Nav } from '../components/Nav'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <Flex
      bgColor="gray.50"
      w="100vw"
      h="100vh"
      overflow="hidden"
      direction={{ base: 'column', sm: 'column', lg: 'row' }}
    >
      <Nav />
      <Box flex="1" overflowY="auto" h="100%">
        <Outlet />
      </Box>
    </Flex>
  )
}
