import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

import { useAuth } from '../hooks/auth'

interface PublicRouteProps {
  children: ReactNode
  isPrivate: boolean
}

export function Route({ children, isPrivate }: PublicRouteProps) {
  const { user } = useAuth()

  return isPrivate !== !!user ? (
    <Navigate
      to={{
        pathname: isPrivate ? '/' : '/inscricoes',
      }}
    />
  ) : (
    <>{children}</>
  )
}
