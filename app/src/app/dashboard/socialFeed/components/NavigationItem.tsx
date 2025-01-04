import * as React from "react";
import { NavigationItemProps } from "../types";

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  label,
  isActive = false,
}) => {
  return (
    <div
      className={`flex overflow-hidden gap-5 px-3.5 py-2.5 mt-3 max-w-full rounded-[43px] ${
        isActive ? "bg-purple-600 bg-opacity-30 text-purple-600" : ""
      }`}
    >
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 self-start aspect-[0.88] w-[22px]"
      />
      <div>{label}</div>
    </div>
  );
};
