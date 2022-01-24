import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAceemzus4RBCsLdGSt7wRKPzwHm4uguhk",
  authDomain: "react-store-auth-floyn.firebaseapp.com",
  projectId: "react-store-auth-floyn",
  storageBucket: "react-store-auth-floyn.appspot.com",
  messagingSenderId: "460641978181",
  appId: "1:460641978181:web:85da15740ebe57c544602c"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)