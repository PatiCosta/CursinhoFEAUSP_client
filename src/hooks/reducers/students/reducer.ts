import { ActionTypes } from './actions'
import { Student } from '../../../interfaces/Student.interface'

interface StudentState {
  students: Student[]
  page: number
  totalStudents: number
  registersPerPage: number
}

export function studentsReducer(
  state: StudentState,
  action: any,
): StudentState {
  switch (action.type) {
    case ActionTypes.CHANGE_STUDENTS_PAGE: {
      return {
        ...state,
        page: action.payload.page,
      }
    }

    case ActionTypes.GET_STUDENTS_FROM_API: {
      return {
        ...state,
        students: action.payload.students,
        totalStudents: action.payload.totalStudents,
      }
    }

    default:
      return state
  }
}
