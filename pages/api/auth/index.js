import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

//session MongoDB Client
import clientPromise from '@/lib/mongodb';
const client = await clientPromise;

export const authOptions = {

    adapter: MongoDBAdapter(client),

  // Configure one or more authentication providers
  providers: [
    /* GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }), */
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)