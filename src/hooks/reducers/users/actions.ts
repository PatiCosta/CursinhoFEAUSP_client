import { User } from '../../../interfaces/User.interface'

export enum ActionTypes {
  ADD_NEW_USER = 'ADD_NEW_USER',
  GET_USERS_FROM_API = 'GET_USERS_FROM_API',
  UPDATE_USER = 'UPDATE_USER',
  CHANGE_USERS_PAGE = 'CHANGE_USERS_PAGE',
  DELETE_USER = 'DELETE_USER',
}

export function changeUsersPage(page: number) {
  return {
    type: ActionTypes.CHANGE_USERS_PAGE,
    payload: {
      page,
    },
  }
}

export function addNewUser(user: User) {
  return {
    type: ActionTypes.ADD_NEW_USER,
    payload: {
      user,
    },
  }
}

export function getUsersFromApi({
  users,
  totalUsers,
}: {
  users: User[]
  totalUsers: number
}) {
  return {
    type: ActionTypes.GET_USERS_FROM_API,
    payload: {
      users,
      totalUsers,
    },
  }
}

export function updateUser(updatedUser: User) {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: {
      updatedUser,
    },
  }
}

export function deleteUser(id: string | undefined) {
  return {
    type: ActionTypes.DELETE_USER,
    payload: {
      id,
    },
  }
}
