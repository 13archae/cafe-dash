
import { initializeApp, getApps, getApp  } from "firebase-admin/app"
import {getFirestore} from "firebase/firestore";


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
import admin from "firebase-admin";

import serviceAccount from "./cafedash-0-0-1-SA.json"; 

const apps = getApps()

let app = null

  if (apps.length  === 0) {
    app = initializeApp({
      credential: admin.credential.cert(serviceAccount)
  })
  } else {
    app = getApp()
    }
  
  

  //const db = getFirestore(app);
  //const storage = getStorage(app);
  

  //export { admin, app, db }; 