import { ActionTypes } from './actions'
import {
  Course,
  CourseDocument,
  CourseStage,
} from '../../../interfaces/Course.interface'

interface CoursesState {
  courses: Course[]
  page: number
  totalCourses: number
  registersPerPage: number
}

export function coursesReducer(state: CoursesState, action: any): CoursesState {
  switch (action.type) {
    case ActionTypes.ADD_NEW_COURSE: {
      if (state.totalCourses + 1 < state.registersPerPage) {
        return {
          ...state,
          courses: [...state.courses, action.payload.course],
          totalCourses: state.totalCourses + 1,
        }
      }

      return {
        ...state,
        courses: [...state.courses],
        totalCourses: state.totalCourses + 1,
      }
    }

    case ActionTypes.CHANGE_COURSES_PAGE: {
      return {
        ...state,
        page: action.payload.page,
      }
    }

    case ActionTypes.GET_COURSES_FROM_API: {
      return {
        ...state,
        courses: action.payload.courses,
        totalCourses: action.payload.totalCourses,
      }
    }

    case ActionTypes.UPDATE_COURSE_INFO: {
      const newPaginatedCoursesArray = state.courses.map((course) =>
        course.id === action.payload.id ? action.payload.updatedCourse : course,
      )

      return {
        ...state,
        courses: newPaginatedCoursesArray,
      }
    }

    case ActionTypes.ADD_SELECTIVE_STAGE: {
      const stages: CourseStage[] = action.payload.stages

      const newPaginatedCoursesArray = state.courses.map((course) =>
        course.id === action.payload.id
          ? {
              ...course,
              selectiveStages: stages,
            }
          : course,
      )

      return {
        ...state,
        courses: newPaginatedCoursesArray,
      }
    }

    case ActionTypes.REMOVE_SELECTIVE_STAGE: {
      const newPaginatedCoursesArray = state.courses.map((course) =>
        course.id === action.payload.id
          ? {
              ...course,
              selectiveStages: course.selectiveStages
                ?.filter((stage) => stage.stagesID !== action.payload.stageId)
                .reverse(),
            }
          : course,
      )

      return {
        ...state,
        courses: newPaginatedCoursesArray,
      }
    }

    case ActionTypes.ADD_DOCUMENT: {
      const documents: CourseDocument[] = action.payload.documents

      const newPaginatedCoursesArray = state.courses.map((course) =>
        course.id === action.payload.id
          ? {
              ...course,
              documents,
            }
          : course,
      )

      return {
        ...state,
        courses: newPaginatedCoursesArray,
      }
    }

    case ActionTypes.REMOVE_DOCUMENT: {
      const newPaginatedCoursesArray = state.courses.map((course) =>
        course.id === action.payload.id
          ? {
              ...course,
              documents: course.documents?.filter(
                (document) => document.docsID !== action.payload.documentId,
              ),
            }
          : course,
      )

      return {
        ...state,
        courses: newPaginatedCoursesArray,
      }
    }

    default:
      return state
  }
}
