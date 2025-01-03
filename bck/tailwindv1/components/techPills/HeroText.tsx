import * as React from "react";
import { HeroTextProps } from "./types";

export const HeroText: React.FC<HeroTextProps> = ({ title, description }) => {
  return (
    <>
      <div className="mt-4 text-6xl font-bold max-md:text-4xl">{title}</div>
      <div className="self-start mt-4 text-4xl font-bold text-center max-md:max-w-full">
        {description}
      </div>
    </>
  );
};
