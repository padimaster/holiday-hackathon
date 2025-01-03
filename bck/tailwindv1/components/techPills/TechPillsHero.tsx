"use client";

import * as React from "react";
import Image from "next/image";
import { WalletButton } from "./WalletButton";
import { HeroText } from "./HeroText";

export const TechPillsHero: React.FC = () => {
  const handleWalletConnect = () => {
    // Wallet connection logic would be implemented here
  };

  return (
    <div className="flex overflow-hidden flex-col items-center px-20 pt-5 pb-60 text-white bg-black max-md:px-5 max-md:pb-24">
      <div className="flex flex-col ml-3 w-full max-w-[1213px] max-md:max-w-full">
        <div className="flex flex-col items-start self-end max-w-full w-[770px]">
          <WalletButton text="CONNECT WALLET" onClick={handleWalletConnect} />
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d94df9dbfe4d0470dc7e4ba8f145f2366a648eaef682fd26b53aae89f70e18e"
            alt="Tech Pills logo"
            width={244}
            height={260}
            className="object-contain mt-24 ml-5 max-w-full rounded-none max-md:mt-10 max-md:ml-2.5"
          />
          <HeroText
            title="Tech pills"
            description="Whether you're a curious enthusiast, a tech professional, or a builder, Tech Pills offers tailored content to learn, explore, and create—all in one place."
          />
        </div>
      </div>
    </div>
  );
};