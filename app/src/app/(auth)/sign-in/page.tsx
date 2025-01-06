// app/auth/signin/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSIWE } from "connectkit";
import { useSession, signIn as nextAuthSignIn } from "next-auth/react";
import { SiweMessage } from "siwe";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const { data: session } = useSession();
  const { signIn: siweSignIn, data: siweData } = useSIWE();

  useEffect(() => {
    if (session) {
      router.push(callbackUrl);
    }
  }, [session, router, callbackUrl]);

  useEffect(() => {
    const handleSiweAuth = async () => {
      if (siweData?.address && siweData.signature) {
        const message = new SiweMessage({
          domain: window.location.host,
          address: siweData.address,
          statement: "Sign in to Tech Pills",
          uri: window.location.origin,
          version: "1",
          chainId: siweData.chainId,
          nonce: siweData.nonce,
        });

        await nextAuthSignIn("web3", {
          message: JSON.stringify(message),
          signature: siweData.signature,
          redirect: false,
        });
      }
    };

    handleSiweAuth();
  }, [siweData]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Sign in to Tech Pills</h2>
          <p className="mt-2 text-gray-400">
            Connect your wallet to access your learning journey
          </p>
        </div>
        <button
          onClick={async () => await siweSignIn()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
