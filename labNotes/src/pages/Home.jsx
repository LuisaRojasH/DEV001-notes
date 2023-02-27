import React from "react";
import { useState, useEffect } from 'react'
import { useAuth } from '../firebase/authContext'
import { SlNote, SlLogout } from "react-icons/sl";
import Modal from "./Modal";
import { getNotes } from '../firebase/firestore'

export default function Home() {

  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    const querySnapshot = await getNotes();
    const docs = [];
    querySnapshot.forEach((doc) => {
      doc.push({ ...doc.data(), id: doc.id })
    });
    setNotes(docs);
  }

  useEffect(() => {
    getAllNotes
  }, []);

  const { user, logOut } = useAuth()

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const [show, setShow] = useState(false)

  return (
    <div>
      <div className="divTitleHome">
        <div className="user_logOut">
          <h1 className="userName">{user.displayName || user.email}</h1>
          <button className="btnLogOut" onClick={handleLogOut}><SlLogout /></button>
        </div>
        <h1 className="titleHome"><SlNote /> Notes</h1>
      </div>
      <button onClick={() => setShow(true)}>Add Note</button>
      <Modal isOpen={show} onClose={() => setShow(false)} />
      <div>
        <h1>notas</h1>
      <>
        {notes.map((note) => (
          <div key={note.id}>
            
          </div>
        ))}
      </>
      </div>
      
    </div>
  )
}