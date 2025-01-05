import { Profile } from '@/types/profile'
import { mockProfiles } from '@/lib/mock/profiles'

export const getProfile = async (handle: string): Promise<Profile | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const profile = mockProfiles[handle]
  if (!profile) return null

  return profile
}