import { ArrowCircleUpRight } from '@phosphor-icons/react'
import { PageLayout } from '../../layouts/PageLayout'
import { Badge, Flex, Grid, Skeleton, Text } from '@chakra-ui/react'
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
        ) : (
          courses.map((course) => (
            <Grid
              templateColumns={'1fr 6rem'}
              borderRadius="lg"
              gap={4}
              key={course.id}
              bgColor={course.informations.color}
              cursor="pointer"
              alignItems="center"
              as={Link}
              to={course.id}
              position="relative"
            >
              <Text color="gray.50" py={8} px={4} fontSize={20}>
                {course.title}
              </Text>
              <Flex
                w="100%"
                h="100%"
                py={8}
                px={4}
                alignItems="center"
                justifyContent="center"
                borderRadius="lg"
                bgColor={course.informations.color}
                filter="brightness(1.1)"
              >
                <ArrowCircleUpRight
                  size={28}
                  color="#f7fafc"
                  weight="duotone"
                  style={{ flexShrink: '0' }}
                />
              </Flex>
              {course.status === 'inactive' && (
                <Badge position="absolute" top={2} left={4} colorScheme="red">
                  Inativo
                </Badge>
              )}
            </Grid>
          ))
        )}
      </Grid>
    </PageLayout>
  )
}
