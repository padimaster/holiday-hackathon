import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/db/connection';
import { Post } from '@/db/models/post';
import { Profile } from '@/db/models/profile';
import { Types } from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    const posts = await Post.find()
      .populate({
        path: 'profileId',
        model: Profile,
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: posts },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();

    const title = "title_001"; // TODO: Get from formData
    const content = formData.get("content") as string;
    const profileId = new Types.ObjectId("60f1b9e3f3b3f3b3f3b3f3b3"); // TODO: Get from auth
    const imageUrl = "null";

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      );
    }

    const post = await Post.create({
      title,
      content,
      profileId,
      imageUrl,
    });

    return NextResponse.json(
      { success: true, data: post},
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
