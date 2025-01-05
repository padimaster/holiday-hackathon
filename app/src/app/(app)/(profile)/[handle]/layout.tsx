// app/[handle]/layout.tsx
import { notFound } from "next/navigation";
import { getProfile } from "@/actions/profile";
import { UserProfile } from "@/components/profile/profile";
import NavTabs from "@/components/profile/nav-tabs";
import { Suspense } from "react";

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
  const profile = await getProfile(handle);

  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <Suspense fallback={<div>Loading profile...</div>}>
        {/* Profile Info Section */}
        <UserProfile profile={profile} />

        {/* Navigation Tabs */}
        <NavTabs handle={handle} />

        {/* Content Area */}
        <main className="max-w-2xl mx-auto px-4">
          <div className="divide-y divide-gray-800">
            <Suspense fallback={<div>Loading content...</div>}>
              {children}
            </Suspense>
          </div>
        </main>
      </Suspense>
    </div>
  );
}
