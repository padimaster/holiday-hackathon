import { profileService } from "@/backend/profiles/profile.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const { handle } = await params;
    const profile = await profileService.findByHandle(handle);

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
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
  { params }: { params: { handle: string } }
) {
  try {
    const { handle } = await params;
    const body = await request.json();
    const profile = await profileService.update(handle, body);

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found or duplicate handle/address" },
        { status: 400 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
