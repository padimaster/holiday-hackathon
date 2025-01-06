import { Button } from "../ui/button";

import { signIn } from "next-auth/react";

import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useSignMessage } from "wagmi";

import { useAccount } from "wagmi";

// components/auth/AuthButton.tsx
export function AuthButton() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();

  const handleAuth = async () => {
    if (!isConnected || !address) {
      openConnectModal();
      return;
    }

    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to Tech Pills",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
        nonce: await getCsrfToken(),
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      await signIn("web3", {
        message: JSON.stringify(message),
        signature,
        redirect: false,
      });
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <Button onClick={handleAuth} className="bg-purple-600 hover:bg-purple-700">
      {isConnected ? "Sign In" : "Connect Wallet"}
    </Button>
  );
}
