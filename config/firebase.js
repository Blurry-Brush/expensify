// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore , collection} from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKp_O8LiQ-PyXLplQnxuB9mRxN4JXMhHQ",
  authDomain: "expensify-786e4.firebaseapp.com",
  projectId: "expensify-786e4",
  storageBucket: "expensify-786e4.appspot.com",
  messagingSenderId: "173561116527",
  appId: "1:173561116527:web:23e5c80d2672a8eec15a9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const db = getFirestore(app);
export const auth = getAuth(app);
export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')
export default app;