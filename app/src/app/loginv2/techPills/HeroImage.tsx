import * as React from "react";
import { HeroImageProps } from "./types";

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt }) => {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="object-contain mt-32 max-w-full aspect-[1.25] w-[321px] max-md:mt-10"
    />
  );
};
