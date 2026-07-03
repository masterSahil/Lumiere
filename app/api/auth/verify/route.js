import connectDB from "@/libs/config";
import User from "@/model/user";
import { getTokenFromCookie, verifyToken } from "@/libs/auth";
import { errorResponse, successResponse } from "@/libs/api-utils";

export async function GET(req) {
  try {
    await connectDB();
    
    // Check cookie first (primary auth mechanism), then fallback to Authorization header
    let token = await getTokenFromCookie();
    
    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return errorResponse("Unauthorized - No token provided", 401);
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return errorResponse("Unauthorized - Invalid or expired token", 401);
    }

    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return errorResponse("User not found", 404);
    }

    if (!user.isActive || user.isDeleted) {
      return errorResponse("Account deactivated or deleted", 403);
    }

    return successResponse(user, "User verified successfully", 200);
  } catch (error) {
    console.error("Verify Error:", error);
    return errorResponse("Internal server error", 500, error.message);
  }
}