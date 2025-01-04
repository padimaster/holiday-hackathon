import * as React from "react";
import { NavigationItemProps } from "./types";

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  label,
  count,
  isActive,
}) => {
  const baseClasses =
    "flex overflow-hidden gap-5 px-2.5 py-2.5 mt-3 max-w-full text-xl";
  const activeClasses = isActive
    ? "text-purple-600 bg-purple-600 bg-opacity-30"
    : "";

  return (
    <div className={`${baseClasses} ${activeClasses} rounded-[43px]`}>
      <img
        loading="lazy"
        src={icon}
        className="object-contain shrink-0 aspect-square w-[27px]"
        alt=""
      />
      <div className="grow shrink my-auto">
        {label}
        {count && (
          <span className="overflow-hidden self-start px-1.5 text-xs bg-purple-600 rounded-3xl border border-black border-solid h-[17px] w-[17px]">
            {count}
          </span>
        )}
      </div>
    </div>
  );
};
