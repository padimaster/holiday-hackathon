import { IProfile } from "@/db/models/profile";
import { ApiResponse } from "@/types/profile";
import axios from "axios";
import { BASE_API_URL } from "@/utils/constants";

const BASE_URL = `${BASE_API_URL}/api/profiles`;

export async function getProfileByAddress(address: string): Promise<IProfile> {
  const { data } = await axios.get<ApiResponse<IProfile[]>>(
    `${BASE_URL}?address=${address}`
  );

  if (!data.success) throw new Error(data.error);
  if (!data.data?.[0]) throw new Error("Profile not found");

  return data.data[0];
}

export async function getProfileByHandle(handle: string): Promise<IProfile> {
  const { data } = await axios.get<ApiResponse<IProfile[]>>(
    `${BASE_URL}?handle=${handle}`
  );

  if (!data.success) throw new Error(data.error);
  if (!data.data?.[0]) throw new Error("Profile not found");

  return data.data[0];
}

export async function createProfile(
  profileData: Partial<IProfile>
): Promise<IProfile> {
  const { data } = await axios.post<ApiResponse<IProfile>>(
    BASE_URL,
    profileData
  );

  if (!data.success) throw new Error(data.error);
  return data.data!;
}

export async function updateProfile(
  address: string,
  profileData: Partial<IProfile>
): Promise<IProfile> {
  const { data } = await axios.patch<ApiResponse<IProfile>>(
    `${BASE_URL}?address=${address}`,
    profileData
  );

  if (!data.success) throw new Error(data.error);
  return data.data!;
}

export const profileService = {
  getByAddress: getProfileByAddress,
  getByHandle: getProfileByHandle,
  create: createProfile,
  update: updateProfile,
} as const;
