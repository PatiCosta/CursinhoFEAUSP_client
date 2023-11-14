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
import { Box, Grid, Link, Text, useBreakpointValue } from '@chakra-ui/react'
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
    if (course === undefined) {
      handleReturn()
    }
  })

  if (course !== undefined) {
    return (
      <PageLayout
        variant="view"
        title={course.title}
        subtitle="Aqui você pode visualizar as informações e gerenciar esta turma"
        hasButton
        button={
          <UpdateClassStatus
            courseStatus={course.status}
            courseId={course.id}
          />
        }
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
                color={course.informations.color}
                weight="duotone"
              />
            }
            lineColor={course.informations.color}
            hasButton
            button={<UpdateCourseInfo id={course.id} course={course} />}
            justifyContent="space-between"
            w="100%"
          >
            Informações gerais
          </Subtitle>
          <Grid
            mt={4}
            templateColumns={{ base: '1fr', lg: '1.4fr .9fr .9fr 1.3fr .5fr' }}
            gap={{ base: 4, lg: 8 }}
            textAlign="start"
          >
            <InfoBox title="Título" info={course.title} />
            <InfoBox title="Conteúdo" info={course.informations.classContent} />
            <InfoBox
              title="Dias de aula"
              info={course.informations.dateSchedule}
            />
            <InfoBox
              title="Horário das aulas"
              info={course.informations.hourSchedule}
            />
            <Box>
              <Text
                color="gray.700"
                fontSize={{ base: 16, lg: 18 }}
                letterSpacing={0.8}
                fontWeight="bold"
              >
                Cor
              </Text>
              <Box
                w="80px"
                h="18px"
                borderRadius="sm"
                bgColor={course.informations.color}
              />
            </Box>
          </Grid>
          <InfoBox
            title="Status"
            info={`${
              course.status === 'active' ? 'Ativo' : 'Inativo'
            }. Esta turma ${
              course.status === 'inactive' ? 'não' : ''
            } está aparecendo no site para novas inscrições.`}
            mt={4}
          />
          <InfoBox
            title="Quem pode participar?"
            info={course.informations.whoCanParticipate}
            mt={4}
          />
          <InfoBox
            title="Descrição"
            info={course.informations.description}
            mt={4}
          />
          <InfoBox
            title="Observações"
            info={
              course.informations.observations
                ? course.informations.observations
                : 'Não há observações'
            }
            mt={4}
          />
          <Box ml={{ base: 6, lg: 9 }} mt={{ base: 6, lg: 8 }}>
            <Subtitle
              size="sm"
              icon={
                <CaretDoubleRight
                  size={isLg ? 32 : 24}
                  color={course.informations.color}
                  weight="duotone"
                />
              }
              lineColor={course.informations.color}
              justifyContent="space-between"
            >
              Inscrições
            </Subtitle>
            <Grid
              mt={4}
              templateColumns={{ base: '1fr', lg: '1.2fr .9fr .9fr' }}
              gap={{ base: 4, lg: 8 }}
              textAlign="start"
            >
              <InfoBox
                title="Período das incrições"
                info={course.subscriptions.subscriptionSchedule}
              />
              <InfoBox title="Status" info={course.subscriptions.status} />
              <InfoBox
                title="Valor"
                info={new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(course.subscriptions.price / 100)}
              />
            </Grid>
          </Box>
          <Subtitle
            size="lg"
            icon={
              <CalendarCheck
                size={isLg ? 32 : 24}
                color={course.informations.color}
                weight="duotone"
                style={{ flexShrink: '0' }}
              />
            }
            lineColor={course.informations.color}
            hasButton
            button={
              <CreateSelectiveStage
                courseId={course.id}
                courseTitle={course.title}
              />
            }
            mt={8}
            justifyContent="space-between"
            w="100%"
          >
            Etapas do Processo Seletivo
          </Subtitle>
          {course.selectiveStages?.reverse().map((stage, index) => (
            <Box
              ml={{ base: 6, lg: 9 }}
              mt={{ base: 6, lg: 8 }}
              key={stage.stagesID}
            >
              <Subtitle
                size="sm"
                icon={
                  <CaretDoubleRight
                    size={isLg ? 32 : 24}
                    color={course.informations.color}
                    weight="duotone"
                  />
                }
                lineColor={course.informations.color}
                hasButton
                button={
                  <DeleteSelectiveStage
                    stageId={stage.stagesID}
                    courseId={course.id}
                  />
                }
                justifyContent="start"
                gap={6}
              >
                {`Etapa ${index + 1}`}
              </Subtitle>
              <Grid
                templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                mt={4}
                gap={{ base: 4, lg: 8 }}
              >
                <InfoBox info={stage.when} title="Quando?" />
                <InfoBox
                  info={
                    stage.resultsDate
                      ? new Intl.DateTimeFormat('pt-BR').format(
                          new Date(stage.resultsDate),
                        )
                      : 'Não informado'
                  }
                  title="Data dos resultados"
                />
              </Grid>
              <InfoBox info={stage.description} title="Descrição" mt={4} />
            </Box>
          ))}
          <Subtitle
            size="lg"
            icon={
              <Book
                size={isLg ? 32 : 24}
                color={course.informations.color}
                weight="duotone"
                style={{ flexShrink: '0' }}
              />
            }
            lineColor={course.informations.color}
            hasButton
            button={
              <CreateDocument courseId={course.id} courseTitle={course.title} />
            }
            mt={8}
            justifyContent="space-between"
            w="100%"
          >
            Documentos
          </Subtitle>
          <Grid
            templateColumns={{ base: '1fr 1fr', lg: 'repeat(5, 1fr)' }}
            ml={{ base: 0, lg: 9 }}
            mt={{ base: 6, lg: 8 }}
            gap={{ base: 4, lg: 7 }}
          >
            {course.documents?.map((doc) => (
              <Box
                boxShadow={{ base: 'md', lg: 'xl' }}
                borderRadius="lg"
                px={8}
                py={4}
                key={doc.docsID}
                border=".5px solid"
                borderColor="gray.200"
                position="relative"
              >
                <BookOpen
                  size={48}
                  color={course.informations.color}
                  weight="duotone"
                  style={{ margin: 'auto' }}
                />
                <Box textAlign="center" mt={4}>
                  <Link
                    href={doc.downloadLink}
                    isExternal
                    textDecoration="underline"
                    fontWeight="semibold"
                  >
                    {doc.title}
                  </Link>
                </Box>
                <DeleteDocument
                  courseId={course.id}
                  documentId={doc.docsID}
                  documentTitle={doc.title}
                />
              </Box>
            ))}
          </Grid>
        </Box>
      </PageLayout>
    )
  } else return null
}
