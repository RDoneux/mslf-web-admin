// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAwZsRj_zTLRMXX1s4dRmHKrcUySa886GU',
  authDomain: 'myself-873de.firebaseapp.com',
  projectId: 'myself-873de',
  storageBucket: 'myself-873de.appspot.com',
  messagingSenderId: '48350286021',
  appId: '1:48350286021:web:c5a54fcc5f796eb577e0ac'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
