import connectDB from "@/libs/config";
import User from "@/model/user";
import { hashPassword, generateToken, setAuthCookie } from "@/libs/auth";
import { errorResponse, successResponse } from "@/libs/api-utils";

export async function POST(req) {
  try {
    await connectDB();
    const { username, email, password, role, restaurantId } = await req.json();

    if (!username || !email || !password) {
      return errorResponse("Please provide all required fields", 400);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return errorResponse("User with this email already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    // Default to 'customer' if role is not provided, or ensure valid roles are passed
    const userRole = role && ["superadmin", "admin", "customer", "guest"].includes(role) ? role : "customer";

    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: userRole,
      restaurantId: restaurantId || undefined,
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    // Automatically log the user in after registration
    const token = generateToken({ id: newUser._id, role: newUser.role });
    await setAuthCookie(token);

    return successResponse(userObj, "User registered successfully", 201);
  } catch (error) {
    console.error("Register Error:", error);
    return errorResponse("Failed to register user", 500, error.message);
  }
}