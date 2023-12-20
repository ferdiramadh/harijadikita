// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLBiKlysZ_26HuwfnOSZyQ1waUlH3nqAQ",
  authDomain: "harijadikita-f1f3e.firebaseapp.com",
  projectId: "harijadikita-f1f3e",
  storageBucket: "harijadikita-f1f3e.appspot.com",
  messagingSenderId: "620848935395",
  appId: "1:620848935395:web:8677c4b4f75a0573f9f0d6",
  measurementId: "G-N26687T7HX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)