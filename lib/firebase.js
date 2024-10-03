// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const googleProvider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const { handlers } = NextAuth({
  providers: [
    googleProvider,
  ],
  adapter: FirebaseAdapter(auth),
});

const signIn = () => auth.signInWithPopup(provider);
const signOut = () => auth.signOut();
