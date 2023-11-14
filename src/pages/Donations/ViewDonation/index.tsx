import { useNavigate, useParams } from 'react-router-dom'
import { useDonations } from '../../../hooks/donations'
import { PageLayout } from '../../../layouts/PageLayout'
import { useEffect } from 'react'
import { Box, Grid, Link, useBreakpointValue } from '@chakra-ui/react'
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
import { formatCep } from '../../../utils/cepUtils'

export function ViewDonation() {
  const { id } = useParams()
  const { donations } = useDonations()
  const navigate = useNavigate()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const donation = donations.find((d) => d.id === id)
  const wppLink = donation ? `https://wa.me/55${donation.phoneNumber}` : '/'

  const handleReturn = () => navigate('/doacoes')

  useEffect(() => {
    if (donation === undefined) {
      handleReturn()
    }
  })

  if (donation !== undefined) {
    return (
      <PageLayout
        variant="view"
        title="Visualizar doação"
        subtitle="Aqui você pode visualizar as informações desta doação"
        hasButton={false}
        returnTo={handleReturn}
      >
        <Box
          pl={{ base: 4, sm: 4, lg: 16 }}
          pr={{ base: 4, sm: 4, lg: 6 }}
          mt={8}
        >
          <Subtitle
            size="lg"
            icon={
              <Notebook
                size={isLg ? 32 : 24}
                color="#E9C46A"
                weight="duotone"
              />
            }
            lineColor="yellow.400"
            justifyContent="space-between"
            w="100%"
          >
            Informações gerais
          </Subtitle>
          <Grid
            mt={4}
            templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
            gap={{ base: 4, lg: 8 }}
            textAlign="start"
          >
            <InfoBox title="Nome do doador" info={donation.name} />
            <InfoBox
              title="Gênero"
              info={donation.gender ? donation.gender : 'Não informado'}
            />
            <InfoBox title="Data de nascimento" info={donation.birth} />
            <InfoBox title="CPF" info={formatCPF(donation.cpf)} />
            <InfoBox
              title="RG e UF de emissão"
              info={
                donation.rg
                  ? `${donation.rg}/${donation.ufrg}`
                  : 'Não informado'
              }
            />
          </Grid>
          <Subtitle
            size="lg"
            icon={
              <ChatsCircle
                size={isLg ? 32 : 24}
                color="#E9C46A"
                weight="duotone"
              />
            }
            lineColor="yellow.400"
            justifyContent="space-between"
            w="100%"
            mt={8}
          >
            Contato
          </Subtitle>
          <Grid
            mt={4}
            templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
            gap={{ base: 4, lg: 8 }}
            textAlign="start"
          >
            <InfoBox title="E-mail" info={donation.email} />
            <InfoBox
              title="Número de telefone"
              info={formatPhone(donation.phoneNumber)}
            />
            {donation.isPhoneWhatsapp ?? (
              <Link href={wppLink} isExternal>
                <WhatsappLogo size={16} color="#075e54" weight="duotone" />{' '}
                Abrir whatsapp
              </Link>
            )}
          </Grid>
          <Subtitle
            size="lg"
            icon={
              <MapPinLine
                size={isLg ? 32 : 24}
                color="#E9C46A"
                weight="duotone"
              />
            }
            lineColor="yellow.400"
            justifyContent="space-between"
            w="100%"
            mt={8}
          >
            Endereço
          </Subtitle>
          <Grid
            mt={4}
            templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
            gap={{ base: 4, lg: 8 }}
            textAlign="start"
          >
            <InfoBox
              title="Rua e número"
              info={`${donation.street}, ${donation.homeNumber}`}
            />
            <InfoBox title="Bairro" info={donation.district} />
            <InfoBox
              title="Complemento"
              info={donation.complement ? donation.complement : 'Não informado'}
            />
            <InfoBox title="CEP" info={formatCep(donation.zipCode)} />
            <InfoBox title="Cidade" info={donation.city} />
            <InfoBox title="Estado" info={donation.state} />
          </Grid>
          <Subtitle
            size="lg"
            icon={
              <HandCoins
                size={isLg ? 32 : 24}
                color="#E9C46A"
                weight="duotone"
              />
            }
            lineColor="yellow.400"
            justifyContent="space-between"
            w="100%"
            mt={8}
          >
            Doação
          </Subtitle>
          <Grid
            mt={4}
            templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
            gap={{ base: 4, lg: 8 }}
            textAlign="start"
          >
            <InfoBox
              title="Valor da doação"
              info={new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(donation.valuePaid)}
            />
            <InfoBox
              title="Método de pagamento"
              info={
                donation.paymentMethod
                  ? donation.paymentMethod
                  : 'Ainda não informado'
              }
            />
            <InfoBox
              title="Status do pagamento"
              info={
                donation.paymentStatus === 'active'
                  ? 'Confirmado'
                  : donation.paymentStatus === 'canceled'
                  ? 'Cancelado'
                  : 'Ainda não informado'
              }
            />
            <InfoBox
              title="Data do pagamento"
              info={
                donation.paymentDate
                  ? new Intl.DateTimeFormat('pt-BR').format(
                      new Date(donation.paymentDate),
                    )
                  : 'Ainda não informado'
              }
            />
            <InfoBox
              title="Data da doação"
              info={new Intl.DateTimeFormat('pt-BR').format(
                new Date(donation.createdAt),
              )}
            />
            <InfoBox
              title="Data de expiração da doação"
              info={
                donation.donationExpirationDate
                  ? new Intl.DateTimeFormat('pt-BR').format(
                      new Date(donation.donationExpirationDate),
                    )
                  : 'Não informado'
              }
            />
          </Grid>
        </Box>
      </PageLayout>
    )
  } else return null
}
