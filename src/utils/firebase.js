// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCQBbv-LFA0Fy2HLP82FAClcQf6JTXSnbM',
  authDomain: 'fantasy-hockey-website.firebaseapp.com',
  projectId: 'fantasy-hockey-website',
  storageBucket: 'fantasy-hockey-website.appspot.com',
  messagingSenderId: '428055655900',
  appId: '1:428055655900:web:e24a4dcdf722e54dedcb19',
  measurementId: 'G-ECYL5VLDRS',
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;
