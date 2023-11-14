import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Flex,
  IconButton,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'

import { PageLayout } from '../../layouts/PageLayout'
import { Pagination } from '../../components/Pagination'
import { CreateUserModal } from './CreateUserModal'
import { useUsers } from '../../hooks/users'
import { User } from '../../interfaces/User.interface'
import { Editable } from '../../components/Editable/Editable'
import { UpdatePasswordModal } from './UpdatePasswordModal'
import { DeleteUserModal } from './DeleteUserModal'
import { Input } from '../../components/Input'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { useLocation, useNavigate } from 'react-router-dom'

export function Users() {
  const [whatUpdateIsLoading, setWhatUpdateIsLoading] = useState<{
    id: string | undefined
    type: 'name' | 'username' | undefined
  }>({ id: undefined, type: undefined })
  const [search, setSearch] = useState('')
  const [isFiltered, setIsFiltered] = useState(false)
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const location = useLocation()
  const navigate = useNavigate()

  const {
    changePage,
    list,
    users,
    registersPerPage,
    totalUsers,
    page,
    update,
    loadingList,
  } = useUsers()

  useEffect(() => {
    if (location.search) {
      const searchString = location.search.replace('?', '')
      const formattedSearch = searchString.replace('username=', '')

      list(formattedSearch)
      setSearch(formattedSearch)
      setIsFiltered(true)
    } else {
      list()
    }
  }, [list, page, location.search])

  const updateName = useCallback(
    async ({ name, user }: { name: string; user: User }) => {
      setWhatUpdateIsLoading({ id: user.id, type: 'name' })
      await update({
        data: { name, username: user.username },
        id: user.id,
      })
      setWhatUpdateIsLoading({ id: undefined, type: undefined })
    },
    [update],
  )

  const updateUsername = useCallback(
    async ({ username, user }: { username: string; user: User }) => {
      setWhatUpdateIsLoading({ id: user.id, type: 'username' })
      await update({
        data: { name: user.name, username },
        id: user.id,
      })
      setWhatUpdateIsLoading({ id: undefined, type: undefined })
    },
    [update],
  )

  const handleSearch = useCallback(() => {
    if (search === '' || search.length <= 6) {
      return
    }

    navigate(
      { search: `?username=${search}` },
      { replace: true, state: { isActive: true } },
    )
    changePage(1)

    setIsFiltered(true)
  }, [search, changePage, navigate])

  const handleClearSearch = useCallback(() => {
    navigate({ search: '' }, { replace: true, state: { isActive: true } })
    setIsFiltered(false)
    setSearch('')
  }, [navigate])

  return (
    <PageLayout
      variant="list"
      title="Administradores do cursinho"
      subtitle="Aqui você pode criar novos usuários e gerenciar os usuários existentes"
      hasButton
      button={<CreateUserModal />}
      hasPagination
      pagination={
        <Pagination
          currentPage={page}
          onPageChange={(page) => changePage(page)}
          registersPerPage={registersPerPage}
          totalCountOfRegisters={totalUsers}
          loading={loadingList}
        />
      }
    >
      <Flex mt={4} alignItems="center" justifyContent="end" w="360px">
        <Input
          error={undefined}
          name="searchUsername"
          placeholder="Username"
          size="sm"
          isDisabled={isFiltered}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          isInvalid={search.length > 0 && search.length <= 6}
        />
        {isFiltered ? (
          <IconButton
            icon={<X size={20} color="#718096" weight="light" />}
            aria-label="Search blocked"
            size="sm"
            ml={2}
            onClick={handleClearSearch}
          />
        ) : (
          <IconButton
            icon={<MagnifyingGlass size={20} color="#718096" weight="light" />}
            aria-label="Search by username"
            size="sm"
            ml={2}
            onClick={handleSearch}
          />
        )}
      </Flex>
      <Box w="100%" mt={4}>
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead bgColor="gray.100">
              <Tr>
                <Th fontSize={{ base: '0.7rem', sm: '0.7rem', lg: 'xs' }}>
                  nome
                </Th>
                <Th fontSize={{ base: '0.7rem', sm: '0.7rem', lg: 'xs' }}>
                  username
                </Th>
                <Th isNumeric>opções</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loadingList ? (
                <>
                  <Tr>
                    <Td colSpan={3}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={3}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={3}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={3}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={3}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={3}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={3}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={3}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={3}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                </>
              ) : (
                users.map((user: User) => {
                  return (
                    <Tr key={user.id}>
                      <Td fontSize={{ base: '0.7rem', sm: '0.7rem', lg: 'xs' }}>
                        {isLg ? (
                          <Editable
                            value={user.name}
                            onSave={(value) =>
                              updateName({ name: value, user })
                            }
                            loading={
                              whatUpdateIsLoading.id === user.id &&
                              whatUpdateIsLoading.type === 'name'
                            }
                          />
                        ) : (
                          user.name
                        )}
                      </Td>
                      <Td fontSize={{ base: '0.7rem', sm: '0.7rem', lg: 'xs' }}>
                        {isLg ? (
                          <Editable
                            value={user.username}
                            onSave={(value) =>
                              updateUsername({ username: value, user })
                            }
                            loading={
                              whatUpdateIsLoading.id === user.id &&
                              whatUpdateIsLoading.type === 'username'
                            }
                          />
                        ) : (
                          user.username
                        )}
                      </Td>
                      <Td
                        display="flex"
                        alignItems="center"
                        justifyContent="end"
                        gap={{ base: 4, lg: 8 }}
                        isNumeric
                      >
                        <UpdatePasswordModal user={user} />
                        <DeleteUserModal user={user} />
                      </Td>
                    </Tr>
                  )
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PageLayout>
  )
}
