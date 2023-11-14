import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react'
import { useToast } from '@chakra-ui/react'

import api from '../services/api'
import { coursesReducer } from './reducers/courses/reducer'
import {
  addCourseDocument,
  addCourseSelectiveStage,
  addNewCourse,
  changeCoursesPage,
  getCoursesFromApi,
  removeCourseDocument,
  removeCourseSelectiveStage,
  // updateCourseStatus,
  updateCoursesInfo,
} from './reducers/courses/actions'
import {
  Course,
  CourseDocument,
  CourseInfo,
  CourseStage,
} from '../interfaces/Course.interface'

interface CourseContextType {
  courses: Course[]
  list: () => void
  create: (data: Course) => void
  update: ({ data, id }: { data: CourseInfo; id: string | undefined }) => void
  page: number
  changePage: (page: number) => void
  registersPerPage: number
  totalCourses: number
  loadingList: boolean
  addDocument: ({
    data,
    id,
  }: {
    data: CourseDocument
    id: string | undefined
  }) => void
  addSelectiveStage: ({
    data,
    id,
  }: {
    data: CourseStage
    id: string | undefined
  }) => void
  removeDocument: ({
    documentId,
    id,
  }: {
    documentId: string | undefined
    id: string | undefined
  }) => void
  removeSelectiveStage: ({
    stageId,
    id,
  }: {
    stageId: string | undefined
    id: string | undefined
  }) => void
}

const CoursesContext = createContext({} as CourseContextType)

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [loadingList, setIsLoadingList] = useState(false)
  const toast = useToast()

  const [coursesState, dispatch] = useReducer(coursesReducer, {
    courses: [],
    page: 1,
    totalCourses: 0,
    registersPerPage: 12,
  })

  const { courses, page, totalCourses, registersPerPage } = coursesState

  const changePage = useCallback((page: number) => {
    dispatch(changeCoursesPage(page))
  }, [])

  const list = useCallback(async () => {
    setIsLoadingList(true)

    const params = {
      page,
      pageRange: registersPerPage,
    }

    await api
      .get('/schoolClass', { params })
      .then((response) => {
        console.log(response)
        dispatch(
          getCoursesFromApi({
            courses: response.data.schoolClassResponse.schoolClassList,
            totalCourses: response.data.schoolClassResponse.totalDocuments,
          }),
        )
      })
      .then(() => {
        setIsLoadingList(false)
      })
  }, [page, registersPerPage])

  const create = useCallback(
    async (data: Course) => {
      await api
        .post(`/schoolClass/create`, data)
        .then((response) => {
          dispatch(
            addNewCourse(response.data.createdSchoolClassResponse.schoolClass),
          )

          toast({
            status: 'success',
            title: 'O curso foi criado!',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao criar o curso',
              description: `${error.response.data.createdSchoolClassResponse.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [toast],
  )

  const update = useCallback(
    async ({ data, id }: { data: CourseInfo; id: string | undefined }) => {
      await api
        .put(`/schoolClass/${id}/update`, data)
        .then((response) => {
          dispatch(
            updateCoursesInfo({
              updatedCourse:
                response.data.updatedSchoolClassResponse.schoolClass,
              id,
            }),
          )

          toast({
            status: 'success',
            title: 'As informações do curso foram editadas!',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao editar as informações do curso',
              description: `${error.response.data.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [toast],
  )

  const addDocument = useCallback(
    async ({ data, id }: { data: CourseDocument; id: string | undefined }) => {
      await api
        .post(`/schoolClass/${id}/docs/create`, [data])
        .then((response) => {
          dispatch(
            addCourseDocument({ id, documents: response.data.schoolClassDocs }),
          )

          toast({
            status: 'success',
            title: 'O documento foi adicionado',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao adicionar o documento',
              description: `${error.response.data.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [toast],
  )

  const addSelectiveStage = useCallback(
    async ({ data, id }: { data: CourseStage; id: string | undefined }) => {
      await api
        .post(`/schoolClass/${id}/stages/create`, [data])
        .then((response) => {
          dispatch(
            addCourseSelectiveStage({
              id,
              stages: response.data.schoolClassStages,
            }),
          )

          toast({
            status: 'success',
            title: 'A etapa foi adicionada',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao adicionar a etapa',
              description: `${error.response.data.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [toast],
  )

  const removeDocument = useCallback(
    async ({
      documentId,
      id,
    }: {
      documentId: string | undefined
      id: string | undefined
    }) => {
      await api
        .delete(`/schoolClass/${id}/docs/${documentId}/delete`)
        .then(() => {
          dispatch(removeCourseDocument({ id, documentId }))

          toast({
            status: 'success',
            title: 'O documento foi removido',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao remover o documento',
              description: `${error.response.data.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [toast],
  )

  const removeSelectiveStage = useCallback(
    async ({
      stageId,
      id,
    }: {
      stageId: string | undefined
      id: string | undefined
    }) => {
      await api
        .delete(`/schoolClass/${id}/stages/${stageId}/delete`)
        .then(() => {
          dispatch(removeCourseSelectiveStage({ id, stageId }))

          toast({
            status: 'success',
            title: 'A etapa foi removida',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          if (error.response) {
            toast({
              status: 'error',
              title: 'Erro ao remover a etapa',
              description: `${error.response.data.errorMessage}`,
              duration: 3000,
              isClosable: true,
            })
          }
        })
    },
    [toast],
  )

  return (
    <CoursesContext.Provider
      value={{
        courses,
        list,
        create,
        update,
        page,
        changePage,
        registersPerPage,
        totalCourses,
        loadingList,
        addDocument,
        addSelectiveStage,
        removeDocument,
        removeSelectiveStage,
      }}
    >
      {children}
    </CoursesContext.Provider>
  )
}

export function useCourses() {
  const context = useContext(CoursesContext)

  if (!context) {
    throw new Error('useCourses must be used within an CoursesProvider')
  }

  return context
}
