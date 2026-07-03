import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const SECRET = process.env.SECRET || "fallback_secret";

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT Token
export const generateToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

// Verify JWT Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};

// Set HTTP-Only Cookie
export const setAuthCookie = async (token) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
};

// Clear HTTP-Only Cookie
export const clearAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};

// Get Token from Cookie
export const getTokenFromCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return token ? token.value : null;
};
