"use client";

import TrendingItems from "./trending-items";
import { ConnectButton } from "@/components/common/connect-button";

export default function RightSidebar() {
  return (
    <div className="fixed right-0 w-80 h-screen bg-black border-l border-gray-800 p-4">
      <header className="flex justify-center items-center py-4 px-8">
        <ConnectButton/>
      </header>

      {/* Trending Section */}
      <TrendingItems />
    </div>
  );
}
