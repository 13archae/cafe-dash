import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import {FirebaseAdapter} from "@next-auth/firebase-adapter";

import { db } from "@/firebase.config";

import clientPromise from '@/lib/mongodb';
const client = await clientPromise;

export default NextAuth({
    //adapter: MongoDBAdapter(client),
    adapter: FirebaseAdapter(db),
    providers: [
        CredentialsProvider({
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
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Add additional data to the session object, if needed
            return session;
        },
    },
});