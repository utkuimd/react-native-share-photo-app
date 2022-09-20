// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPv7d4ArN0xwH41kzlF0do9yB9TOIhIjA",
  authDomain: "share-photo-app-6a2df.firebaseapp.com",
  projectId: "share-photo-app-6a2df",
  storageBucket: "share-photo-app-6a2df.appspot.com",
  messagingSenderId: "137616043605",
  appId: "1:137616043605:web:57056a33053acc92e7aedc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);