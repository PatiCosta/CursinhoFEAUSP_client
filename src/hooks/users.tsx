import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react'
import { useBreakpointValue, useToast } from '@chakra-ui/react'

import api from '../services/api'
import { usersReducer } from './reducers/users/reducer'
import {
  changeUsersPage,
  addNewUser,
  getUsersFromApi,
  updateUser,
  deleteUser,
} from './reducers/users/actions'
import { User } from '../interfaces/User.interface'

interface UsersContextType {
  users: User[]
  list: (username?: string) => void
  create: (data: User) => void
  update: ({ data, id }: { data: User; id: string | undefined }) => void
  page: number
  changePage: (page: number) => void
  registersPerPage: number
  totalUsers: number
  updatePassword: ({
    password,
    id,
  }: {
    password: string
    id: string | undefined
  }) => void
  loadingList: boolean
  handleDelete: (id: string | undefined) => void
}

const UsersContext = createContext({} as UsersContextType)

export function UsersProvider({ children }: { children: ReactNode }) {
  const [loadingList, setIsLoadingList] = useState(false)
  const toast = useToast()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const [usersState, dispatch] = useReducer(usersReducer, {
    users: [],
    page: 1,
    totalUsers: 0,
    registersPerPage: isLg ? 12 : 8,
  })

  const { users, page, totalUsers, registersPerPage } = usersState

  const changePage = useCallback((page: number) => {
    dispatch(changeUsersPage(page))
  }, [])

  const list = useCallback(
    async (username?: string) => {
      setIsLoadingList(true)

      let params = {
        page,
        pageRange: registersPerPage,
      }

      if (username) {
        params = Object.assign(params, { username })
      }

      await api
        .get('/admins', { params })
        .then((response) => {
          dispatch(
            getUsersFromApi({
              users: response.data.adminsListSimplified,
              totalUsers: response.data.totalDocuments,
            }),
          )
        })
        .then(() => {
          setIsLoadingList(false)
        })
    },
    [page, registersPerPage],
  )

  const create = useCallback(
    async (data: User) => {
      await api
        .post(`/admins/create`, data)
        .then((response) => {
          dispatch(addNewUser(response.data.admins))

          toast({
            status: 'success',
            title: 'O usuário foi criado!',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao criar usuário',
              description: `${error.response.data.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [toast],
  )

  const update = useCallback(
    async ({ data, id }: { data: User; id: string | undefined }) => {
      await api
        .put(`/admins/${id}/update`, data)
        .then((response) => {
          dispatch(updateUser(response.data.admins))

          toast({
            status: 'success',
            title: 'O usuário foi editado!',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao editar usuário',
              description: `${error.response.data.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [toast],
  )

  const updatePassword = useCallback(
    async ({ password, id }: { password: string; id: string | undefined }) => {
      await api
        .put(`/admins/${id}/updatePassword`, password)
        .then(() => {
          toast({
            status: 'success',
            title: 'A senha foi alterada!',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao editar senha',
              description: `${error.response.data.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [toast],
  )

  const handleDelete = useCallback(
    async (id: string | undefined) => {
      await api
        .delete(`/admins/${id}/delete`)
        .then(() => {
          dispatch(deleteUser(id))

          toast({
            status: 'success',
            title: 'O usuário foi deletado!',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao deletar usuário',
              description: `${error.response.data.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [toast],
  )

  return (
    <UsersContext.Provider
      value={{
        users,
        list,
        create,
        update,
        page,
        changePage,
        registersPerPage,
        totalUsers,
        updatePassword,
        loadingList,
        handleDelete,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext)

  if (!context) {
    throw new Error('useUsers must be used within an UsersProvider')
  }

  return context
}
