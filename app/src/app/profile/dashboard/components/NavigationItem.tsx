import * as React from "react";
import { NavigationItemProps } from "../types";

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  label,
  isActive,
}) => {
  const baseClasses =
    "overflow-hidden px-5 py-3 mt-3 max-w-full rounded-[43px]";
  const activeClasses = isActive
    ? "bg-purple-600 bg-opacity-30 text-purple-600"
    : "text-white";

  return (
    <div
      className={`flex gap-5 justify-between ${baseClasses} ${activeClasses}`}
    >
      {icon && (
        <img
          loading="lazy"
          src={icon}
          className="object-contain shrink-0 self-start aspect-[0.88] w-[22px]"
          alt=""
        />
      )}
      <div>{label}</div>
    </div>
  );
};
