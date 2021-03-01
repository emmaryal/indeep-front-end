// import * as firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBIbwwrFQIL6aBUG_5dkP65UtnG-_E0jyM",
    authDomain: "indeep-3ec84.firebaseapp.com",
    databaseURL:"https://indeep-3ec84-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "indeep-3ec84",
    storageBucket: "indeep-3ec84.appspot.com",
    messagingSenderId: "77708790062",
    appId: "1:77708790062:web:131c03f849690e3a6352bf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

