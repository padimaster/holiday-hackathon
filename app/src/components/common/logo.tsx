import Image from "next/image";
import * as React from "react";

const Logo: React.FC = () => {
  return (
    <Image
      src="/logo.svg"
      alt="Tech Pills Logo"
      width={30}
      height={30}
    />
  );
};

export default Logo;