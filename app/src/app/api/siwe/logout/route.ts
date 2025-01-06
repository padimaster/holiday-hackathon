import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  response.cookies.set("siwe-session", "", { maxAge: 0 });
  response.cookies.set("siwe-nonce", "", { maxAge: 0 });
  
  return response;
}
