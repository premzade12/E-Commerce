// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "logine-commerce-34785.firebaseapp.com",
  projectId: "logine-commerce-34785",
  storageBucket: "logine-commerce-34785.firebasestorage.app",
  messagingSenderId: "384455281573",
  appId: "1:384455281573:web:9c9aee9298ca02092f364c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = GoogleAuthProvider();

export {auth, provider}
