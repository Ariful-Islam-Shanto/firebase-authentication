// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYtsujgrA0ml0WHULK66aR_Knz10DtGsg",
  authDomain: "email-authentication-d3ef9.firebaseapp.com",
  projectId: "email-authentication-d3ef9",
  storageBucket: "email-authentication-d3ef9.appspot.com",
  messagingSenderId: "445964193623",
  appId: "1:445964193623:web:277be1d16afcfa436b3812"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;