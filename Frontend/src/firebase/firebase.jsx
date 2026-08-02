import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-tBEyZZ6eAQ7IgukFKNpdg4SIfYc1hOU",
  authDomain: "almighty-dce73.firebaseapp.com",
  databaseURL: "https://almighty-dce73-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "almighty-dce73",
  storageBucket: "almighty-dce73.firebasestorage.app",
  messagingSenderId: "934721971534",
  appId: "1:934721971534:web:7810ca060a4a34f212ea1f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);





