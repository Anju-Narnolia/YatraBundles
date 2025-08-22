// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // You can add custom logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If token exists → allow access
        return !!token;
      },
    },
  }
);

// Specify which routes to protect
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // protect these routes
};
