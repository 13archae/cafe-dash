import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
//import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { getAuth } from "firebase-admin/auth"; 
import { admin } from "@/firebase.config";   
//import { initializeApp, cert, getApps, getApp  } from "firebase-admin/app"


//For Mongodb
import clientPromise from '@/lib/mongodb';


export default NextAuth({
    //adapter: MongoDBAdapter(client),
    adapter: FirestoreAdapter(),//getAuth(admin)),
    providers: [
        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jbrown@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials,) {
                try {
                    const client = await clientPromise;
                
                    const database = client.db('cafe-app');
                    const collection = database.collection('users');
                
                    const query = {  $and: [{"email": {$eq: credentials.email}}, {"password": {$eq: credentials.password}}] }; ;
                
                    // Find all documents in the collection
                    const result = await collection.find(query).toArray();
                
                    console.log(result);

                    if (result) {
                        return true
                    }
                    else {
                        return false
                    }

                    //return result;
                  } catch(error) {
                    console.error("Error in Users: ", error);
                  }
            },
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Add additional data to the session object, if needed
            session.user.stripeCustomerId = user.stripeCustomerId;
            session.user.id = user.id;
         
            return session;
        },
        async jwt({ token, user }) {
            // Access the JWT here
            console.log("JWT:", token)
            return token
          },
    },
});


/* CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    const client = await clientPromise;
                
                    const database = client.db('cafe-app');
                    const collection = database.collection('users');
                
                    const query = {  $and: [{"email": {$eq: credentials.email}}, {"password": {$eq: credentials.password}}] }; ;
                
                    // Find all documents in the collection
                    const result = await collection.find(query).toArray();
                
                    console.log(result);
                    return result;
                  } catch(error) {
                    console.error("Error in Users: ", error);
                  }
            },
        }), */