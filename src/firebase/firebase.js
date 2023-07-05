import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUtI9ohrJAgcLPbYgwKGnjb13f5tOxWHc",
  authDomain: "aiclothing.firebaseapp.com",
  projectId: "aiclothing",
  storageBucket: "aiclothing.appspot.com",
  messagingSenderId: "97937860718",
  appId: "1:97937860718:web:5f5923a155273793ee5e7f",
  measurementId: "G-NG5Q4MJGP8",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
