import * as React from "react";
import { TrendingItemProps } from "../types";

export const TrendingItem: React.FC<TrendingItemProps> = ({
  category,
  hashtag,
  subtext,
  promotedBy,
  pillCount,
}) => {
  return (
    <div className="flex overflow-hidden flex-col w-full bg-zinc-900">
      <div className="flex flex-col items-center self-center w-80 max-w-full">
        <div className="flex flex-col items-start py-2.5 w-full max-w-xs">
          <div className="flex gap-10 items-center self-stretch">
            <div className="self-stretch my-auto">Trending in {category}</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a40ed6259d5de09203d41c5f8b4d77e7f1e33823f15ee6b8d87f2688c6d2ef8d?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
              alt=""
            />
          </div>
          <div className="gap-2.5 self-stretch py-1 font-bold text-white whitespace-nowrap">
            #{hashtag}
          </div>
          <div className="gap-2.5 self-stretch py-1 text-sm">
            {pillCount ? `${pillCount} pills` : subtext}
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="flex overflow-hidden gap-1 py-1 w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f27771e67d79f9113feecf2abbfa2ed97b2ecaf3c617aa70d8d67dd3eed6567?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                className="object-contain shrink-0 self-start aspect-square w-[13px]"
                alt=""
              />
              <div className="flex-auto w-[301px]">
                Promoted by {promotedBy}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full bg-gray-500 min-h-[1px]" />
    </div>
  );
};
