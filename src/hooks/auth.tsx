import {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../services/api'
// import { AxiosError } from 'axios'
import { useToast } from '@chakra-ui/react'

interface signInCredentials {
  username: string
  password: string
}

interface UserData {
  username: string
  name: string
  id: string
}

interface AuthContextData {
  signIn(credentials: signInCredentials): Promise<void>
  signOut(): void
  updateUser(user: UserData): void
  user: UserData | undefined
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  localStorage.removeItem('@cursinhoApp:token')
  localStorage.removeItem('@cursinhoApp:refreshToken')
  localStorage.removeItem('@cursinhoApp:user')

  window.location.reload()
}

interface AuthData {
  token?: string
  admins?: {
    username: string
    id: string
    name: string
  }
  refreshToken?: string
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@cursinhoApp:token')
    const refreshToken = localStorage.getItem('@cursinhoApp:refreshToken')
    const admins = localStorage.getItem('@cursinhoApp:user')

    if (token && admins && refreshToken) {
      return { token, admins: JSON.parse(admins), refreshToken }
    }

    return {}
  })
  const navigate = useNavigate()
  const toast = useToast()

  const signOut = useCallback(() => {
    localStorage.removeItem('@cursinhoApp:token')
    localStorage.removeItem('@cursinhoApp:refreshToken')
    localStorage.removeItem('@cursinhoApp:user')

    setData({})
    navigate('/')
  }, [navigate])

  useEffect(() => {
    if (!localStorage.getItem('@cursinhoApp:token')) {
      signOut()
    }
  }, [signOut])

  const signIn = useCallback(
    async ({ username, password }: signInCredentials) => {
      await api
        .post('admins/login', {
          username,
          password,
        })
        .then((response) => {
          const { token, admins, refreshToken } = response.data

          localStorage.setItem('@cursinhoApp:token', token)
          localStorage.setItem('@cursinhoApp:refreshToken', refreshToken)
          localStorage.setItem('@cursinhoApp:user', JSON.stringify(admins))

          api.defaults.headers.Authorization = `Bearer ${token}`

          setData({
            token,
            admins,
            refreshToken,
          })

          navigate('/inscricoes', { replace: true })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao logar',
              description: `${error.response.data.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [navigate, toast],
  )

  const updateUser = useCallback(
    ({ id, username, name }: UserData) => {
      const updatedUser = {
        id,
        username,
        name,
      }

      localStorage.setItem('@cursinhoApp:user', JSON.stringify(updatedUser))

      setData({
        token: data.token,
        admins: {
          id,
          name,
          username,
        },
        refreshToken: data.refreshToken,
      })
    },
    [setData, data.token, data.refreshToken],
  )

  return (
    <AuthContext.Provider
      value={{
        user: data.admins,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
