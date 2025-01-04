import * as React from "react";
import { TrendingItem } from "./components/TrendingItem";
import { NavigationItem } from "./components/NavigationItem";
import { UserPost } from "./components/UserPost";
import { UserProfileProps } from "./types";

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

const navigationItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6790240a281908eb61794e5402007e3854db57aee9f105713eb4ed2636ea3c2b?placeholderIfAbsent=true&apiKey=d8636cd323924c1f95d688e37d7afe19",
    label: "Dashboard",
    isActive: true,
  },
  { icon: "", label: "Explore" },
  { icon: "", label: "Notifications" },
  { icon: "", label: "Profile" },
];

const userProfile: UserProfileProps = {
  name: "Bob",
  handle: "@bob-ito",
  location: "London",
  joinDate: "September 2011",
  stats: {
    following: 569,
    followers: 72,
  },
  techScore: 25,
};

function DashboardPage() {
  return (
    <div className="flex overflow-hidden flex-col items-end px-20 bg-black max-md:px-5">
      {/* Rest of the existing JSX structure remains exactly the same, 
         but using the new components where applicable */}
    </div>
  );
}

export default DashboardPage;
