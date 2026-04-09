// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `AIzaSyCriB9wx3KpI-4TRcjK_MkiOkPNz-VSnVk`,
  authDomain: "quiz-db700.firebaseapp.com",
  projectId: "quiz-db700",
  storageBucket: "quiz-db700.firebasestorage.app",
  messagingSenderId: "945741325770",
  appId: "1:945741325770:web:114a794194d83c4aaddb33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
