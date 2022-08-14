import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpfv1U-5ned-Nkj2qqP2M9q6dmysdQbQw",
  authDomain: "loginpage-fee29.firebaseapp.com",
  projectId: "loginpage-fee29",
  storageBucket: "loginpage-fee29.appspot.com",
  messagingSenderId: "757749483205",
  appId: "1:757749483205:web:e8922666c3c21c5cd912ac"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage}
