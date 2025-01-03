import * as React from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { TechPillsLogo } from "./TechPillsLogo";
import { TechPillsHeading } from "./TechPillsHeading";

export const TechPillsHero: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center px-20 pt-7 pb-60 font-bold text-white bg-black max-md:px-5 max-md:pb-24">
      <ConnectWalletButton />
      <TechPillsLogo />
      <TechPillsHeading />
    </div>
  );
};
