import { ActionTypes } from './actions'
import { User } from '../../../interfaces/User.interface'

interface UserState {
  users: User[]
  page: number
  totalUsers: number
  registersPerPage: number
}

export function usersReducer(state: UserState, action: any): UserState {
  switch (action.type) {
    case ActionTypes.ADD_NEW_USER: {
      if (state.totalUsers + 1 < state.registersPerPage) {
        return {
          ...state,
          users: [...state.users, action.payload.user],
          totalUsers: state.totalUsers + 1,
        }
      }

      return {
        ...state,
        users: [...state.users],
        totalUsers: state.totalUsers + 1,
      }
    }

    case ActionTypes.CHANGE_USERS_PAGE: {
      return {
        ...state,
        page: action.payload.page,
      }
    }

    case ActionTypes.GET_USERS_FROM_API: {
      return {
        ...state,
        users: action.payload.users,
        totalUsers: action.payload.totalUsers,
      }
    }

    case ActionTypes.UPDATE_USER: {
      const newPaginatedUsersArray = state.users.map((user) =>
        user.id === action.payload.userId ? action.payload.updatedData : user,
      )

      return {
        ...state,
        users: newPaginatedUsersArray,
      }
    }

    case ActionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      }

    default:
      return state
  }
}
