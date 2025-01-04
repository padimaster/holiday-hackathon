import * as React from "react";
import { TrendingItem } from "./components/TrendingItem";
import { NavigationItem } from "./components/NavigationItem";
import { SocialPost } from "./components/SocialPost";

const navigationItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/95f61caad1126bc4127442b537dd90c16552d8a67a54630416315ca943af9950?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    label: "Dashboard",
    isActive: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b6065c96f5b3ff1acb62a5e1b98fe7df54d4a0668853deed73bf6498d2d9f85?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    label: "Explore",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/75f786d541d1a2e66318be287d5f1aae2ef572aeb8e53cd08d7f2c42f35849ef?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    label: "Notifications",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac8299c3ba1b38fe26c929621d3b04e98230cbf67de9961a407fec48c973e351?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    label: "Profile",
  },
];

const trendingItems = [
  {
    category: "Trending in Web3",
    hashtag: "#web3",
    subtitle: "Trending with Lens",
    showMoreIcon: true,
  },
  {
    category: "Trending in AI",
    hashtag: "#aitutors",
    subtitle: "9,042 pills",
    promotedBy: "xxx",
    showMoreIcon: true,
  },
];

const posts = [
  {
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7fb49d5168fa14a1a4cf95f73b5b78fb270eb7b6da1f8e90e121b06c9bba15f6?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    username: "Alice",
    handle: "@alice",
    timestamp: "6sn",
    isVerified: true,
    content:
      "The new Lens Network is a blockchain designed to power decentralized social applications...",
    metrics: {
      replies: 0,
      reposts: 998,
      likes: 999,
      views: 0,
    },
    media: {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/51dbbe68b3c98c5ca6f9fd32eaf736262012b9522f0cd06975d86f2b2b43589a?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
      title: "Social is financial with Lens",
      description:
        "Lens is the fastest, lowest-cost Ethereum network powering social and finance",
      url: "lens.xyz",
    },
  },
  {
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6d06f61d0369151826ea96e09430ba4aa403a9787268cebba3bdb38bde22f97a?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    username: "Ethereum",
    handle: "@ethereum",
    timestamp: "10m",
    isVerified: true,
    content:
      "Ethereum is the leading blockchain for decentralized applications...",
    metrics: {
      replies: 0,
      reposts: 0,
      likes: 0,
      views: 0,
    },
    media: {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d43e1316ff2dd89929021bba1a32f9b3ecc7db3f4203a0d97780a795e61aaf51?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    },
  },
];

export function SocialFeed() {
  return (
    <div className="flex overflow-hidden flex-col items-center px-20 pt-8 bg-black max-md:px-5">
      <div className="flex flex-col items-center pt-4 pr-6 pl-px w-full bg-black max-w-[1266px] max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col items-center -mt-9 max-w-full text-base text-gray-500 w-[599px]">
          <div className="flex overflow-hidden gap-2.5 px-2.5 py-2 max-w-full bg-zinc-900 rounded-[40px] w-[350px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f69f2dbd943c54741ffd149715a63ac8575a76eed02df5ba7dfc9424d6cd45f?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
              alt="Search icon"
              className="object-contain shrink-0 w-6 aspect-square"
            />
            <label htmlFor="searchInput" className="sr-only">
              Search
            </label>
            <input
              id="searchInput"
              type="search"
              placeholder="Search"
              className="flex-auto my-auto w-[291px] bg-transparent border-none focus:outline-none text-white"
            />
          </div>
        </div>

        <nav className="flex z-10 flex-col self-start pt-2 mt-0 max-w-full font-bold text-white w-[209px]">
          <div className="z-10 self-center mt-2 text-2xl">Tech pills</div>
          <div className="flex flex-col items-start mt-0 w-full text-xl whitespace-nowrap">
            {navigationItems.map((item, index) => (
              <NavigationItem key={index} {...item} />
            ))}
          </div>
        </nav>

        <div className="flex z-10 flex-col self-end mt-0 max-w-full w-[970px]">
          <div className="flex z-10 gap-5 self-end">
            <div className="flex shrink-0 w-px bg-zinc-800 h-[898px]" />
            <div className="flex flex-col grow shrink-0 self-start mt-4 basis-0 w-fit">
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

          <div className="flex flex-col mt-0 max-w-full w-[600px]">
            <div className="flex flex-col items-center max-md:max-w-full">
              <div className="flex overflow-hidden flex-col items-start bg-black max-md:max-w-full">
                <div className="w-full p-4">
                  <div className="text-xl text-white mb-4">
                    What's happening?
                  </div>
                  <div className="flex gap-2 text-sm text-purple-600">
                    <button className="flex items-center gap-2 bg-purple-600 bg-opacity-30 rounded-full px-3 py-1">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ae1c79f731aa1290a6e4e68063518e16fd2e4677532a407a6208187322b91c2?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19"
                        alt=""
                        className="w-4 h-4"
                      />
                      <span>Everyone can reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center w-full">
              {posts.map((post, index) => (
                <SocialPost key={index} {...post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
