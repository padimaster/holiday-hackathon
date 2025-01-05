import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { Profile } from "@/types/profile";
import { getProfileByAddress, getProfileByHandle, createProfile, updateProfile } from "@/services/profile.service";

export const PROFILE_QUERY_KEY = ["profile"] as const;

export function useProfile() {
  const { address } = useAccount();

  return useQuery({
    queryKey: [...PROFILE_QUERY_KEY, address],
    queryFn: () => address ? getProfileByAddress(address) : null,
    enabled: !!address,
  });
}

export function useProfileByHandle(handle: string) {
  return useQuery({
    queryKey: [...PROFILE_QUERY_KEY, 'handle', handle],
    queryFn: () => getProfileByHandle(handle),
    enabled: !!handle,
  });
}

export function useCreateProfile() {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  return useMutation({
    mutationFn: (profileData: Partial<Profile>) => {
      if (!address) throw new Error("No wallet connected");
      return createProfile({ ...profileData, address });
    },
    onSuccess: (data) => {
      queryClient.setQueryData([...PROFILE_QUERY_KEY, data.address], data);
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  return useMutation({
    mutationFn: (profileData: Partial<Profile>) => {
      if (!address) throw new Error("No wallet connected");
      return updateProfile(address, profileData);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([...PROFILE_QUERY_KEY, data.address], data);
    },
  });
}
