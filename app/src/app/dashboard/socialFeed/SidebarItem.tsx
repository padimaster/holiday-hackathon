import * as React from "react";

interface SidebarItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  notificationCount?: number;
}

export function SidebarItem({
  icon,
  label,
  isActive,
  notificationCount,
}: SidebarItemProps) {
  return (
    <div
      className={`flex overflow-hidden gap-5 px-2.5 py-2.5 mt-3 max-w-full text-xl ${
        isActive ? "text-purple-600 bg-purple-600 bg-opacity-30" : "text-white"
      } rounded-[43px]`}
    >
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 aspect-square w-[27px]"
      />
      <div className="grow shrink my-auto">
        {label}
        {notificationCount && (
          <span className="overflow-hidden px-1.5 text-xs bg-purple-600 rounded-3xl border border-black border-solid h-[17px] w-[17px]">
            {notificationCount}
          </span>
        )}
      </div>
    </div>
  );
}
