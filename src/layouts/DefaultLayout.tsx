import { Flex } from '@chakra-ui/react'
import { Nav } from '../components/Nav'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <Flex
      bgColor="gray.50"
      w="100vw"
      minH="100vh"
      direction={{ base: 'column', sm: 'column', lg: 'row' }}
    >
      <Nav />
      <Outlet />
    </Flex>
  )
}
