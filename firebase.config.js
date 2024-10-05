
import { initializeApp, cert, getApps, getApp  } from "firebase-admin/app"
import {getFirestore} from "firebase/firestore";

/*import {getStorage} from "firebase/storage";

//import { getAuth } from "firebase/auth";
//import { FirebaseAdapter } from "@next-auth/firebase-adapter";
//import NextAuth from "next-auth";
//import GoogleProvider from "next-auth/providers/google";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSENGER_SENDING,
    appId: process.env.FIREBASE_APP_ID
  };
  
  */
  // Initialize Firebase
const admin = require("firebase-admin");

const serviceAccount = require("@/cafedash-0-0-1-SA.json"); 

  const app = getApps() > 0 ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
  }) : getApps[0];

  const db = getFirestore(app);
  //const storage = getStorage(app);
  

  export { admin, app, db }; 