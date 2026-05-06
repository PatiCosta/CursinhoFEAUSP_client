import { PageLayout } from '../../layouts/PageLayout'
import {
  Box,
  Flex,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { HandCoins } from '@phosphor-icons/react'
import { Pagination } from '../../components/Pagination'
import { useDonations } from '../../hooks/donations'
import { Donation } from '../../interfaces/Donation.interface'
import { Filter } from './components/Filter'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Export } from './components/Export'

export function Donations() {
  const {
    changePage,
    donations,
    registersPerPage,
    totalDonations,
    page,
    loadingList,
  } = useDonations()
  const navigate = useNavigate()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })
  const [quantityOfFilters, setQuantityOfFilters] = useState(0)

  const { search } = useLocation()

  useEffect(() => {
    if (search !== '') {
      const query = Object.fromEntries(new URLSearchParams(search))
      setQuantityOfFilters(Object.entries(query).length)
    } else {
      setQuantityOfFilters(0)
    }
  }, [page, search])

  return (
    <PageLayout
      variant="list"
      title="Doações"
      subtitle="Aqui você pode visualizar as doações recebidas pelo cursinho"
      hasButton
      button={<Export />}
      hasPagination
      pagination={
        <Pagination
          currentPage={page}
          onPageChange={(page) => changePage(page)}
          registersPerPage={registersPerPage}
          totalCountOfRegisters={totalDonations}
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
      <Box w="100%" mt={6} bg="white" borderRadius="xl" boxShadow="card" overflow="hidden">
        <TableContainer>
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr bg="brand.blue">
                <Th fontSize={{ base: '0.7rem', sm: '0.7rem', lg: 'xs' }} color="gray.300" borderColor="transparent">
                  Doador
                </Th>
                {isLg && <Th color="gray.300" borderColor="transparent">E-mail</Th>}
                <Th fontSize={{ base: '0.7rem', sm: '0.7rem', lg: 'xs' }} color="gray.300" borderColor="transparent">
                  Valor
                </Th>
                {isLg && <Th color="gray.300" borderColor="transparent">Data da doação</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {loadingList ? (
                <>
                  <Tr>
                    <Td colSpan={isLg ? 4 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 4 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 4 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 4 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 4 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 4 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 4 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 4 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={isLg ? 4 : 2}>
                      <Skeleton height="20px" w="100%" />
                    </Td>
                  </Tr>
                </>
              ) : donations.length === 0 ? (
                <Tr>
                  <Td colSpan={isLg ? 4 : 2} py={16}>
                    <VStack spacing={3} color="gray.400">
                      <HandCoins size={48} weight="duotone" />
                      <Text fontWeight="medium" fontSize="md">Nenhuma doação encontrada</Text>
                      <Text fontSize="sm">Tente ajustar os filtros ou aguarde novas doações.</Text>
                    </VStack>
                  </Td>
                </Tr>
              ) : (
                donations.map((donation: Donation) => {
                  return (
                    <Tr
                      key={donation.id}
                      onClick={() => navigate(`/doacoes/${donation.id}`)}
                      cursor="pointer"
                      _hover={{ bg: 'blue.50' }}
                      transition="background 0.15s"
                    >
                      <Td
                        fontSize={{
                          base: '0.7rem',
                          sm: '0.7rem',
                          lg: 'xs',
                        }}
                      >
                        {donation.name}
                      </Td>
                      {isLg && <Td>{donation.email}</Td>}
                      <Td
                        fontSize={{
                          base: '0.7rem',
                          sm: '0.7rem',
                          lg: 'xs',
                        }}
                      >
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(donation.valuePaid / 100)}
                      </Td>
                      {isLg && (
                        <Td>
                          {donation.paymentDate && donation.paymentDate !== null
                            ? new Intl.DateTimeFormat('pt-BR').format(
                                new Date(donation.paymentDate),
                              )
                            : 'Data não informada'}
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
