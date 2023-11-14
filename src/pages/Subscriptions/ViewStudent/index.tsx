import { useNavigate, useParams } from 'react-router-dom'
import { PageLayout } from '../../../layouts/PageLayout'
import { useEffect } from 'react'
import { Box, Grid, Link, useBreakpointValue } from '@chakra-ui/react'
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
import { formatCep } from '../../../utils/cepUtils'
import { useStudents } from '../../../hooks/subscriptions'

export function ViewStudent() {
  const { id } = useParams()
  const { students } = useStudents()
  const navigate = useNavigate()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const student = students.find((s) => s.id === id)
  const wppLink = student ? `https://wa.me/55${student.phoneNumber}` : '/'

  const handleReturn = () => navigate('/inscricoes')

  useEffect(() => {
    if (student === undefined) {
      handleReturn()
    }
  })

  if (student !== undefined) {
    return (
      <PageLayout
        variant="view"
        title="Visualizar inscrição"
        subtitle="Aqui você pode visualizar as informações deste inscrito"
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
            <InfoBox title="Nome do inscrito" info={student.name} />
            <InfoBox
              title="Gênero"
              info={student.gender ? student.gender : 'Não informado'}
            />
            <InfoBox title="Data de nascimento" info={student.birth} />
            <InfoBox title="CPF" info={formatCPF(student.cpf)} />
            <InfoBox
              title="RG e UF de emissão"
              info={
                student.rg ? `${student.rg}/${student.ufrg}` : 'Não informado'
              }
            />
            <InfoBox title="É ex aluno?" info={student.exStudent} />
            <InfoBox
              title="Como conheceu a gente?"
              info={student.metUsMethod ? student.metUsMethod : 'Não informado'}
            />

            <InfoBox
              gridColumnStart={0}
              gridColumnEnd={2}
              title="Carta de apresentação"
              info={
                student.selfDeclaration
                  ? student.selfDeclaration
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
            <InfoBox title="E-mail" info={student.email} />
            <InfoBox
              title="Número de telefone"
              info={formatPhone(student.phoneNumber)}
            />
            {student.isPhoneWhatsapp ?? (
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
              info={`${student.street}, ${student.homeNumber}`}
            />
            <InfoBox title="Bairro" info={student.district} />
            <InfoBox
              title="Complemento"
              info={student.complement ? student.complement : 'Não informado'}
            />
            <InfoBox title="CEP" info={formatCep(student.zipCode)} />
            <InfoBox title="Cidade" info={student.city} />
            <InfoBox title="Estado" info={student.state} />
          </Grid>
          <Subtitle
            size="lg"
            icon={
              <Student size={isLg ? 32 : 24} color="#E9C46A" weight="duotone" />
            }
            lineColor="yellow.400"
            justifyContent="space-between"
            w="100%"
            mt={8}
          >
            Escolaridade
          </Subtitle>
          <Grid
            mt={4}
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 4, lg: 8 }}
            textAlign="start"
          >
            <InfoBox title="Nome da última escola" info={student.oldSchool} />
            <InfoBox
              title="Endereço da última escola"
              info={student.oldSchoolAdress}
            />
            <InfoBox
              title="Data de graduação do Ensino Médio"
              info={student.highSchoolGraduationDate}
            />
            <InfoBox
              title="Período de estudo do Ensino Médio"
              info={student.highSchoolPeriod}
            />
          </Grid>
          <Subtitle
            size="lg"
            icon={
              <Note size={isLg ? 32 : 24} color="#E9C46A" weight="duotone" />
            }
            lineColor="yellow.400"
            justifyContent="space-between"
            w="100%"
            mt={8}
          >
            Inscrições
          </Subtitle>
          {student.purcharsedSubscriptions.map((subscription) => (
            <Box
              ml={{ base: 6, lg: 9 }}
              mt={{ base: 6, lg: 8 }}
              key={subscription.schoolClassID}
            >
              <Subtitle
                size="sm"
                icon={
                  <UsersThree
                    size={isLg ? 32 : 24}
                    color="#E9C46A"
                    weight="duotone"
                  />
                }
                lineColor="yellow.400"
                justifyContent="start"
                gap={7}
              >
                {subscription.productName}
              </Subtitle>
              <Grid
                templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                mt={4}
                gap={{ base: 4, lg: 8 }}
              >
                <InfoBox
                  info={subscription.paymentMethod}
                  title="Método de pagamento"
                />
                <InfoBox
                  info={subscription.paymentStatus}
                  title="Status do pagamento"
                />
                <InfoBox
                  info={
                    subscription.paymentDate
                      ? new Intl.DateTimeFormat('pt-BR').format(
                          new Date(subscription.paymentDate),
                        )
                      : 'Não informado'
                  }
                  title="Data do pagamento"
                />
                <InfoBox
                  info={new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(subscription.valuePaid)}
                  title="Valor pago"
                />
              </Grid>
            </Box>
          ))}
        </Box>
      </PageLayout>
    )
  } else return null
}
