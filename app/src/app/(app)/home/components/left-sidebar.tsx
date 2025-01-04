"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Compass, 
  Bell, 
  User, 
  MoreHorizontal,
  Pill
} from 'lucide-react';

export default function LeftSidebar() {
  const pathname = usePathname();
  
  const navItems = [
    {
      title: 'Home',
      icon: Home,
      href: '/home',
    },
    {
      title: 'Explore',
      icon: Compass,
      href: '/explore',
    },
    {
      title: 'Notifications',
      icon: Bell,
      href: '/notifications',
    },
    {
      title: 'Profile',
      icon: User,
      href: '/profile',
    },
    {
      title: 'More',
      icon: MoreHorizontal,
      href: '/more',
    },
  ];

  return (
    <div className="sticky top-0 flex flex-col h-screen w-72 bg-black p-6">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 mb-8">
        <Pill className="h-7 w-7 text-purple-500 rotate-12" />
        <span className="text-white text-xl font-medium">Tech pills</span>
      </Link>

      {/* Navigation Items */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive 
                  ? 'bg-purple-600 text-white font-medium'
                  : 'text-gray-300 hover:text-white hover:bg-gray-900'
              )}
            >
              <item.icon className={cn(
                "h-6 w-6",
                isActive ? "text-white" : "text-gray-300"
              )} />
              <span className="text-base">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Drop Button */}
      <div className="mt-auto">
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-base font-medium rounded-xl"
          size="lg"
        >
          Drop
        </Button>
      </div>
    </div>
  );
}