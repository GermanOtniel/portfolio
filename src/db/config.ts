 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";

 const firebaseConfig = {
  apiKey: "AIzaSyBT4kknKIbBw8Sjka6O_wszoI9yb8dqK5g",
  authDomain: "otni-el.firebaseapp.com",
  databaseURL: "https://otni-el-default-rtdb.firebaseio.com",
  projectId: "otni-el",
  storageBucket: "otni-el.appspot.com",
  messagingSenderId: "283821289395",
  appId: "1:283821289395:web:035a26205481c87fe525c6",
  measurementId: "G-NH2TTHHMVW"
 };
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);
 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);