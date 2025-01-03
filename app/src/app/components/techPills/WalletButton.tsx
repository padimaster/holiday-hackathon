import React from "react";
import styles from "./WalletButton.module.css";

interface WalletButtonProps {
  onClick: () => void;
}

export const WalletButton: React.FC<WalletButtonProps> = ({ onClick }) => {
  return (
    <button
      className={styles.walletButton}
      onClick={onClick}
      aria-label="Connect wallet"
    >
      CONNECT WALLET
    </button>
  );
};
