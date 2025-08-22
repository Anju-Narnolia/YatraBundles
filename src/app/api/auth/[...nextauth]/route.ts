import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        await dbConnect();
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (!user) throw new Error("User not found");

          const isPassword = await bcrypt.compare(
            credentials?.password,
            user.password
          );
          if (!isPassword) throw new Error("Incorrect Password");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error: unknown) {
          console.error(
            "Error:",
            error instanceof Error ? error.message : error
          );
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString();
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
