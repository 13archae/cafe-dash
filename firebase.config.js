import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

import { getAuth } from "firebase/auth";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSENGER_SENDING,
    appId: process.env.FIREBASE_APP_ID
  };
  
  
  // Initialize Firebase
  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const storage = getStorage(app);

  export { app, db, storage };