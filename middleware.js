import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.SECRET || "fallback_secret");

// Define protected paths and the roles that are allowed to access them
const rolePaths = {
  "/admin": ["superadmin", "admin"],
  "/superadmin": ["superadmin"],
  "/dashboard": ["customer", "superadmin", "admin"],
  "/checkout": ["customer", "superadmin", "admin"],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Exclude static files, api routes, and public paths from middleware
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/public") ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)
  ) {
    return NextResponse.next();
  }

  // Find if the path is protected
  const protectedPath = Object.keys(rolePaths).find(path => pathname.startsWith(path));

  if (protectedPath) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      // Redirect to login if trying to access a protected route without a token
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verify token using jose for Edge runtime compatibility
      const { payload } = await jwtVerify(token, SECRET);
      const userRole = payload.role;
      const allowedRoles = rolePaths[protectedPath];

      if (!allowedRoles.includes(userRole)) {
        // Redirect unauthorized users to home or a not-authorized page
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // If token is invalid or expired, clear it and redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
