// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZ7JMgb7vCj9PVXefp8ZRY9kEyBxHqN_E",
    authDomain: "facebook-reprised.firebaseapp.com",
    projectId: "facebook-reprised",
    storageBucket: "facebook-reprised.appspot.com",
    messagingSenderId: "862595263424",
    appId: "1:862595263424:web:0c65dab7b25be789273625"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const provider = new FacebookAuthProvider();

export { db, provider };