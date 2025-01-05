import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
      <p className="text-gray-400 mb-8">
        The profile you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
