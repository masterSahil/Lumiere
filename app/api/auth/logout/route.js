import { clearAuthCookie } from "@/libs/auth";
import { successResponse, errorResponse } from "@/libs/api-utils";

export async function POST() {
  try {
    await clearAuthCookie();
    return successResponse(null, "Logged out successfully");
  } catch (error) {
    console.error("Logout Error:", error);
    return errorResponse("Failed to logout");
  }
}
