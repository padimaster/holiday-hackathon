import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/utils/session.options";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);

    return NextResponse.json({
      address: session.address,
      chainId: session.chainId,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
