import '../style/home.css'
import React from "react";
import { useState, useEffect } from 'react'
import { useAuth } from '../firebase/authContext'
import { SlNote, SlLogout } from "react-icons/sl";
import { FiEdit2, FiTrash2,} from "react-icons/fi";
import Modal from "./Modal";
import ModalEdit from './ModalEdit';
import { getAllNotes, deleteNote, } from "../firebase/firestore";

export default function Home() {

  const [notes, setNotes] = useState([])
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [currentId, setCurrentId] = useState('');
  const { user, logOut } = useAuth()

  const updateStateNotes = () => {
    getAllNotes().then((notes) => {
      setNotes(notes);
    });
  }

  useEffect(() => {
    updateStateNotes();
  }, []);

  const deleteN = async (id) => {
    if (window.confirm('are you sure you want to delete this link?')) {
      await deleteNote(id);
      updateStateNotes()
    }
  }

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
       
        <h1 className="userName">{user.displayName || user.email}</h1>
        <h1 className="titleHome"><SlNote /> Notes</h1>
        <button className="btnLogOut" onClick={handleLogOut}><SlLogout /></button>

      </div>
      <button className="btnAddNote" onClick={() => setShow(true)}>+</button>
      <Modal
        update={updateStateNotes}
        isOpen={show}
        onClose={() => setShow(false)}
      />
      <ModalEdit
        currentId={currentId}
        setCurrentId={setCurrentId}
        update={updateStateNotes}
        isOpenEdit={showEdit}
        onCloseEdit={() => setShowEdit(false)}>
      </ModalEdit>
      <div>
        <div className="cardContainer">
          {notes.map(note => (
            <div className="cardNote" key={note.id}>
              <p className="date">{note.date}</p>
              <h3>{note.title}</h3>
              <p>{note.note}</p>
              <button
                className='btnEdit'
                onClick={() => {
                  setCurrentId(note.id)
                  setShowEdit(true);
                }}><FiEdit2 /></button>
              <button
                className='btnDelete'
                onClick={(e) => {
                  e.stopPropagation()
                  deleteN(note.id);
                }}><FiTrash2 /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}