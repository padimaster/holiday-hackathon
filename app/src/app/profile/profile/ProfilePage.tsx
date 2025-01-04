import * as React from "react";
import { TrendingItem } from "./TrendingItem";
import { NavigationItem } from "./NavigationItem";
import { UserProfile } from "./UserProfile";
import { Post } from "./Post";

const navigationItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d22230c5bcae6fee7515a0c1e5506957e44b7211ec99b3cc481be1e09f509fc7?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    label: "Dashboard",
    isActive: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/390edcb161801aa85d6270188aef55a9c3bdeddc9c586b89dec235e68e1101f3?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    label: "Explore",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8a94af30-84f5-4795-aa22-ba7f45658975?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    label: "Notifications",
    count: "1",
  },
];

const trendingItems = [
  {
    category: "Web3",
    hashtag: "web3",
    subtext: "Trending with Lens",
    promotedBy: "Deep Fresh Türkiye",
  },
  {
    category: "AI",
    hashtag: "aitutors",
    subtext: "9,042 pills",
    promotedBy: "xxx",
  },
];

export const ProfilePage: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col items-end px-16 bg-black max-md:px-5">
      <div className="pr-5 max-w-full bg-black w-[1266px]">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[71%] max-md:ml-0 max-md:w-full">
            <nav className="flex flex-col pt-5 mt-8 font-bold text-white">
              <div className="z-10 self-center mt-5 text-2xl">Tech pills</div>
              <div className="flex flex-col items-start mt-0 w-full whitespace-nowrap">
                {navigationItems.map((item, index) => (
                  <NavigationItem key={index} {...item} />
                ))}
              </div>
            </nav>

            <UserProfile
              name="Bob"
              handle="@bob-ito"
              location="London"
              joinDate="September 2011"
              stats={{ following: 569, followers: 72 }}
              techScore={25}
            />

            <Post
              author="Bob"
              handle="@bob-ito"
              timestamp="10m"
              content="Ethereum is the leading blockchain for decentralized applications, enabling smart contracts that run without downtime or third-party interference. As the foundation of Web3, it powers DeFi, NFTs, DAOs, and more, while transitioning to a sustainable future with Proof of Stake. It's the global computer for trustless innovation."
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/631e9413c7e5803edacf57daa012198911cc2465eb2fce2a1602491db6614bbd?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
            />
          </div>

          <div className="flex flex-col ml-5 w-[29%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-12 max-md:mt-10">
              <div className="overflow-hidden self-center px-16 py-6 max-w-full text-2xl text-white whitespace-nowrap bg-purple-600 rounded-[34px] w-[284px]">
                9aXc....8823
              </div>
              <div className="flex overflow-hidden flex-col mt-6 text-base text-gray-500 bg-white">
                {trendingItems.map((item, index) => (
                  <TrendingItem key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
