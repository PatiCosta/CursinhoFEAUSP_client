import {
  Course,
  CourseDocument,
  CourseStage,
} from '../../../interfaces/Course.interface'

export enum ActionTypes {
  ADD_NEW_COURSE = 'ADD_NEW_COURSE',
  GET_COURSES_FROM_API = 'GET_COURSES_FROM_API',
  CHANGE_COURSES_PAGE = 'CHANGE_COURSES_PAGE',
  UPDATE_COURSE_INFO = 'UPDATE_COURSE_INFO',
  ADD_SELECTIVE_STAGE = 'ADD_SELECTIVE_STAGE',
  REMOVE_SELECTIVE_STAGE = 'REMOVE_SELECTIVE_STAGE',
  ADD_DOCUMENT = 'ADD_DOCUMENT',
  REMOVE_DOCUMENT = 'REMOVE_DOCUMENT',
}

export function changeCoursesPage(page: number) {
  return {
    type: ActionTypes.CHANGE_COURSES_PAGE,
    payload: {
      page,
    },
  }
}

export function addNewCourse(course: Course) {
  return {
    type: ActionTypes.ADD_NEW_COURSE,
    payload: {
      course,
    },
  }
}

export function getCoursesFromApi({
  courses,
  totalCourses,
}: {
  courses: Course[]
  totalCourses: number
}) {
  return {
    type: ActionTypes.GET_COURSES_FROM_API,
    payload: {
      courses,
      totalCourses,
    },
  }
}

export function updateCoursesInfo({
  id,
  updatedCourse,
}: {
  id: string | undefined
  updatedCourse: Course
}) {
  return {
    type: ActionTypes.UPDATE_COURSE_INFO,
    payload: {
      id,
      updatedCourse,
    },
  }
}

export function addCourseSelectiveStage({
  id,
  stages,
}: {
  id: string | undefined
  stages: CourseStage[]
}) {
  return {
    type: ActionTypes.ADD_SELECTIVE_STAGE,
    payload: {
      id,
      stages,
    },
  }
}

export function removeCourseSelectiveStage({
  id,
  stageId,
}: {
  id: string | undefined
  stageId: string | undefined
}) {
  return {
    type: ActionTypes.REMOVE_SELECTIVE_STAGE,
    payload: {
      id,
      stageId,
    },
  }
}

export function addCourseDocument({
  id,
  documents,
}: {
  id: string | undefined
  documents: CourseDocument[]
}) {
  return {
    type: ActionTypes.ADD_DOCUMENT,
    payload: {
      id,
      documents,
    },
  }
}

export function removeCourseDocument({
  id,
  documentId,
}: {
  id: string | undefined
  documentId: string | undefined
}) {
  return {
    type: ActionTypes.REMOVE_DOCUMENT,
    payload: {
      id,
      documentId,
    },
  }
}
