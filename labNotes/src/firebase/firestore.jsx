import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./FirebaseConfig";

const collectionName = 'Notes'

 export const saveNote = (newNote) => 
 addDoc(collection(db, collectionName), newNote);

 export const getNotes = () => getDocs(collection(db,collectionName))