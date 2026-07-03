import { NextResponse } from "next/server";

export const successResponse = (data, message = "Success", status = 200) => {
  return NextResponse.json({ success: true, message, data }, { status });
};

export const errorResponse = (message = "Internal Server Error", status = 500, errors = null) => {
  return NextResponse.json({ success: false, message, errors }, { status });
};

export const getPaginationOptions = (request) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const paginatedResponse = (data, total, page, limit, message = "Success") => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
    { status: 200 }
  );
};
