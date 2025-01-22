export type Avatar = {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
};

export type ProfileBase = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  aboutMe?: string;
  city?: string;
  country?: string;
  region?: string;
  dateOfBirth?: string;
  createdAt: string;
};

export type Profile = ProfileBase & {
  avatars: Avatar[];
};

export type AvatarRequest = {
  file: File;
};

export type AvatarResponse = {
  avatars: Avatar[];
};

export type UserProfileResponse = ProfileBase & {
  followersCount: number;
  followingCount: number;
  publicationsCount: number;
  isFollowedBy: boolean;
  isFollowing: boolean;
  avatars: Avatar[];
};
