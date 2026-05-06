import { ArrowCircleUpRight, CalendarBlank, Clock, GraduationCap } from '@phosphor-icons/react'
import { PageLayout } from '../../layouts/PageLayout'
import { Badge, Box, Flex, Grid, Skeleton, Tag, Text, VStack } from '@chakra-ui/react'
import { Pagination } from '../../components/Pagination'
import { useEffect } from 'react'
import { useCourses } from '../../hooks/courses'
import { Link } from 'react-router-dom'
import { CreateCourse } from './CreateCourse'

export function Courses() {
  const {
    list,
    courses,
    page,
    loadingList,
    changePage,
    registersPerPage,
    totalCourses,
  } = useCourses()

  useEffect(() => {
    list()
  }, [list, page])

  return (
    <PageLayout
      variant="list"
      title="Turmas"
      subtitle="Aqui você pode gerenciar as turmas oferecidas pelo cursinho!"
      hasButton
      button={<CreateCourse />}
      hasPagination
      pagination={
        <Pagination
          currentPage={page}
          onPageChange={(page) => changePage(page)}
          registersPerPage={registersPerPage}
          totalCountOfRegisters={totalCourses}
          loading={loadingList}
        />
      }
    >
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
        mt={4}
        gap={8}
        rowGap={4}
        mb={2}
      >
        {loadingList ? (
          <>
            <Skeleton w="100%" h="200px" />
            <Skeleton w="100%" h="200px" />
            <Skeleton w="100%" h="200px" />
            <Skeleton w="100%" h="200px" />
            <Skeleton w="100%" h="200px" />
          </>
        ) : courses.length === 0 ? (
          <VStack spacing={3} color="gray.400" py={16} gridColumn="span 3">
            <GraduationCap size={56} weight="duotone" />
            <Text fontWeight="medium" fontSize="lg">Nenhuma turma cadastrada</Text>
            <Text fontSize="sm">Clique em "Adicionar turma" para criar a primeira.</Text>
          </VStack>
        ) : (
          courses.map((course) => (
            <Box
              key={course.id}
              borderRadius="xl"
              overflow="hidden"
              boxShadow="card"
              as={Link}
              to={course.id}
              cursor="pointer"
              transition="all 0.25s ease"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'cardHover', textDecoration: 'none' }}
              display="block"
              position="relative"
            >
              <Box bgColor={course.informations.color} px={5} py={5}>
                <Flex justify="space-between" align="start" gap={2}>
                  <Text color="white" fontWeight="bold" fontSize={18} lineHeight={1.3}>
                    {course.title}
                  </Text>
                  <ArrowCircleUpRight
                    size={20}
                    color="rgba(255,255,255,0.6)"
                    weight="bold"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                </Flex>
              </Box>
              <Box bg="white" px={5} py={4}>
                <VStack align="start" spacing={1} mb={3}>
                  <Flex align="center" gap={1.5}>
                    <CalendarBlank size={12} color="#A0AEC0" weight="bold" />
                    <Text fontSize="xs" color="gray.500">{course.informations.dateSchedule}</Text>
                  </Flex>
                  <Flex align="center" gap={1.5}>
                    <Clock size={12} color="#A0AEC0" weight="bold" />
                    <Text fontSize="xs" color="gray.500">{course.informations.hourSchedule}</Text>
                  </Flex>
                </VStack>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold" color="gray.700" fontSize="sm">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.subscriptions.price / 100)}
                  </Text>
                  <Tag
                    colorScheme={
                      course.subscriptions.status === 'Aberto' ? 'green'
                      : course.subscriptions.status === 'Fechado' ? 'red'
                      : 'orange'
                    }
                    size="sm"
                    borderRadius="full"
                    fontSize="10px"
                    fontWeight="semibold"
                  >
                    {course.subscriptions.status}
                  </Tag>
                </Flex>
              </Box>
              {course.status === 'inactive' && (
                <Badge position="absolute" top={3} right={3} colorScheme="blackAlpha" fontSize="10px">
                  Inativo
                </Badge>
              )}
            </Box>
          ))
        )}
      </Grid>
    </PageLayout>
  )
}
