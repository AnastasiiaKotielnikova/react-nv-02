import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcv86RMKNbRg5y33jDBUOAiNQjMzlcYCk",
  authDomain: "rn-goit-project.firebaseapp.com",
  projectId: "rn-goit-project",
  storageBucket: "rn-goit-project.appspot.com",
  messagingSenderId: "746236572",
  appId: "1:746236572:web:63d581c5c92a2869ef1b59",
  measurementId: "G-C2GW5JTKEB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

export const storage = getStorage();

export const db = getFirestore(app);
