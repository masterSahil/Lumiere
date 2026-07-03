import connectDB from "@/libs/config";
import User from "@/model/user";
import { comparePassword, generateToken, setAuthCookie } from "@/libs/auth";
import { errorResponse, successResponse } from "@/libs/api-utils";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return errorResponse("Please provide email and password", 400);
    }

    const user = await User.findOne({ email: email.toLowerCase(), isDeleted: false });
    if (!user) {
      return errorResponse("Invalid email or password", 401);
    }

    if (!user.isActive) {
      return errorResponse("Your account has been deactivated. Please contact support.", 403);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return errorResponse("Invalid email or password", 401);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Create JWT Token
    const payload = {
      userId: user._id,
      role: user.role,
      restaurantId: user.restaurantId || null,
    };
    
    const token = generateToken(payload);
    
    // Set HTTP-Only Cookie
    await setAuthCookie(token);

    const userObj = user.toObject();
    delete userObj.password;

    return successResponse(
      { user: userObj, token }, // Returning token in payload for client-side legacy support if needed, though cookie is primary
      "Login successful",
      200
    );
  } catch (error) {
    console.error("Login Error:", error);
    return errorResponse("Failed to login", 500, error.message);
  }
}