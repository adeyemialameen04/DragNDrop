import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const apiKey = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "dragnview-ddd00.firebaseapp.com",
  projectId: "dragnview-ddd00",
  storageBucket: "dragnview-ddd00.appspot.com",
  messagingSenderId: "942029920581",
  appId: "1:942029920581:web:73793be0ac4c6976db462c",
  measurementId: "G-WCJ8X1YQ5X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { app }