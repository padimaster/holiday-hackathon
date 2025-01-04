import * as React from "react";
import { WalletButton } from "./WalletButton";
import { HeroImage } from "./HeroImage";

export const TechPillsHero: React.FC = () => {
  const handleWalletConnect = () => {
    // Wallet connection logic would go here
  };

  return (
    <div className="flex overflow-hidden flex-col text-white bg-black">
      <div className="flex flex-col items-center px-20 pt-5 pb-60 w-full max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <div className="flex flex-col mb-0 ml-3 w-full max-w-[1213px] max-md:mb-2.5 max-md:max-w-full">
          <div className="flex flex-col items-start self-end max-w-full w-[770px]">
            <WalletButton onClick={handleWalletConnect} />
            <HeroImage
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/80c2fee3ba9e133fbc161891cf10b3e3bf384ffc484eec8b92ace5230176d08d?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              alt="Tech Pills platform illustration"
            />
            <h1 className="text-6xl font-bold max-md:text-4xl">Tech pills</h1>
          </div>
          <p className="mt-4 mr-7 text-4xl font-bold text-center max-md:mr-2.5 max-md:max-w-full">
            Whether you're a curious enthusiast, a tech professional, or a
            builder, Tech Pills offers tailored content to learn, explore, and
            create—all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};
