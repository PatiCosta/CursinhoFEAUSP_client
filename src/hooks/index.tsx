import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { theme } from '../styles/theme'
import { AuthProvider } from './auth'
import { UsersProvider } from './users'
import { CoursesProvider } from './courses'
import { DonationsProvider } from './donations'
import { StudentsProvider } from './subscriptions'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <UsersProvider>
          <CoursesProvider>
            <DonationsProvider>
              <StudentsProvider>{children}</StudentsProvider>
            </DonationsProvider>
          </CoursesProvider>
        </UsersProvider>
      </ChakraProvider>
    </AuthProvider>
  )
}
