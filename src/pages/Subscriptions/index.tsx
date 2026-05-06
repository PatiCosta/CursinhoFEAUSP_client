import { PageLayout } from '../../layouts/PageLayout'
import {
  Box,
  Flex,
  Grid,
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
  IconButton,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { CheckCircle, MagnifyingGlass, UsersThree, Warning } from '@phosphor-icons/react'
import { Pagination } from '../../components/Pagination'
import { useStudents } from '../../hooks/subscriptions'
import { useCourses } from '../../hooks/courses'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
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
  const location = useLocation()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })
  const quantityOfFilters = useMemo(() => {
    if (location.search === '') return 0
    return Object.keys(Object.fromEntries(new URLSearchParams(location.search))).length
  }, [location.search])

  const { courses } = useCourses()

  // Mapa ID -> { title, color } construído a partir do contexto de cursos (sem request extra)
  const classDetails = useMemo(() => {
    const map: Record<string, { title: string; color: string }> = {}
    courses.forEach((cls) => {
      if (cls.id) {
        map[cls.id] = {
          title: cls.title,
          color: cls.informations?.color || 'gray.500',
        }
      }
    })
    return map
  }, [courses])

  // --- LÓGICA DE TRANSFORMAÇÃO (FLATTEN) COM FILTRO VISUAL ---
  const subscriptionRows = useMemo(() => {
    if (!students) return [];

    // Pegamos os filtros ativos da URL para filtrar também as linhas da tabela
    const searchParams = new URLSearchParams(location.search);
    const paymentStatusFilter = searchParams.get('paymentStatus');
    const schoolClassIDFilter = searchParams.get('schoolClassID');

    return students.flatMap(student => {
      if (!student.purcharsedSubscriptions || student.purcharsedSubscriptions.length === 0) {
        return [];
      }
      
      return student.purcharsedSubscriptions
        .filter(sub => {
            // Se houver filtro de status, esconde as inscrições que não batem
            if (paymentStatusFilter && sub.paymentStatus !== paymentStatusFilter) {
                return false;
            }
            // Se houver filtro de turma, esconde as inscrições de outras turmas
            if (schoolClassIDFilter && sub.schoolClassID !== schoolClassIDFilter) {
                return false;
            }
            return true;
        })
        .map(subscription => {
            const details = classDetails[subscription.schoolClassID];
            
            // Nome: Tenta do banco, senão pega do mapa, senão fallback
            const nomeTurma = subscription.productName || details?.title || 'Turma não identificada';
            
            // Cor: Pega do mapa (atualizado), senão fallback
            const corTurma = details?.color || 'gray.500';

            return {
                studentId: student.id,
                studentName: student.name,
                studentEmail: student.email,
                productName: nomeTurma,
                classColor: corTurma, // Passamos a cor para a renderização
                paymentStatus: subscription.paymentStatus,
                paymentDate: subscription.paymentDate,
                valuePaid: subscription.valuePaid,
                matriculaID: subscription.matriculaID,
                schoolClassID: subscription.schoolClassID
            };
        });
    });
  }, [students, classDetails, location.search]); // Adicionado location.search nas dependências

  const stats = useMemo(() => ({
    total: subscriptionRows.length,
    confirmed: subscriptionRows.filter(r => r.paymentStatus === 'CONCLUIDA' || r.paymentStatus === 'CONCLUÍDA').length,
    pending: subscriptionRows.filter(r => r.paymentStatus === 'PENDENTE').length,
  }), [subscriptionRows])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONCLUIDA': return 'green'
      case 'active': return 'blue' 
      case 'canceled': return 'red'
      case 'PENDENTE': return 'yellow'
      default: return 'gray'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
        case 'CONCLUIDA': return 'Pago'
        case 'active': return 'Ativo'
        case 'canceled': return 'Cancelado'
        case 'PENDENTE': return 'Pendente'
        default: return status || 'Desconhecido'
      }
  }

  return (
   <PageLayout
      variant="list"
      title="Inscrições"
      subtitle="Gerencie as inscrições por turma e status de pagamento"
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
      {/* Stats bar */}
      {!loadingList && (
        <Grid templateColumns="repeat(3, 1fr)" gap={3} mt={4}>
          <Box bg="white" borderRadius="xl" p={4} boxShadow="card" borderLeft="4px solid" borderLeftColor="brand.blue">
            <Text fontSize="10px" color="gray.400" fontWeight="semibold" textTransform="uppercase" letterSpacing={1} mb={1}>Total</Text>
            <Flex align="center" gap={2}>
              <Text fontSize="2xl" fontWeight="bold" color="brand.blue" lineHeight={1}>{stats.total}</Text>
              <UsersThree size={20} color="#2a255a" weight="duotone" style={{ opacity: 0.4 }} />
            </Flex>
          </Box>
          <Box bg="white" borderRadius="xl" p={4} boxShadow="card" borderLeft="4px solid" borderLeftColor="green.400">
            <Text fontSize="10px" color="gray.400" fontWeight="semibold" textTransform="uppercase" letterSpacing={1} mb={1}>Confirmados</Text>
            <Flex align="center" gap={2}>
              <Text fontSize="2xl" fontWeight="bold" color="green.600" lineHeight={1}>{stats.confirmed}</Text>
              <CheckCircle size={20} color="#48BB78" weight="duotone" style={{ opacity: 0.5 }} />
            </Flex>
          </Box>
          <Box bg="white" borderRadius="xl" p={4} boxShadow="card" borderLeft="4px solid" borderLeftColor="yellow.400">
            <Text fontSize="10px" color="gray.400" fontWeight="semibold" textTransform="uppercase" letterSpacing={1} mb={1}>Pendentes</Text>
            <Flex align="center" gap={2}>
              <Text fontSize="2xl" fontWeight="bold" color="yellow.600" lineHeight={1}>{stats.pending}</Text>
              <Warning size={20} color="#D69E2E" weight="duotone" style={{ opacity: 0.5 }} />
            </Flex>
          </Box>
        </Grid>
      )}

      <Flex mt={4} alignItems="center" gap={{ base: 2, sm: 2, lg: 4 }}>
        <Filter />
        <Text fontSize={{ base: 'sm', sm: 'sm', lg: 'md' }} color="gray.500">
          {quantityOfFilters === 0
            ? 'Sem filtros ativos'
            : `${quantityOfFilters} filtro${quantityOfFilters > 1 ? 's' : ''} ativo${quantityOfFilters > 1 ? 's' : ''}`}
        </Text>
      </Flex>

      <Box w="100%" mt={6} bg="white" borderRadius="xl" boxShadow="card" overflow="hidden">
        <TableContainer>
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr bg="brand.blue">
                <Th py={3} fontSize="xs" textTransform="uppercase" color="gray.300" borderColor="transparent">Aluno / E-mail</Th>
                <Th py={3} fontSize="xs" textTransform="uppercase" color="gray.300" borderColor="transparent">Turma</Th>
                <Th py={3} fontSize="xs" textTransform="uppercase" color="gray.300" borderColor="transparent">Status</Th>
                {isLg && <Th py={3} fontSize="xs" textTransform="uppercase" color="gray.300" borderColor="transparent">Data / Valor</Th>}
                <Th py={3} isNumeric fontSize="xs" textTransform="uppercase" color="gray.300" borderColor="transparent">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loadingList ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Tr key={i}>
                    <Td><Skeleton height="20px" width="150px" mb={1} /><Skeleton height="15px" width="100px" /></Td>
                    <Td><Skeleton height="20px" width="120px" /></Td>
                    <Td><Skeleton height="20px" width="80px" /></Td>
                    {isLg && <Td><Skeleton height="20px" width="100px" /></Td>}
                    <Td><Skeleton height="20px" width="30px" /></Td>
                  </Tr>
                ))
              ) : subscriptionRows.length === 0 ? (
                <Tr>
                  <Td colSpan={isLg ? 5 : 4} py={16}>
                    <VStack spacing={3} color="gray.400">
                      <UsersThree size={48} weight="duotone" />
                      <Text fontWeight="medium" fontSize="md">Nenhuma inscrição encontrada</Text>
                      <Text fontSize="sm">Tente ajustar os filtros ou aguarde novos registros.</Text>
                    </VStack>
                  </Td>
                </Tr>
              ) : (
                subscriptionRows.map((row, i) => (
                  <Tr
                    key={`${row.studentId}-${row.schoolClassID}-index-${i}`}
                    _hover={{ bg: 'blue.50', cursor: 'pointer' }}
                    transition="background 0.15s"
                  >
                    {/* Coluna Aluno */}
                    <Td py={3}>
                      <Text fontWeight="bold" color="gray.700" fontSize="sm">{row.studentName}</Text>
                      <Text fontSize="xs" color="gray.500">{row.studentEmail}</Text>
                    </Td>

                    {/* Coluna Turma (ATUALIZADA COM A BADGE COLORIDA) */}
                    <Td py={3}>
                      <Tag 
                        size="md" 
                        variant="solid" 
                        bgColor={row.classColor} // Aplica a cor vinda do banco
                        color="white" // Texto branco para contraste
                        borderRadius="md"
                        px={3}
                        boxShadow="sm"
                        whiteSpace="nowrap"
                        maxWidth="200px"
                        textOverflow="ellipsis"
                        overflow="hidden"
                      >
                        {row.productName}
                      </Tag>
                      
                      {row.matriculaID && (
                        <Box mt={1}>
                             <Tag size="sm" variant="solid" colorScheme="blue" borderRadius="md">
                                {row.matriculaID}
                             </Tag>
                        </Box>
                      )}
                    </Td>

                    {/* Coluna Status */}
                    <Td py={3}>
                      <Tag 
                        size="sm" 
                        variant="solid" 
                        colorScheme={getStatusColor(row.paymentStatus)}
                        borderRadius="md"
                        px={3}
                      >
                        {getStatusLabel(row.paymentStatus)}
                      </Tag>
                    </Td>

                    {/* Coluna Data/Valor (Desktop) */}
                    {isLg && (
                      <Td py={3}>
                         <Flex direction="column">
                            <Text fontSize="xs" color="gray.600">
                                {row.paymentDate ? new Date(row.paymentDate).toLocaleDateString('pt-BR') : '-'}
                            </Text>
                            <Text fontSize="xs" fontWeight="bold" color="gray.500">
                                {row.valuePaid ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.valuePaid) : '-'}
                            </Text>
                         </Flex>
                      </Td>
                    )}

                    {/* Coluna Ações */}
                    <Td py={3} isNumeric>
                        <Tooltip label="Ver detalhes do aluno" hasArrow>
                            <IconButton
                                aria-label="Ver detalhes"
                                icon={<MagnifyingGlass weight="bold" />}
                                size="sm"
                                variant="ghost"
                                colorScheme="blue"
                                onClick={() => navigate(`/inscricoes/${row.studentId}`)}
                            />
                        </Tooltip>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PageLayout>
  )
}