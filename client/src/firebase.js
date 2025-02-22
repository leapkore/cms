// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "cms-app-806b1.firebaseapp.com",
  projectId: "cms-app-806b1",
  storageBucket: "cms-app-806b1.firebasestorage.app",
  messagingSenderId: "74903354441",
  appId: "1:74903354441:web:c2824d49c3c4f812521398"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);