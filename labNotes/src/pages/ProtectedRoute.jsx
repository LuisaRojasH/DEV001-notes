/* eslint-disable react/prop-types */
import React from 'react'
import { useAuth } from '../firebase/authContext'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({children}){
  const {user, loading} = useAuth()

  if(loading) return <h1>Loading...</h1>

  if(!user) return <Navigate to='/login'/>

  return<>{children}</>
}