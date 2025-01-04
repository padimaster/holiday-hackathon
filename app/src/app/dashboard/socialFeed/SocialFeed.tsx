import * as React from "react";
import { SearchBar } from "./SearchBar";
import { SidebarItem } from "./SidebarItem";
import { TrendingItem } from "./TrendingItem";
import { Post } from "./Post";
import { TrendingTopic, PostData } from "./types";

const trendingTopics: TrendingTopic[] = [
  {
    category: "Web3",
    hashtag: "#web3",
    stats: "Trending with Lens",
    promotedBy: "Deep Fresh Türkiye",
  },
  {
    category: "AI",
    hashtag: "#aitutors",
    stats: "9,042 pills",
    promotedBy: "xxx",
  },
];

const posts: PostData[] = [
  {
    user: {
      name: "Alice",
      handle: "@alice",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/7fb49d5168fa14a1a4cf95f73b5b78fb270eb7b6da1f8e90e121b06c9bba15f6?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
      verified: true,
    },
    timestamp: "6sn",
    content:
      "The new Lens Network is a blockchain designed to power decentralized social applications...",
    linkPreview: {
      title: "Social is financial with Lens",
      description:
        "Lens is the fastest, lowest-cost Ethereum network powering social and finance",
      url: "lens.xyz",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/51dbbe68b3c98c5ca6f9fd32eaf736262012b9522f0cd06975d86f2b2b43589a?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    },
    stats: {
      likes: 999,
      comments: 998,
      shares: 999,
    },
  },
];

export function SocialFeed() {
  return (
    <div className="flex overflow-hidden flex-col items-center px-20 bg-black max-md:px-5">
      <div className="flex flex-col pt-8 pr-5 w-full bg-black max-w-[1267px] max-md:max-w-full">
        <SearchBar />
        <div className="flex gap-5 self-start mt-0">
          <nav className="flex flex-col grow shrink-0 self-end pt-5 mt-8 basis-0 w-fit">
            <h1 className="z-10 self-center mt-5 text-2xl font-bold text-white">
              Tech pills
            </h1>
            <div className="flex flex-col items-start mt-0 max-w-full font-bold text-white whitespace-nowrap w-[209px]">
              {/* Navigation items */}
              <SidebarItem
                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/d22230c5bcae6fee7515a0c1e5506957e44b7211ec99b3cc481be1e09f509fc7?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                label="Dashboard"
                isActive={true}
              />
              <SidebarItem
                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/390edcb161801aa85d6270188aef55a9c3bdeddc9c586b89dec235e68e1101f3?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                label="Explore"
              />
              <SidebarItem
                icon=""
                label="Notifications"
                notificationCount={1}
              />
            </div>
          </nav>
          <div className="flex shrink-0 w-px bg-zinc-800 h-[930px]" />
        </div>
        <div className="flex z-10 flex-col self-center mt-0 max-w-full w-[599px]">
          <div className="flex flex-col items-center w-full">
            {trendingTopics.map((topic, index) => (
              <TrendingItem key={index} topic={topic} />
            ))}
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
