import {
  Profile,
  CompleteProfile,
  MinimalProfile,
  IProfileDB,
  IProfileQueryDto,
} from "@/backend/profiles";
import { ICreateProfileDto, IUpdateProfileDto } from "@/backend/profiles";
import { toMinimalProfile, toProfileResponse } from "./profile.lib";
import { connectDB } from "../database/connection";

const checkDuplicates = async (
  data: Pick<IProfileDB, "address" | "handle">,
  excludeId?: string
): Promise<boolean> => {
  const query = {
    $or: [{ address: data.address }, { handle: data.handle }],
    ...(excludeId && { _id: { $ne: excludeId } }),
  };

  return !!(await Profile.findOne(query).maxTimeMS(10000));
};
export const findByHandle = async (
  handle: string
): Promise<CompleteProfile | null> => {
  await connectDB();
  const profile = await Profile.findOne({ handle }).maxTimeMS(10000);

  if (!profile) {
    return null;
  }

  return toProfileResponse(profile);
};

export const findByAddress = async (
  address: string
): Promise<CompleteProfile | null> => {
  await connectDB();
  const profile = await Profile.findOne({ address }).maxTimeMS(10000);

  if (!profile) {
    return null;
  }

  return toProfileResponse(profile);
};

export const create = async (
  data: ICreateProfileDto
): Promise<CompleteProfile | null> => {
  await connectDB();
  const exists = await checkDuplicates({
    address: data.address,
    handle: data.handle,
  });

  if (exists) {
    return null;
  }

  const profile = await Profile.create({
    ...data,
    joinedDate: new Date().toISOString(),
    following: 0,
    followers: 0,
    techScore: 0,
  });

  return toProfileResponse(profile);
};

export const update = async (
  profileId: string,
  data: IUpdateProfileDto
): Promise<CompleteProfile | null> => {
  await connectDB();
  if (data.handle || data.address) {
    const exists = await checkDuplicates(
      {
        handle: data.handle || "",
        address: data.address || "",
      },
      profileId
    );

    if (exists) {
      return null;
    }
  }

  const profile = await Profile.findByIdAndUpdate(
    profileId,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!profile) {
    return null;
  }

  return toProfileResponse(profile);
};

export const query = async (
  params: IProfileQueryDto
): Promise<MinimalProfile[] | null> => {
  await connectDB();
  const filter: Record<string, unknown> = {
    ...(params.search && {
      $or: [
        { handle: new RegExp(params.search, "i") },
        { name: new RegExp(params.search, "i") },
      ],
    }),
    ...(params.address && { address: params.address }),
    ...(params.handle && { handle: params.handle }),
    ...(params.role && { role: params.role }),
    ...(params.organization && { organization: params.organization }),
  };

  const profiles = await Profile.find(filter, {
    _id: 1,
    handle: 1,
    name: 1,
    avatar: 1,
  })
    .maxTimeMS(5000)
    .limit(params.limit ?? 10)
    .skip(params.offset ?? 0)
    .sort({ techScore: -1 })
    .exec();

  return profiles.map(toMinimalProfile);
};

export const getMinimalProfile = async (
  param: string
): Promise<MinimalProfile | null> => {
  await connectDB();
  const profile = await Profile.findOne(
    {
      $or: [{ _id: param }, { handle: param }, { address: param }],
    },
    { _id: 1, handle: 1, name: 1, avatar: 1 }
  ).maxTimeMS(5000);

  if (!profile) {
    return null;
  }

  return toMinimalProfile(profile);
};
export const profileService = {
  findByHandle,
  findByAddress,
  create,
  update,
  query,
  getMinimalProfile,
} as const;
