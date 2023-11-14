import { PageLayout } from '../../layouts/PageLayout'
import {
  Box,
  Flex,
  Skeleton,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Pagination } from '../../components/Pagination'
import { useStudents } from '../../hooks/subscriptions'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Student } from '../../interfaces/Student.interface'
import { Filter } from './components/Filter'
import { Export } from './components/Export'

export function Subscriptions() {
  const {
    changePage,
    students,
    registersPerPage,
    totalStudents,
    page,
    loadingList,
  } = useStudents()
  const navigate = useNavigate()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })
  const [quantityOfFilters, setQuantityOfFilters] = useState(0)

  useEffect(() => {
    if (location.search !== '') {
      const query = Object.fromEntries(new URLSearchParams(location.search))
      setQuantityOfFilters(Object.entries(query).length)
    } else {
      setQuantityOfFilters(0)
    }
  }, [page, location.search])

  return (
    <PageLayout
      variant="list"
      title="Inscrições"
      subtitle="Aqui você pode visualizar as inscrições para cada turma"
      hasButton
      button={<Export />}
      hasPagination
      pagination={
        <Pagination
          currentPage={page}
          onPageChange={(page) => changePage(page)}
          registersPerPage={registersPerPage}
          totalCountOfRegisters={totalStudents}
          loading={loadingList}
        />
      }
    >
      <Flex mt={4} alignItems="center" gap={{ base: 2, sm: 2, lg: 4 }}>
        <Filter />
        <Text fontSize={{ base: 'sm', sm: 'sm', lg: 'md' }}>
          {quantityOfFilters === 0
            ? 'Nenhum filtro aplicado'
            : `${quantityOfFilters} filtro${
                quantityOfFilters > 1 ? 's' : ''
              } aplicado${quantityOfFilters > 1 ? 's' : ''}`}
        </Text>
      </Flex>
      <Box w="100%" mt={4}>
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead bgColor="gray.100">
              <Tr>
                <Th fontSize={{ base: '0.7rem', sm: '0.7rem', lg: 'xs' }}>
                  Nome
                </Th>
                <Th fontSize={{ base: '0.7rem', sm: '0.7rem', lg: 'xs' }}>
                  E-mail
                </Th>
                {isLg && <Th>Turmas de Inscrição</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {loadingList ? (
                <>
                  <Tr>
                    <Td colSpan={isLg ? 3 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 3 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 3 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 3 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 3 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 3 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 3 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 3 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 3 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                </>
              ) : (
                students.map((student: Student) => {
                  return (
                    <Tr
                      key={student.id}
                      onClick={() => navigate(`/inscricoes/${student.id}`)}
                      cursor="pointer"
                      _hover={{ bgColor: 'gray.100' }}
                    >
                      <Td
                        fontSize={{
                          base: '0.7rem',
                          sm: '0.7rem',
                          lg: 'xs',
                        }}
                      >
                        {student.name}
                      </Td>
                      <Td
                        fontSize={{
                          base: '0.7rem',
                          sm: '0.7rem',
                          lg: 'xs',
                        }}
                      >
                        {student.email}
                      </Td>
                      {isLg && (
                        <Td>
                          {student.purcharsedSubscriptions.map(
                            (subscription) => (
                              <Tag
                                key={subscription.schoolClassID}
                                bgColor="yellow.400"
                              >
                                {subscription.productName}
                              </Tag>
                            ),
                          )}
                        </Td>
                      )}
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
