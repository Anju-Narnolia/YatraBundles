// Extend NextAuth types

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;  // <-- make this nullable
      role?: string | null;
    };
  }

  interface User {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    role?: string;
  }
}
