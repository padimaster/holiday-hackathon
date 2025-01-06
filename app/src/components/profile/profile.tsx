"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Brain,
  GraduationCap,
  Flame,
  Trophy,
  MapPin,
  Calendar,
  Star,
  Zap,
  Edit2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CompleteProfile } from "@/backend/profiles";

interface UserProfileProps {
  profile: CompleteProfile;
  isOwner?: boolean;
}

export function UserProfile({ profile, isOwner = false }: UserProfileProps) {
  const stats = {
    techScore: 10,
    learningLevel: 3,
    streak: 7,
    activePills: 3,
    completedPills: 12,
  };

  return (
    <div className="relative p-6 bg-gray-900/30 rounded-xl backdrop-blur-sm">
      <div className="flex gap-6">
        {/* Profile Stats Circle */}
        <div className="relative w-32 flex flex-col justify-between">
          {/* Outer Circle */}
          <div className="relative aspect-square">
            {/* Main circle with avatar */}
            <div className="w-32 h-32 rounded-full border border-gray-700/50 relative">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={128}
                height={128}
                className="rounded-full object-cover"
                priority
              />
            </div>

            {/* Tech Score at Top */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute -top-2 -right-2 bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center border-4 border-gray-900 cursor-help">
                    <span className="text-white font-bold text-xl">
                      {stats.techScore}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">
                    Tech Score: {stats.techScore}
                  </p>
                  <p className="text-sm text-gray-400">
                    Overall learning achievement
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Stats at Bottom */}
          <div className="flex flex-col gap-2 justify-center items-center">
            {/* Top Row */}
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-blue-500 rounded-full p-2 relative cursor-help">
                      <GraduationCap className="w-5 h-5 text-white" />
                      <span className="absolute -top-1 -right-1 bg-gray-900 rounded-full text-xs w-5 h-5 flex items-center justify-center text-blue-500 font-bold">
                        {stats.learningLevel}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">
                      Learning Level {stats.learningLevel}
                    </p>
                    <p className="text-sm text-gray-400">
                      Keep learning to level up!
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-purple-500 rounded-full p-2 relative cursor-help">
                      <Brain className="w-5 h-5 text-white" />
                      <span className="absolute -top-1 -right-1 bg-gray-900 rounded-full text-xs w-5 h-5 flex items-center justify-center text-purple-500 font-bold">
                        {stats.activePills}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">
                      {stats.activePills} Active Pills
                    </p>
                    <p className="text-sm text-gray-400">Currently learning</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Bottom Row */}
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-amber-500 rounded-full p-2 relative cursor-help">
                      <Flame className="w-5 h-5 text-white" />
                      <span className="absolute -top-1 -right-1 bg-gray-900 rounded-full text-xs w-5 h-5 flex items-center justify-center text-amber-500 font-bold">
                        {stats.streak}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{stats.streak} Day Streak!</p>
                    <p className="text-sm text-gray-400">
                      Keep the momentum going
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-amber-500 rounded-full p-2 relative cursor-help">
                      <Trophy className="w-5 h-5 text-white" />
                      <span className="absolute -top-1 -right-1 bg-gray-900 rounded-full text-xs w-5 h-5 flex items-center justify-center text-amber-500 font-bold">
                        {stats.completedPills}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">
                      {stats.completedPills} Completed Pills
                    </p>
                    <p className="text-sm text-gray-400">Knowledge gained</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 pt-2">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                {profile.name}
                <Star className="w-5 h-5 text-amber-400" />
              </h1>
              <p className="text-gray-400">@{profile.handle}</p>
            </div>

            {isOwner ? (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit Profile
              </Button>
            ) : (
              <Button
                size="sm"
                className="rounded-full bg-purple-500 hover:bg-purple-600 text-white"
              >
                <Zap className="w-4 h-4 mr-1" />
                Start Learning
              </Button>
            )}
          </div>

          <p className="text-gray-200 mt-2">{profile.role}</p>
          <p className="text-gray-300 mt-2 line-clamp-2">{profile.bio}</p>

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined {profile.joinedDate}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div>
              <span className="text-white font-bold">{profile.stats.following}</span>
              <span className="text-gray-400 ml-1">Following</span>
            </div>
            <div>
              <span className="text-white font-bold">{profile.stats.followers}</span>
              <span className="text-gray-400 ml-1">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
