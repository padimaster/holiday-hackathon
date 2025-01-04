// components/connect-button.tsx
"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";

export function ConnectButton() {
  const { isConnecting } = useAccount();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <Button
            onClick={show}
            variant="outline"
            className="bg-purple-600 hover:bg-purple-700 text-white border-none rounded-full"
          >
            {isConnecting
              ? "Connecting..."
              : isConnected
              ? ensName || truncatedAddress
              : "Connect Wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
