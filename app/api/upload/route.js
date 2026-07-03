import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert to Data URI
    const mime = file.type;
    const base64Data = buffer.toString("base64");
    const fileUri = `data:${mime};base64,${base64Data}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: "restro",
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    }, { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, message: "Failed to upload image" }, { status: 500 });
  }
}
