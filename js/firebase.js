// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 PASTE YOUR FIREBASE CONFIG BELOW
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrlP360Fpx-9tCyggJeoqLgkwnTlRTJ5o",
  authDomain: "ncc-project-3b0f1.firebaseapp.com",
  projectId: "ncc-project-3b0f1",
  storageBucket: "ncc-project-3b0f1.firebasestorage.app",
  messagingSenderId: "590441541895",
  appId: "1:590441541895:web:2a861830fcb60f09f655a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
