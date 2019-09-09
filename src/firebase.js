import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chat-app-f5f0a.firebaseapp.com",
  databaseURL: "https://chat-app-f5f0a.firebaseio.com",
  projectId: "chat-app-f5f0a",
  storageBucket: "chat-app-f5f0a.appspot.com",
  messagingSenderId: "591227007438",
  appId: "1:591227007438:web:215045b9f44a4a854dfb9f"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export { db, firebase };
