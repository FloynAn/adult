// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";


// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAceemzus4RBCsLdGSt7wRKPzwHm4uguhk",
//   authDomain: "react-store-auth-floyn.firebaseapp.com",
//   projectId: "react-store-auth-floyn",
//   storageBucket: "react-store-auth-floyn.appspot.com",
//   messagingSenderId: "460641978181",
//   appId: "1:460641978181:web:85da15740ebe57c544602c"
// };


// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXVrF8Q17hTAC6z5PUhabpLBpNlF9LjdY",
  authDomain: "hahaton-6c1b3.firebaseapp.com",
  projectId: "hahaton-6c1b3",
  storageBucket: "hahaton-6c1b3.appspot.com",
  messagingSenderId: "771206318237",
  appId: "1:771206318237:web:39da1b10e6217cf11a2c74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)