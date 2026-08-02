// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-tBEyZZ6eAQ7IgukFKNpdg4SIfYc1hOU",
  authDomain: "almighty-dce73.firebaseapp.com",
  projectId: "almighty-dce73",
  storageBucket: "almighty-dce73.firebasestorage.app",
  messagingSenderId: "934721971534",
  appId: "1:934721971534:web:7810ca060a4a34f212ea1f",
  databaseURL:"https://almighty-dce73-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);