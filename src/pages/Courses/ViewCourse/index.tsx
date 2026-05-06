import {
  Book,
  BookOpen,
  CalendarCheck,
  CaretDoubleRight,
  Notebook,
} from '@phosphor-icons/react'
import { PageLayout } from '../../../layouts/PageLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { useCourses } from '../../../hooks/courses'
import { Box, Flex, Grid, Link, Tag, Text, useBreakpointValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { UpdateClassStatus } from './components/UpdateClassStatus'
import { DeleteSelectiveStage } from './components/DeleteSelectiveStage'
import { DeleteDocument } from './components/DeleteDocument'
import { CreateDocument } from './components/CreateDocument'
import { CreateSelectiveStage } from './components/CreateSelectiveStage'
import { UpdateCourseInfo } from '../UpdateCourseInfo'
import { Subtitle } from '../../../components/ViewPages/Subtitle'
import { InfoBox } from '../../../components/ViewPages/InfoBox'

export function ViewCourse() {
  const { id } = useParams()
  const { courses } = useCourses()
  const navigate = useNavigate()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const course = courses.find((c) => c.id === id)
  const handleReturn = () => navigate('/cursos')

  useEffect(() => {
    if (course === undefined) handleReturn()
  }, [course])

  if (course === undefined) return null

  const accentColor = course.informations.color

  return (
    <PageLayout
      variant="view"
      title={course.title}
      subtitle="Gerenciar turma"
      hasButton
      button={<UpdateClassStatus courseStatus={course.status} courseId={course.id} />}
      returnTo={handleReturn}
    >
      <Box px={{ base: 3, sm: 3, lg: 6 }} mt={4} pb={8}>

        {/* Informações gerais */}
        <Box bg="white" borderRadius="xl" p={{ base: 4, lg: 6 }} boxShadow="card" mb={4}>
          <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={2}>
            <Subtitle
              size="lg"
              icon={<Notebook size={isLg ? 24 : 20} color={accentColor} weight="duotone" />}
              lineColor={accentColor}
            >
              Informações gerais
            </Subtitle>
            <Flex gap={2} align="center">
              <Tag
                colorScheme={course.status === 'active' ? 'green' : 'red'}
                borderRadius="full"
                fontWeight="semibold"
                size="md"
              >
                {course.status === 'active' ? 'Ativo' : 'Inativo'}
              </Tag>
              <UpdateCourseInfo id={course.id} course={course} />
            </Flex>
          </Flex>
          <Grid templateColumns={{ base: '1fr', lg: '1.5fr 1fr 1fr 1fr' }} gap={4}>
            <InfoBox title="Título" info={course.title} />
            <InfoBox title="Conteúdo" info={course.informations.classContent} />
            <InfoBox title="Dias de aula" info={course.informations.dateSchedule} />
            <InfoBox title="Horário" info={course.informations.hourSchedule} />
          </Grid>
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }} gap={4} mt={4}>
            <InfoBox title="Quem pode participar?" info={course.informations.whoCanParticipate} />
            <InfoBox title="Observações" info={course.informations.observations || 'Não há observações'} />
            <Box>
              <Text color="gray.400" fontSize={11} fontWeight="semibold" letterSpacing={1} textTransform="uppercase" mb={2}>
                Cor da turma
              </Text>
              <Flex align="center" gap={2}>
                <Box w="28px" h="28px" borderRadius="md" bgColor={accentColor} boxShadow="card" />
                <Text fontSize="sm" color="gray.600" fontFamily="mono">{accentColor}</Text>
              </Flex>
            </Box>
          </Grid>
          <Box mt={4}>
            <InfoBox title="Descrição" info={course.informations.description} />
          </Box>
        </Box>

        {/* Inscrições */}
        <Box bg="white" borderRadius="xl" p={{ base: 4, lg: 6 }} boxShadow="card" mb={4}>
          <Subtitle
            size="sm"
            icon={<CaretDoubleRight size={isLg ? 20 : 18} color={accentColor} weight="duotone" />}
            lineColor={accentColor}
          >
            Inscrições
          </Subtitle>
          <Grid mt={4} templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr 0.8fr' }} gap={4}>
            <InfoBox title="Período das inscrições" info={course.subscriptions.subscriptionSchedule} />
            <InfoBox title="Status das inscrições" info={course.subscriptions.status} />
            <InfoBox
              title="Valor"
              info={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.subscriptions.price / 100)}
            />
          </Grid>
        </Box>

        {/* Matrícula */}
        <Box bg="white" borderRadius="xl" p={{ base: 4, lg: 6 }} boxShadow="card" mb={4}>
          <Subtitle
            size="sm"
            icon={<CaretDoubleRight size={isLg ? 20 : 18} color={accentColor} weight="duotone" />}
            lineColor={accentColor}
          >
            Matrícula
          </Subtitle>
          <Grid mt={4} templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={4}>
            <InfoBox title="Informações sobre a matrícula" info={course.registrations.description} />
            <InfoBox
              title="Valor"
              info={course.registrations.value === 0
                ? 'Não informado'
                : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.registrations.value / 100)}
            />
          </Grid>
        </Box>

        {/* Etapas do processo seletivo */}
        <Box bg="white" borderRadius="xl" p={{ base: 4, lg: 6 }} boxShadow="card" mb={4}>
          <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={2}>
            <Subtitle
              size="lg"
              icon={<CalendarCheck size={isLg ? 24 : 20} color={accentColor} weight="duotone" />}
              lineColor={accentColor}
            >
              Etapas do Processo Seletivo
            </Subtitle>
            <CreateSelectiveStage courseId={course.id} courseTitle={course.title} />
          </Flex>

          {course.selectiveStages && course.selectiveStages.length === 0 && (
            <Text color="gray.400" fontSize="sm" mt={2}>Nenhuma etapa cadastrada.</Text>
          )}

          {course.selectiveStages?.reverse().map((stage, index) => (
            <Box
              key={stage.stagesID}
              mt={4}
              bg="gray.50"
              borderRadius="lg"
              p={4}
              borderLeft="3px solid"
              borderLeftColor={accentColor}
            >
              <Flex justify="space-between" align="center" mb={3}>
                <Subtitle
                  size="sm"
                  icon={<CaretDoubleRight size={18} color={accentColor} weight="duotone" />}
                  lineColor={accentColor}
                >
                  {`Etapa ${index + 1}`}
                </Subtitle>
                <DeleteSelectiveStage stageId={stage.stagesID} courseId={course.id} />
              </Flex>
              <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={4}>
                <InfoBox info={stage.when} title="Quando?" />
                <InfoBox
                  info={stage.resultsDate
                    ? new Intl.DateTimeFormat('pt-BR').format(new Date(stage.resultsDate))
                    : 'Não informado'}
                  title="Data dos resultados"
                />
              </Grid>
              <Box mt={4}>
                <InfoBox info={stage.description} title="Descrição" />
              </Box>
            </Box>
          ))}
        </Box>

        {/* Documentos */}
        <Box bg="white" borderRadius="xl" p={{ base: 4, lg: 6 }} boxShadow="card" mb={4}>
          <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={2}>
            <Subtitle
              size="lg"
              icon={<Book size={isLg ? 24 : 20} color={accentColor} weight="duotone" />}
              lineColor={accentColor}
            >
              Documentos
            </Subtitle>
            <CreateDocument courseId={course.id} courseTitle={course.title} />
          </Flex>

          {course.documents && course.documents.length === 0 && (
            <Text color="gray.400" fontSize="sm">Nenhum documento cadastrado.</Text>
          )}

          <Grid templateColumns={{ base: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4} mt={2}>
            {course.documents?.map((doc) => (
              <Box
                key={doc.docsID}
                bg="gray.50"
                borderRadius="lg"
                px={4}
                py={5}
                border="1px solid"
                borderColor="gray.200"
                position="relative"
                transition="all 0.2s"
                _hover={{ boxShadow: 'card', borderColor: accentColor }}
                textAlign="center"
              >
                <BookOpen
                  size={36}
                  color={accentColor}
                  weight="duotone"
                  style={{ margin: '0 auto 8px' }}
                />
                <Link
                  href={doc.downloadLink}
                  isExternal
                  fontSize="xs"
                  fontWeight="semibold"
                  color="gray.700"
                  _hover={{ color: 'brand.blue' }}
                  display="block"
                >
                  {doc.title}
                </Link>
                <Box mt={2}>
                  <DeleteDocument courseId={course.id} documentId={doc.docsID} documentTitle={doc.title} />
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </PageLayout>
  )
}
