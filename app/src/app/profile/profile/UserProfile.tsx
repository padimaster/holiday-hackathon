import * as React from "react";
import { UserProfileProps } from "./types";

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  handle,
  location,
  joinDate,
  stats,
  techScore,
}) => {
  return (
    <div className="flex flex-col items-start w-full text-base">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/588fb6f29f74e9503742facd7af0e222c87bb3ea6aaa616c2f6e1b87edc879f8?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
        className="object-contain max-w-full aspect-[1.02] w-[142px]"
        alt={`${name}'s profile banner`}
      />
      <div className="mt-14 font-medium tracking-tight text-white max-md:mt-10">
        Product Designer
      </div>
      <div className="flex gap-2.5 items-start self-stretch mt-2.5 font-medium text-slate-400">
        <div className="flex gap-1.5 tracking-tight whitespace-nowrap w-[76px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8bd8f67f3df26af69ec16dcf565042f78b1d4d16c7c9b5e34d1c905385995fe?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
            className="object-contain shrink-0 self-start aspect-square w-[19px]"
            alt="Location icon"
          />
          <div>{location}</div>
        </div>
        <div className="flex gap-1.5 tracking-tight w-[185px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb7ce3d82764bce16544d5aaa9eb1395ce321098fecfb490e0c9fde5b0be95f8?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
            className="object-contain shrink-0 self-start aspect-square w-[19px]"
            alt="Calendar icon"
          />
          <div className="basis-auto">Joined {joinDate}</div>
        </div>
      </div>
      <div className="flex gap-5 mt-2.5 max-w-full whitespace-nowrap w-[207px]">
        <div className="flex flex-1 gap-1 items-start">
          <div className="font-bold text-white">{stats.following}</div>
          <div className="font-medium tracking-tight text-slate-400">
            Following
          </div>
        </div>
        <div className="flex flex-1 gap-1.5 items-start">
          <div className="font-bold text-white">{stats.followers}</div>
          <div className="font-medium tracking-tight text-slate-400">
            Followers
          </div>
        </div>
      </div>
      <div className="text-base font-light text-purple-600">Tech score</div>
      <div className="text-4xl text-purple-600">{techScore}</div>
    </div>
  );
};
