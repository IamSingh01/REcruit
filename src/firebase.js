import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJsAKomVGQuMUk2X3fNSnT34mN_fdy_XE",
  authDomain: "recruit-8ad4e.firebaseapp.com",
  projectId: "recruit-8ad4e",
  storageBucket: "recruit-8ad4e.appspot.com",
  messagingSenderId: "1048723153225",
  appId: "1:1048723153225:web:5ad1d0a1a8ea368ba73a98",
  measurementId: "G-44HZ452SHT",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {
  firestore,
  storage,
  collection,
  addDoc,
  serverTimestamp,
  ref,
  uploadBytes,
  getDownloadURL,
};

export function isFirebaseConfigured() {
  return true;
}
