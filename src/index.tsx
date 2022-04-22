import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// firebase
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, ref, connectStorageEmulator } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCFj3LT5eKykepGw2udtDmYsmb5sBXlH9Y",
  authDomain: "astronomy-quiz-react.firebaseapp.com",
  projectId: "astronomy-quiz-react",
  storageBucket: "astronomy-quiz-react.appspot.com",
  messagingSenderId: "971999846040",
  appId: "1:971999846040:web:31768aa241959e66453aed"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();

// Create a root reference
export const storage = getStorage(app);

if (process.env.NODE_ENV === "development") {
  try {
    connectFirestoreEmulator(db, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
    connectStorageEmulator(storage, "localhost", 9199);
    console.log("connectAuthEmulator");
  } catch (error) {
    console.error(error);
    console.log((error as any).message);
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
