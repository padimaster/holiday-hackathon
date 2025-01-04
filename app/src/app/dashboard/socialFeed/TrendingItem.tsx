import * as React from "react";
import { TrendingTopic } from "./types";

interface TrendingItemProps {
  topic: TrendingTopic;
}

export function TrendingItem({ topic }: TrendingItemProps) {
  return (
    <div className="flex overflow-hidden flex-col w-full bg-zinc-900">
      <div className="flex flex-col items-center self-center w-80 max-w-full">
        <div className="flex flex-col items-start py-2.5 w-full max-w-xs">
          {topic.category && (
            <div className="flex gap-10 items-center self-stretch">
              <div className="self-stretch my-auto">
                Trending in {topic.category}
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8682ddcfcc7ad1526c6270d2caaad12a6d9e2c227546fc559af020bf02aa88c0?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
              />
            </div>
          )}
          <div className="gap-2.5 self-stretch py-1 font-bold text-white whitespace-nowrap">
            {topic.hashtag}
          </div>
          <div className="gap-2.5 self-stretch py-1 text-sm">{topic.stats}</div>
          {topic.promotedBy && (
            <div className="flex flex-col items-center w-full text-sm">
              <div className="flex overflow-hidden gap-1 py-1 w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce9538b5f1fc4aeffca29d00d33536f4cd8d4ce90c98fb57daba4f43fa794577?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                  alt=""
                  className="object-contain shrink-0 self-start aspect-square w-[13px]"
                />
                <div className="flex-auto w-[301px]">
                  Promoted by {topic.promotedBy}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full bg-gray-500 min-h-[1px]" />
    </div>
  );
}
