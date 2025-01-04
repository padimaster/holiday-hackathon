import * as React from "react";
import { WalletButtonProps } from "./types";

export const WalletButton: React.FC<WalletButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="overflow-hidden self-end px-16 py-6 text-xl bg-purple-600 rounded-[34px] max-md:px-5"
      aria-label="Connect Wallet"
    >
      CONNECT WALLET
    </button>
  );
};
