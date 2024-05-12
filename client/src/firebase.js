// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "bloggie-react.firebaseapp.com",
  projectId: "bloggie-react",
  storageBucket: "bloggie-react.appspot.com",
  messagingSenderId: "622315272356",
  appId: "1:622315272356:web:f18eb7d4c9aa3d8f8e0e31",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
