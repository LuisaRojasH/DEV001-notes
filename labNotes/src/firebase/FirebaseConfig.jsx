// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLc1EoXqtHUfei7l5QQN5Q-Hwkm8WtnSk",
  authDomain: "labnotes-a05ab.firebaseapp.com",
  projectId: "labnotes-a05ab",
  storageBucket: "labnotes-a05ab.appspot.com",
  messagingSenderId: "1075188334175",
  appId: "1:1075188334175:web:782255857f89d2339f25ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);