import { NextResponse } from "next/server";

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

  const protectedPath = Object.keys(rolePaths).find(path => pathname.startsWith(path));

  // Basic API Rate Limiting (Simulation/Placeholder for Edge)
  if (pathname.startsWith("/api/checkout") || pathname.startsWith("/api/reservations")) {
    const ip = request.ip || '127.0.0.1';
    // In production: Connect to Redis or Upstash here to rate limit by IP.
    // e.g. const { success } = await ratelimit.limit(ip);
    // if (!success) return NextResponse.json({error: "Too many requests"}, {status: 429});
  }

  if (protectedPath) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Use our own API route (which runs on Node.js and uses jsonwebtoken)
      // to verify the token instead of jose on the Edge runtime.
      const verifyUrl = new URL("/api/auth/verify", request.url);
      const verifyRes = await fetch(verifyUrl, {
        headers: {
          Cookie: `token=${token}`,
        },
      });

      if (!verifyRes.ok) {
        throw new Error("Invalid token");
      }

      const resData = await verifyRes.json();
      const userRole = resData.data?.role;
      const allowedRoles = rolePaths[protectedPath];

      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
