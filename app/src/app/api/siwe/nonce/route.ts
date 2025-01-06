import { NextRequest, NextResponse } from "next/server";
import { generateSiweNonce } from "viem/siwe";

export async function GET(req: NextRequest, res: NextResponse) {
  const nonce = generateSiweNonce();

  return NextResponse.json({ nonce });
}