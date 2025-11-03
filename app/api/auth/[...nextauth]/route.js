
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import User from "../../../model/user"
// import clientPromise from "@/app/config/db"
import bcrypt from "bcryptjs"
import dbConnect from "../../../config/db"

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect()

        const user = await User.findOne({ email: credentials.email })

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user._id; // Add user ID to token
        token.phone = user.phone;
        token.profilePicture = user.profilePicture;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id; // Add user ID to session
        session.user.phone = token.phone;
        session.user.profilePicture = token.profilePicture;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // Redirect to login page on error
  },
  // Custom error handling for credentials provider
  events: {
    async signIn(message) {
      if (message.error) {
        console.error("Sign in error:", message.error);
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
