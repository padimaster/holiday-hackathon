'use client'
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Home() {
  useAuthGuard();
  return <main className="flex items-center min-h-screen"></main>;
}
