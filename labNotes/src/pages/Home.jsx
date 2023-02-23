import React from "react";
import { useAuth } from '../context/authContext'

export default function Home() {
  const { user, logOut } = useAuth()
  
  const handleLogOut = async () => {
    try{
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Welcome {user.displayName || user.email}</h1>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}