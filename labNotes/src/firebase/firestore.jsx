import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./FirebaseConfig";

const collectionName = 'Notes'

export const getAllNotes = async () => {
  const notes = [];
  const snapshot = await getDocs(collection(db, collectionName));
  snapshot.forEach(doc => {
    notes.push({ ...doc.data(), id: doc.id });
  })
  return notes
}

export const saveNote = (infoNote) => {
  addDoc(collection(db, collectionName), infoNote);
}

export const deleteNote = (id) => deleteDoc(doc(db, collectionName, id))

export const getNote = (id) => getDoc(doc(db, collectionName, id));

export const updateNote = (id, updateFields) => updateDoc(doc(db, collectionName, id), updateFields)
