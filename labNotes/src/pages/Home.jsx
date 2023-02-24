import React from "react";
import { useAuth } from '../context/authContext'
import { SlNote, SlLogout } from "react-icons/sl";

export default function Home() {
  const { user, logOut } = useAuth()

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="divTitleHome">
        <div className="user_logOut">
        <h1 className="userName">{user.displayName || user.email}</h1>
        <button className="btnLogOut" onClick={handleLogOut}><SlLogout /></button>
        </div>
        <h1 className="titleHome"><SlNote /> Notes</h1>
      </div>
    </div>
  )
}