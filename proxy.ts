import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const rolePaths = {
  "/admin": ["superadmin", "admin"],
  "/superadmin": ["superadmin"],
  "/dashboard": ["customer", "superadmin", "admin"],
  "/checkout": ["customer", "superadmin", "admin"],
};

const rateLimitMap = new Map();
const RATE_LIMIT = 60; 
const RATE_LIMIT_WINDOW = 60 * 1000;

export async function proxy(request: any) {
  const SECRET = process.env.SECRET || "fallback_secret";
  
  const { pathname } = request.nextUrl;
  
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    const ip = request.headers.get('x-forwarded-for') || request.ip || '127.0.0.1';
    const now = Date.now();
    
    const record = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    if (now - record.timestamp > RATE_LIMIT_WINDOW) {
      record.count = 1;
      record.timestamp = now;
    } else {
      record.count++;
    }
    rateLimitMap.set(ip, record);

    if (record.count > RATE_LIMIT) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }

  const protectedPath = Object.keys(rolePaths).find(path => pathname.startsWith(path));

  if (protectedPath) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(SECRET);
      const { payload } = await jwtVerify(token, secret);
      const userRole = payload.role as string;
      const allowedRoles = (rolePaths as any)[protectedPath];

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
