import React from "react";
import {useAuth} from '../context/authContext'

export default function Error404() {
  const authContext = useAuth()
  console.log(authContext)
    return (
        <div>Error 404</div>
    )
}