import { Student } from '../../../interfaces/Student.interface'

export enum ActionTypes {
  GET_STUDENTS_FROM_API = 'GET_STUDENTS_FROM_API',
  CHANGE_STUDENTS_PAGE = 'CHANGE_STUDENTS_PAGE',
}

export function changeStudentsPage(page: number) {
  return {
    type: ActionTypes.CHANGE_STUDENTS_PAGE,
    payload: {
      page,
    },
  }
}

export function getStudentsFromApi({
  students,
  totalStudents,
}: {
  students: Student[]
  totalStudents: number
}) {
  return {
    type: ActionTypes.GET_STUDENTS_FROM_API,
    payload: {
      students,
      totalStudents,
    },
  }
}
