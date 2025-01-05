"use client"

import RightSidebar from "@/components/layout/right-sidebar";
import LeftSidebar from "@/components/layout/left-sidebar";
import SearchBar from "@/components/layout/search-bar";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthGuard();
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex relative">
        {/* Left Sidebar - Fixed */}
        <div className="fixed left-0 h-screen w-72">
          <LeftSidebar />
        </div>

        {/* Right Sidebar - Fixed */}
        <div className="fixed right-0 h-screen w-80">
          <RightSidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen ml-72 mr-80 border-x border-gray-800">
          <header className="sticky top-0 z-10 backdrop-blur-xl bg-black/70 border-b border-gray-800">
            <div className="flex items-center px-4 h-16">
              <div className="flex-1 max-w-2xl mx-auto relative">
                <SearchBar />
              </div>
            </div>
          </header>

          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}