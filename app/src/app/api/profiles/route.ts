import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/connection";
import { Profile } from "@/db/models/profile";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");
    const address = searchParams.get("address");

    let query = {};
    if (handle) query = { ...query, handle };
    if (address) query = { ...query, address };

    const profiles = await Profile.find(query);

    return NextResponse.json(
      { success: true, data: profiles },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const { handle, address, name, avatar, bio } = body;

    // Validate required fields
    if (!handle || !address || !name) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if profile already exists
    const existingProfile = await Profile.findOne({
      $or: [{ handle }, { address }],
    });

    if (existingProfile) {
      return NextResponse.json(
        { success: false, error: "Profile already exists" },
        { status: 409 }
      );
    }

    // Create new profile
    const profile = await Profile.create({
      handle,
      address,
      name,
      avatar: avatar || `/avatars/${handle}.jpg`,
      bio: bio || "",
      joinedDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      following: 0,
      followers: 0,
      techScore: 0,
    });

    return NextResponse.json({ success: true, data: profile }, { status: 201 });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create profile" },
      { status: 500 }
    );
  }
}
