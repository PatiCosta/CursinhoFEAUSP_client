import { useNavigate, useParams } from 'react-router-dom'
import { useDonations } from '../../../hooks/donations'
import { PageLayout } from '../../../layouts/PageLayout'
import { useEffect } from 'react'
import { Box, Flex, Grid, Link, useBreakpointValue } from '@chakra-ui/react'
import { Subtitle } from '../../../components/ViewPages/Subtitle'
import {
  ChatsCircle,
  MapPinLine,
  Notebook,
  WhatsappLogo,
  HandCoins,
} from '@phosphor-icons/react'
import { InfoBox } from '../../../components/ViewPages/InfoBox'
import { formatCPF } from '../../../utils/cpfUtils'
import { formatPhone } from '../../../utils/formatPhone'

export function ViewDonation() {
  const { id } = useParams()
  const { donations } = useDonations()
  const navigate = useNavigate()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const donation = donations.find((d) => d.id === id)
  const wppLink = donation ? `https://wa.me/55${donation.phoneNumber}` : '/'
  const handleReturn = () => navigate('/doacoes')

  useEffect(() => {
    if (donation === undefined) handleReturn()
  }, [donation])

  if (donation === undefined) return null

  return (
    <PageLayout
      variant="view"
      title={donation.name}
      subtitle="Visualizar doação"
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
            <InfoBox title="Nome" info={donation.name} />
            <InfoBox title="Gênero" info={donation.gender || 'Não informado'} />
            <InfoBox title="Data de nascimento" info={donation.birth} />
            <InfoBox title="CPF" info={formatCPF(donation.cpf)} />
            <InfoBox
              title="RG / UF de emissão"
              info={donation.rg ? `${donation.rg} / ${donation.ufrg}` : 'Não informado'}
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
            <InfoBox title="E-mail" info={donation.email} />
            <InfoBox title="Telefone" info={formatPhone(donation.phoneNumber)} />
            {donation.isPhoneWhatsapp && (
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
            <InfoBox title="Rua e número" info={`${donation.street}, ${donation.homeNumber}`} />
            <InfoBox title="Bairro" info={donation.district} />
            <InfoBox title="Complemento" info={donation.complement || 'Não informado'} />
            <InfoBox title="CEP" info={donation.zipCode} />
            <InfoBox title="Cidade" info={donation.city} />
            <InfoBox title="Estado" info={donation.state} />
          </Grid>
        </Box>

        {/* Doação */}
        <Box
          bg="white"
          borderRadius="xl"
          p={{ base: 4, lg: 6 }}
          boxShadow="card"
          mb={4}
          borderLeft="4px solid"
          borderLeftColor={donation.paymentStatus === 'active' ? 'green.400' : donation.paymentStatus === 'canceled' ? 'red.400' : 'yellow.400'}
        >
          <Subtitle
            size="lg"
            icon={<HandCoins size={isLg ? 24 : 20} color="#E9C46A" weight="duotone" />}
            lineColor="yellow.400"
          >
            Doação
          </Subtitle>
          <Grid mt={4} templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }} gap={4}>
            <InfoBox
              title="Valor da doação"
              info={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(donation.valuePaid / 100)}
            />
            <InfoBox
              title="Método de pagamento"
              info={donation.paymentMethod || 'Ainda não informado'}
            />
            <InfoBox
              title="Status"
              info={
                donation.paymentStatus === 'active' ? 'Confirmado'
                  : donation.paymentStatus === 'canceled' ? 'Cancelado'
                  : 'Ainda não informado'
              }
            />
            <InfoBox
              title="Data do pagamento"
              info={donation.paymentDate
                ? new Intl.DateTimeFormat('pt-BR').format(new Date(donation.paymentDate))
                : 'Ainda não informado'}
            />
            <InfoBox
              title="Data da doação"
              info={new Intl.DateTimeFormat('pt-BR').format(new Date(donation.createdAt))}
            />
            <InfoBox
              title="Expiração da doação"
              info={donation.donationExpirationDate
                ? new Intl.DateTimeFormat('pt-BR').format(new Date(donation.donationExpirationDate))
                : 'Não informado'}
            />
          </Grid>
        </Box>
      </Box>
    </PageLayout>
  )
}
