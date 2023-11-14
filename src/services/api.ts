import axios, { AxiosError } from 'axios'

import { signOut } from '../hooks/auth'

let isRefreshing = false
let failedRequestsQueue: any[] = []

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('@cursinhoApp:token')}`,
    // 'Access-Control-Allow-Origin': '*',
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: any) => {
    if (error.response?.status === 401) {
      const location = window.location.href.replace(
        import.meta.env.VITE_APP_URL,
        '',
      )
      if (
        error.response.data?.errorMessage === 'Token is invalid' &&
        location !== ''
      ) {
        const refreshId = localStorage.getItem('@cursinhoApp:refreshToken')

        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('/refresh-token/', {
              id: refreshId,
            })
            .then((response) => {
              const { token, refreshToken } = response.data

              localStorage.setItem('@cursinhoApp:token', token)
              localStorage.setItem('@cursinhoApp:refreshToken', refreshToken)

              api.defaults.headers.Authorization = `Bearer ${token}`

              failedRequestsQueue.forEach((request) => request.onSuccess(token))
              failedRequestsQueue = []
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else if (
        error.response.data?.errorMessage === 'Refresh Token inválido'
      ) {
        signOut()
      } else {
        console.log(error)
      }
    }
    return Promise.reject(error)
  },
)

export default api
