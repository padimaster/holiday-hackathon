'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Compass, Bell, User, MoreHorizontal, Pill } from 'lucide-react';
import { useUsername } from '@/hooks/useUsername';
import { useSession } from 'next-auth/react';

export default function LeftSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const handle = session?.user?.profile?.handle;

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
      href: `/${handle}`,
    },
    {
      title: 'More',
      icon: MoreHorizontal,
      href: '/more',
    },
  ];

  const { createUsername } = useUsername();

  const handleButton = async () => {
    await createUsername();
  };

  return (
    <div className='sticky top-0 flex h-screen w-72 flex-col bg-black p-6'>
      {/* Logo */}
      <Link href='/dashboard' className='mb-8 flex items-center gap-2'>
        <Pill className='h-7 w-7 rotate-12 text-purple-500' />
        <span className='text-xl font-medium text-white'>Tech pills</span>
      </Link>

      {/* Navigation Items */}
      <nav className='space-y-1'>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors',
                isActive
                  ? 'bg-purple-600 font-medium text-white'
                  : 'text-gray-300 hover:bg-gray-900 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'h-6 w-6',
                  isActive ? 'text-white' : 'text-gray-300'
                )}
              />
              <span className='text-base'>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Drop Button */}
      <div className='mt-auto'>
        <Button
          className='w-full rounded-xl bg-purple-600 py-6 text-base font-medium text-white hover:bg-purple-700'
          size='lg'
          onClick={handleButton}
        >
          Drop
        </Button>
      </div>
    </div>
  );
}
