import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_WYiN5hok5V3d9oktNxx4JuTDDTSHrCk",
  authDomain: "twitter-by-mahdi-1868d.firebaseapp.com",
  projectId: "twitter-by-mahdi-1868d",
  storageBucket: "twitter-by-mahdi-1868d.appspot.com",
  messagingSenderId: "387598294611",
  appId: "1:387598294611:web:ed7a5e70bc052ca20830a6",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };
