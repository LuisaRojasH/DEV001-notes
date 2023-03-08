/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import '../style/modal.css'
import { IoClose } from "react-icons/io5"
import { useState } from 'react'
import { getNote, updateNote } from '../firebase/firestore'

export default function ModalEdit({
  isOpenEdit,
  onCloseEdit,
  update,
  currentId,
  setCurrentId,
}) {

  const ts = new Date();
  const currentDate = ts.toLocaleString();
  
  const initialState = {
    title: '',
    note: '',
    date: '',
  }

  const [values, setValues] = useState({ initialState })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, date: currentDate })
  }

  const getOneNote = async (id) => {
    try {
      const docSnap = await getNote(id);
      setValues({...docSnap.data()})
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if(currentId === ''){
      setValues({...initialState})
    } else {
      getOneNote(currentId)
    }
  }, [currentId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote(currentId, values);
    setCurrentId('');
    update();
    onCloseEdit();
  }

  return (
    <div className="modalContainer" style={{ display: isOpenEdit ? 'grid' : 'none' }}>
      <div className="modalBody">
        <button onClick={onCloseEdit} className="btnClose"><IoClose /></button>
        <form className="formNotes" onSubmit={handleSubmit}>
          <div className="TitleNote">
            <label className="labelsNote">Title</label>
            <input
              name='title'
              className="inputTitleNote"
              placeholder='My Note Title'
              value={values.title}
              onChange={handleInputChange} />
          </div>
          <div className="ContentNote">
            <label className="labelsNote">Note</label>
            <textarea
              name="note"
              id="notes"
              cols="30"
              rows="8"
              className="inputContentNote"
              placeholder='My Note...'
              value={values.note}
              onChange={handleInputChange}>
            </textarea>
          </div>
          <div className="buttonsContainer">
            <button className="btnEditNote" type="submit">Edit</button>
          </div>
        </form>
      </div>
    </div>
  )
}