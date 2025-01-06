import { profileService } from "@/backend/profiles/profile.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = {
      search: searchParams.get("search") || undefined,
      address: searchParams.get("address") || undefined,
      handle: searchParams.get("handle") || undefined,
      role: searchParams.get("role") || undefined,
      organization: searchParams.get("organization") || undefined,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : undefined,
      offset: searchParams.get("offset")
        ? parseInt(searchParams.get("offset")!)
        : undefined,
    };

    const profiles = await profileService.query(params);
    return NextResponse.json(profiles);
  } catch (error) {
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
    const profile = await profileService.create(body);

    if (!profile) {
      return NextResponse.json(
        { error: "Profile with this handle or address already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
