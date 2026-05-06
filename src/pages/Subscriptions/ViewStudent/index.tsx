import { useNavigate, useParams } from 'react-router-dom'
import { PageLayout } from '../../../layouts/PageLayout'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Tag,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react'
import { Subtitle } from '../../../components/ViewPages/Subtitle'
import {
  ChatsCircle,
  MapPinLine,
  Notebook,
  WhatsappLogo,
  Student,
  Note,
  UsersThree,
} from '@phosphor-icons/react'
import { InfoBox } from '../../../components/ViewPages/InfoBox'
import { formatCPF } from '../../../utils/cpfUtils'
import { formatPhone } from '../../../utils/formatPhone'
import { useStudents } from '../../../hooks/subscriptions'

export function ViewStudent() {
  const { id } = useParams()
  const { students, confirmPayment, list } = useStudents()
  const navigate = useNavigate()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })
  const toast = useToast()
  const [confirmingTxid, setConfirmingTxid] = useState<string | null>(null)

  async function handleConfirmPayment(txid: string) {
    if (!id) return
    setConfirmingTxid(txid)
    try {
      const { matriculaID } = await confirmPayment(id, txid)
      toast({
        title: 'Inscrição confirmada!',
        description: `Matrícula ${matriculaID} gerada e e-mail de confirmação enviado.`,
        status: 'success',
        duration: 6000,
        isClosable: true,
      })
      await list()
    } catch (err: any) {
      const message = err?.response?.data?.error ?? 'Erro ao confirmar. Tente novamente.'
      toast({
        title: 'Erro ao confirmar pagamento',
        description: message,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    } finally {
      setConfirmingTxid(null)
    }
  }

  const student = students.find((s) => s.id === id)
  const wppLink = student ? `https://wa.me/55${student.phoneNumber}` : '/'
  const handleReturn = () => navigate('/inscricoes')

  useEffect(() => {
    if (student === undefined) handleReturn()
  }, [student])

  if (student === undefined) return null

  return (
    <PageLayout
      variant="view"
      title={student.name}
      subtitle="Visualizar inscrição"
      hasButton={false}
      returnTo={handleReturn}
    >
      <Box px={{ base: 3, sm: 3, lg: 6 }} mt={4} pb={8}>

        {/* Informações gerais */}
        <Box bg="white" borderRadius="xl" p={{ base: 4, lg: 6 }} boxShadow="card" mb={4}>
          <Subtitle
            size="lg"
            icon={<Notebook size={isLg ? 24 : 20} color="#E9C46A" weight="duotone" />}
            lineColor="yellow.400"
          >
            Informações gerais
          </Subtitle>
          <Grid mt={4} templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }} gap={4}>
            <InfoBox title="Nome" info={student.name} />
            <InfoBox title="Gênero" info={student.gender || 'Não informado'} />
            <InfoBox title="Data de nascimento" info={student.birth} />
            <InfoBox title="CPF" info={formatCPF(student.cpf)} />
            <InfoBox title="RG / UF de emissão" info={student.rg ? `${student.rg} / ${student.ufrg}` : 'Não informado'} />
            <InfoBox title="Ex-aluno?" info={student.exStudent} />
            <InfoBox title="Como nos conheceu?" info={student.metUsMethod || 'Não informado'} />
            <InfoBox
              gridColumn={{ lg: 'span 2' }}
              title="Carta de apresentação"
              info={student.selfDeclaration || 'Não informado'}
            />
          </Grid>
        </Box>

        {/* Contato */}
        <Box bg="white" borderRadius="xl" p={{ base: 4, lg: 6 }} boxShadow="card" mb={4}>
          <Subtitle
            size="lg"
            icon={<ChatsCircle size={isLg ? 24 : 20} color="#E9C46A" weight="duotone" />}
            lineColor="yellow.400"
          >
            Contato
          </Subtitle>
          <Grid mt={4} templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }} gap={4}>
            <InfoBox title="E-mail" info={student.email} />
            <InfoBox title="Telefone" info={formatPhone(student.phoneNumber)} />
            <InfoBox title="E-mail do responsável" info={student.emailResponsavel || 'N/A'} />
            {student.isPhoneWhatsapp && (
              <Flex
                as={Link}
                href={wppLink}
                isExternal
                align="center"
                gap={2}
                bg="green.50"
                color="green.700"
                borderRadius="md"
                px={3}
                py={3}
                fontSize="sm"
                fontWeight="medium"
                _hover={{ bg: 'green.100', textDecoration: 'none' }}
                transition="background 0.15s"
                borderLeft="3px solid"
                borderLeftColor="green.400"
              >
                <WhatsappLogo size={18} color="#25d366" weight="fill" />
                Abrir WhatsApp
              </Flex>
            )}
          </Grid>
        </Box>

        {/* Endereço */}
        <Box bg="white" borderRadius="xl" p={{ base: 4, lg: 6 }} boxShadow="card" mb={4}>
          <Subtitle
            size="lg"
            icon={<MapPinLine size={isLg ? 24 : 20} color="#E9C46A" weight="duotone" />}
            lineColor="yellow.400"
          >
            Endereço
          </Subtitle>
          <Grid mt={4} templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }} gap={4}>
            <InfoBox title="Rua e número" info={`${student.street}, ${student.homeNumber}`} />
            <InfoBox title="Bairro" info={student.district} />
            <InfoBox title="Complemento" info={student.complement || 'Não informado'} />
            <InfoBox title="CEP" info={student.zipCode} />
            <InfoBox title="Cidade" info={student.city} />
            <InfoBox title="Estado" info={student.state} />
          </Grid>
        </Box>

        {/* Escolaridade */}
        <Box bg="white" borderRadius="xl" p={{ base: 4, lg: 6 }} boxShadow="card" mb={4}>
          <Subtitle
            size="lg"
            icon={<Student size={isLg ? 24 : 20} color="#E9C46A" weight="duotone" />}
            lineColor="yellow.400"
          >
            Escolaridade
          </Subtitle>
          <Grid mt={4} templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={4}>
            <InfoBox title="Última escola" info={student.oldSchool} />
            <InfoBox title="Endereço da escola" info={student.oldSchoolAdress} />
            <InfoBox title="Data de graduação (EM)" info={student.highSchoolGraduationDate} />
            <InfoBox title="Período de estudo (EM)" info={student.highSchoolPeriod} />
          </Grid>
        </Box>

        {/* Inscrições */}
        <Flex align="center" gap={2} mb={3} mt={6}>
          <Note size={20} color="#E9C46A" weight="duotone" />
          <Text fontWeight="semibold" fontSize="lg" color="gray.700">Inscrições</Text>
        </Flex>

        {student.purcharsedSubscriptions.map((subscription) => {
          const isConcluida =
            subscription.paymentStatus === 'CONCLUIDA' ||
            subscription.paymentStatus === 'CONCLUÍDA'
          const isPending = !isConcluida
          const isConfirming = confirmingTxid === subscription.txid
          const statusColor = isConcluida ? 'green' : 'yellow'
          const statusLabel = isConcluida ? 'Confirmado' : 'Pendente'

          return (
            <Box
              key={subscription.schoolClassID + subscription.txid}
              bg="white"
              borderRadius="xl"
              p={{ base: 4, lg: 6 }}
              boxShadow="card"
              mb={4}
              borderLeft="4px solid"
              borderLeftColor={isConcluida ? 'green.400' : 'yellow.400'}
            >
              <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={2}>
                <Subtitle
                  size="sm"
                  icon={<UsersThree size={20} color="#E9C46A" weight="duotone" />}
                  lineColor="yellow.400"
                >
                  {subscription.productName}
                </Subtitle>
                <Tag colorScheme={statusColor} borderRadius="full" size="md" fontWeight="semibold">
                  {statusLabel}
                </Tag>
              </Flex>
              <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }} gap={4}>
                <InfoBox
                  title="ID Matrícula"
                  info={subscription.matriculaID || 'Aguardando Pagamento'}
                />
                <InfoBox title="Status do pagamento" info={subscription.paymentStatus} />
                <InfoBox
                  title="Valor pago"
                  info={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subscription.valuePaid)}
                />
                <InfoBox
                  title="Data do pagamento"
                  info={subscription.paymentDate
                    ? new Intl.DateTimeFormat('pt-BR').format(new Date(subscription.paymentDate))
                    : 'Não informado'}
                />
                <InfoBox title="Cód. Desconto" info={subscription.codigoDesconto || 'Nenhum'} />
                <InfoBox title="Método de pagamento" info={subscription.paymentMethod} />
              </Grid>
              {isPending && (
                <Button
                  mt={4}
                  size="sm"
                  colorScheme="yellow"
                  isLoading={isConfirming}
                  loadingText="Confirmando..."
                  onClick={() => handleConfirmPayment(subscription.txid)}
                >
                  Confirmar pagamento manualmente
                </Button>
              )}
            </Box>
          )
        })}
      </Box>
    </PageLayout>
  )
}
