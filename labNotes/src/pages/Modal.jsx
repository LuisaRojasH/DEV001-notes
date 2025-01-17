/* eslint-disable react/prop-types */
import React from "react";
import '../style/modal.css'
import { IoClose } from "react-icons/io5"
import { useState } from 'react'
import { saveNote } from '../firebase/firestore'

export default function Modal({ isOpen, onClose, update }) {

  const ts = new Date();
  const currentDate = ts.toLocaleString();

  const initialState = {
    title: '',
    note: '',
    date: '',
  }
  const [values, setValues] = useState(initialState)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, date: currentDate })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    saveNote(values);
    update();
    onClose();
    setValues(initialState);
  }

  return (
    <div className="modalContainer" style={{ display: isOpen ? 'grid' : 'none' }}>
      <div className="modalBody">
        <button onClick={onClose} className="btnClose"><IoClose /></button>
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
            <button className="btnSave" type="submit">save</button>
          </div>
        </form>
      </div>
    </div>
  )
}