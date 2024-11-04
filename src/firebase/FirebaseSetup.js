import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAMqjGSYm82Mre18DoKbjQVMCh3igg8pJs",
  authDomain: "cold-caller-4dc57.firebaseapp.com",
  projectId: "cold-caller-4dc57",
  storageBucket: "cold-caller-4dc57.firebasestorage.app",
  messagingSenderId: "404486600101",
  appId: "1:404486600101:web:8ba2957074bf5eadfe244c"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const contactsCollection = collection(db, 'contacts');