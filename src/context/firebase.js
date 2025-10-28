// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfpJPvILsMkT-OJ5pDavQc7h6IWI70I-E",
  authDomain: "lms-college-44124.firebaseapp.com",
  projectId: "lms-college-44124",
  storageBucket: "lms-college-44124.firebasestorage.app",
  messagingSenderId: "111715276293",
  appId: "1:111715276293:web:411ad40fd9bbd282c82e6c",
  measurementId: "G-HEYK478F25",
  databaseURL:'https://lms-college-44124-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);
export default firebaseapp;
