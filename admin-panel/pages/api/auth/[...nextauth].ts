import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import clientPromise from "@/lib/mongodb";

const adminEmails = process.env.ADMIN_EMAILS?.split(",") ?? [];

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user }) {
      return adminEmails.includes(user.email!);
    },
    async session({ session, user, token }) {
      return adminEmails.includes(user.email) ? session : false;
    },
  },
};

export default NextAuth(authConfig);

export async function isAuthenticated(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authConfig);
  if (!adminEmails.includes(session?.user?.email!)) {
    res.redirect("/unauthorized")
    res.status(401);
    res.end();
    throw "Not Admin User";
  }
}
