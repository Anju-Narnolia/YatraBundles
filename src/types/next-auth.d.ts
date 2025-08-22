import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;  // <-- make this nullable
    };
  }

  interface User {
    id?: string | null;
    name?: string | null;
    email?: string | null;
  }
}
