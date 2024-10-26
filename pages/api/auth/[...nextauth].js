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
    debug: true,
    session: { strategy: "jwt" },
    //adapter: MongoDBAdapter(client),
    adapter: FirestoreAdapter(),//getAuth(admin)),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jbrown@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const client = await clientPromise;
                
                    const database = client.db('cafe-app');
                    const collection = database.collection('users');
                
                    const query = {  $and: [{"email": {$eq: credentials.email}}, {"password": {$eq: credentials.password}}] };
                
                    // Find all documents in the collection
                    const user = await collection.findOne(query);
                
                    console.log("User:  ", user);

                    if (user) {
                        user.name = user.username;
                        user.id = user._id;
                        user.email = user.email;
                        return user;
                    } else {
                        return null;
                    }

                  } catch(error) {
                    console.error("Error in Users: ", error);
                  }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
        
    ],
    callbacks: {
        async session({ session, token}, user) {
            // Add additional data to the session object, if needed
            //console.log("token: ", token);
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            //console.log("Session: ", session);
            return session;
        },
        async jwt({ token, user }) {
            // Access the JWT here
            if (user) {
                //console.log("User: ", user);
                token.id = user.id;
                token.email = user.email;
                if(!token.name) {
                    token.name = user.username;
                }
                else {
                    token.name = user.name;
                } 
                

              }
            //console.log("JWT:", token)
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