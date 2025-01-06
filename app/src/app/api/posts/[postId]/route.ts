import { getPostById, updatePost } from "@/backend/posts/post.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const populate = searchParams.get("populate") === "true";
    const post = await getPostById(params.postId, populate);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const body = await request.json();
    const updatedPost = await updatePost(params.postId, body);
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
