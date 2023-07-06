import React from 'react'
import { Navigate } from 'react-router-dom'

interface IProtectedRouteProps {
    isAuthenticated: boolean;
    children: React.ReactComponentElement<any>
}
function ProtectedRoute({ isAuthenticated, children }: IProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }
  return children
}
export default ProtectedRoute