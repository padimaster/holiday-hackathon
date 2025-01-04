import React from 'react';
import Link from 'next/link';
import { Home, Compass, Bell, User, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 h-[calc(100vh-4rem)] w-64">
      <div className="space-y-4 py-4">
        {/* Logo */}
        <div className="px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded"></div>
            <h2 className="text-lg font-semibold">Tech pills</h2>
          </div>
        </div>
        <Separator />
        
        {/* Navigation */}
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start gap-4 bg-accent"
            >
              <Link href="/dashboard">
                <Home className="h-5 w-5 text-purple-500" />
                <span>Dashboard</span>
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start gap-4"
            >
              <Link href="/explore">
                <Compass className="h-5 w-5" />
                <span>Explore</span>
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start gap-4"
            >
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start gap-4"
            >
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start gap-4"
            >
              <Link href="/more">
                <MoreHorizontal className="h-5 w-5" />
                <span>More</span>
              </Link>
            </Button>
          </div>
        </ScrollArea>
        
        {/* Drop Button */}
        <div className="px-4 py-2">
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Drop
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;