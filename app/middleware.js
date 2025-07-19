import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const path = req.nextUrl.pathname;

    // Define role-based access
    const roleAccess = {
      admin: ["/admin", "/dashboard"],
      seller: ["/seller", "/dashboard"],
      user: ["/dashboard"],
    };

    // Check if the user has access to the requested path based on their role
    if (token && token.role) {
      const allowedPaths = roleAccess[token.role];
      if (allowedPaths && allowedPaths.some(p => path.startsWith(p))) {
        return NextResponse.next();
      }
    }

    // Redirect to login if not authenticated or not authorized
    return NextResponse.redirect(new URL("/auth/login", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/admin/:path*", "/seller/:path*"],
};