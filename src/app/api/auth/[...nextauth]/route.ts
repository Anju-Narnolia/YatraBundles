import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

// Local helper types to avoid implicit any
type SimpleUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

type TokenWithExtras = {
  id?: string;
  email?: string;
  role?: string;
  // allow additional fields without using 'any'
  [key: string]: unknown;
};

type SessionWithExtras = {
  user: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials?: { email: string; password: string }): Promise<SimpleUser | null> {
        if (!credentials) return null;
        await dbConnect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error("User not found");

          const isPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isPassword) throw new Error("Incorrect Password");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error: unknown) {
          console.error("Error:", error instanceof Error ? error.message : error);
          return null;
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
    async jwt({ token, user }: { token: TokenWithExtras; user?: SimpleUser | null }) {
      if (user) {
        if (user.id) token.id = user.id;
        if (user.email) token.email = user.email;
        if (user.role) token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: SessionWithExtras; token: TokenWithExtras }) {
      if (session.user) {
        if (token.id) session.user.id = token.id;
        if (token.email) session.user.email = token.email;
        if (token.role) session.user.role = token.role;
      }
      return session;
    },
  },
} as const;

// Strictly type the NextAuth handler without using 'any'
type RouteHandler = (req: Request) => Promise<Response>;

type NextAuthFactory = (
  opts: typeof authOptions
) => { GET: RouteHandler; POST: RouteHandler } | RouteHandler;

const nextAuthHandler = (NextAuth as unknown as NextAuthFactory)(authOptions);

export const GET: RouteHandler = (
  (nextAuthHandler as { GET?: RouteHandler }).GET ?? (nextAuthHandler as RouteHandler)
);
export const POST: RouteHandler = (
  (nextAuthHandler as { POST?: RouteHandler }).POST ?? (nextAuthHandler as RouteHandler)
);
