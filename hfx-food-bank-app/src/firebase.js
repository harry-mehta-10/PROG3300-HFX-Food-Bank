// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUEIumXfen-RsfVxFXuKE7jRspXHMpyOc",
  authDomain: "hfx-food-back-app.firebaseapp.com",
  projectId: "hfx-food-back-app",
  storageBucket: "hfx-food-back-app.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "836132203267",
  appId: "1:836132203267:web:4a006a76126d2f63d31736",
  measurementId: "G-1J7G7LVK35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Check if Firebase is initialized correctly
console.log("Firebase initialized with project:", app.options.projectId);