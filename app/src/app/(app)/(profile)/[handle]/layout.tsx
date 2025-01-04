// app/[handle]/layout.tsx
import Link from "next/link";
//import { UserProfile } from "./components/user-profile";
import { notFound } from "next/navigation";
import { getProfile } from "@/actions/profile";

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
  const profile = await getProfile(params.handle);

  if (!profile) {
    notFound();
  }

  return (
    <div>
      {/* Profile Info Section 
      <UserProfile profile={profile} />
      */}

      {/* Navigation Tabs */}
      <nav className="border-b border-gray-800">
        <div className="flex items-center">
          <TabLink href={`/${params.handle}`}>Pills</TabLink>
          <TabLink href={`/${params.handle}/paths`}>Paths</TabLink>
          <TabLink href={`/${params.handle}/feeds`}>Feeds</TabLink>
          <TabLink href={`/${params.handle}/tips`}>Tips</TabLink>
        </div>
      </nav>

      {/* Content Area */}
      <div className="divide-y divide-gray-800">{children}</div>
    </div>
  );
}

function TabLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex-1 px-6 py-4 text-center text-gray-500 hover:bg-gray-900/50 hover:text-gray-300 transition-colors [&.active]:text-purple-500 [&.active]:border-b-2 [&.active]:border-purple-500"
    >
      {children}
    </Link>
  );
}
