import {
  createPost,
  getAllPosts,
  getPostsByHandle,
} from "@/backend/posts/post.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const populate = searchParams.get("populate") === "true";
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const handle = searchParams.get("handle");

    if (handle) {
      // Ensure we're passing parameters in the correct order/structure
      const result = await getPostsByHandle({
        handle,
        populate,
        limit,
        offset,
      });
      return NextResponse.json(result);
    }

    // Pass parameters as an object
    const result = await getAllPosts({
      populate,
      limit,
      offset,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await createPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
