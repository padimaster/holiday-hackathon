import * as React from "react";
import { ProfileStatsProps } from "../types";

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  following,
  followers,
}) => {
  return (
    <div className="flex gap-5 mt-2.5 max-w-full whitespace-nowrap w-[207px]">
      <div className="flex flex-1 gap-1 items-start">
        <div className="font-bold text-white">{following}</div>
        <div className="font-medium tracking-tight text-slate-400">
          Following
        </div>
      </div>
      <div className="flex flex-1 gap-1.5 items-start">
        <div className="font-bold text-white">{followers}</div>
        <div className="font-medium tracking-tight text-slate-400">
          Followers
        </div>
      </div>
    </div>
  );
};
