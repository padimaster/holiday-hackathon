import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log(req);
  return NextResponse.json({ success: true });
}
