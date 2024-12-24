import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQtHuzr9HvA0fiI4AA3PlmpynvITmFBo0",
    authDomain: "mekandadb.firebaseapp.com",
    projectId: "mekandadb",
    storageBucket: "mekandadb.firebasestorage.app",
    messagingSenderId: "1040526264983",
    appId: "1:1040526264983:web:64be3bac482be5846b37d2",
    measurementId: "G-3TFJKP9T7N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);




