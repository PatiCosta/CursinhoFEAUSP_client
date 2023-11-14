import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react'
// import { useToast } from '@chakra-ui/react'

import api from '../services/api'
import { studentsReducer } from './reducers/students/reducer'
import {
  changeStudentsPage,
  getStudentsFromApi,
} from './reducers/students/actions'
import { Student } from '../interfaces/Student.interface'
import { useBreakpointValue } from '@chakra-ui/react'

interface listProps {
  name?: string
  email?: string
  cpf?: string
  schoolClassID?: string
}

interface StudentsContextType {
  students: Student[]
  list: (props?: listProps) => void
  excelExport: (props?: listProps) => void
  page: number
  changePage: (page: number) => void
  registersPerPage: number
  totalStudents: number
  loadingList: boolean
}

const StudentsContext = createContext({} as StudentsContextType)

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [loadingList, setIsLoadingList] = useState(false)
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })
  // const toast = useToast()

  const [studentsState, dispatch] = useReducer(studentsReducer, {
    students: [],
    page: 1,
    totalStudents: 0,
    registersPerPage: isLg ? 12 : 9,
  })

  const { students, page, totalStudents, registersPerPage } = studentsState

  const changePage = useCallback((page: number) => {
    dispatch(changeStudentsPage(page))
  }, [])

  const list = useCallback(
    async (props?: listProps) => {
      setIsLoadingList(true)

      let params = {
        page,
        pageRange: registersPerPage,
      }

      if (props?.name) {
        params = Object.assign(params, { name: props.name })
      }

      if (props?.email) {
        params = Object.assign(params, { email: props.email })
      }

      if (props?.cpf) {
        params = Object.assign(params, { cpf: props.cpf })
      }

      if (props?.schoolClassID) {
        params = Object.assign(params, { schoolClassID: props.schoolClassID })
      }

      await api
        .get('/students', { params })
        .then((response) => {
          dispatch(
            getStudentsFromApi({
              students: response.data.studentsList,
              totalStudents: response.data.totalDocuments,
            }),
          )
        })
        .then(() => {
          setIsLoadingList(false)
        })
    },
    [page, registersPerPage],
  )

  const excelExport = useCallback(async (props?: listProps) => {
    let params = {}

    if (props?.name) {
      params = Object.assign(params, { name: props.name })
    }

    if (props?.email) {
      params = Object.assign(params, { email: props.email })
    }

    if (props?.cpf) {
      params = Object.assign(params, { cpf: props.cpf })
    }

    if (props?.schoolClassID) {
      params = Object.assign(params, { schoolClassID: props.schoolClassID })
    }

    await api
      .get('/students/excel', { params, responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${Date.now()}.xlsx`)
        document.body.appendChild(link)
        link.click()
      })
  }, [])

  return (
    <StudentsContext.Provider
      value={{
        students,
        list,
        excelExport,
        page,
        changePage,
        registersPerPage,
        totalStudents,
        loadingList,
      }}
    >
      {children}
    </StudentsContext.Provider>
  )
}

export function useStudents() {
  const context = useContext(StudentsContext)

  if (!context) {
    throw new Error('useStudents must be used within an StudentsContext')
  }

  return context
}
