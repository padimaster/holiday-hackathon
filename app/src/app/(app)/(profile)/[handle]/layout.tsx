import { UserProfile } from '@/components/profile/profile';
import NavTabs from '@/components/profile/nav-tabs';
import { Suspense } from 'react';
import { findByHandle } from '@/services/profile.service';

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: {
    handle: string;
  };
}

export default async function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  const { handle } = await params;
  const profile = await findByHandle(handle);
  console.log(profile);

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900'>
      <Suspense fallback={<div>Loading profile...</div>}>
        {/* Profile Info Section */}
        <UserProfile profile={profile} />

        {/* Navigation Tabs */}
        <NavTabs handle={handle} />

        {/* Content Area */}
        <main className='mx-auto max-w-2xl px-4'>
          <div className='divide-y divide-gray-800'>
            <Suspense fallback={<div>Loading content...</div>}>
              {children}
            </Suspense>
          </div>
        </main>
      </Suspense>
    </div>
  );
}
