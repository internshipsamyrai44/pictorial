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

export type ProfileFormValues = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region: string;
  dateOfBirth: string;
  aboutMe: string;
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

export type UserFollower = {
  id: number;
  userId: number;
  userName: string;
  createdAt: string;
  avatars: Avatar[];
  isFollowing: boolean;
  isFollowedBy: boolean;
};

export type UserFollowing = {
  id: number;
  userId: number;
  userName: string;
  createdAt: string;
  avatars: Avatar[];
  isFollowing: boolean;
  isFollowedBy: boolean;
};

export type PaginatedResponse<T> = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  prevCursor: number | null;
  nextCursor: number | null;
  items: T[];
};

export type FollowersResponse = PaginatedResponse<UserFollower>;
export type FollowingResponse = PaginatedResponse<UserFollowing>;
