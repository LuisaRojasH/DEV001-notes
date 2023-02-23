import React from "react";
import { useAuth } from '../context/authContext'

export default function Board() {
  const { user, logOut, loading } = useAuth()
  

  const handleLogOut = async () => {
    await logOut();
  }
if(loading){
  return <h1>Loading...</h1>
}
  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}