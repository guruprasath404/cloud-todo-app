import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBC3Vy0x7fEleVxDsvrJC6huxBII9OnWAs",
  authDomain: "indichat-df4d9.firebaseapp.com",
  projectId: "indichat-df4d9",
  storageBucket: "indichat-df4d9.firebasestorage.app",
  messagingSenderId: "476108909286",
  appId: "1:476108909286:web:f44f70af281fdad231a927"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
