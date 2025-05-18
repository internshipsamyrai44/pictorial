export type UserAvatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

export type UserItem = {
  id: 0;
  userName: string;
  firstName: string;
  lastName: string;
  avatars: UserAvatar[];
  createdAt: string;
  user?: UserItem;
};

export type SearchUserResponse = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  prevCursor: number;
  nextCursor: number;
  items: UserItem[];
};

export type GetUserByUsernameParams = {
  userName: string;
  pageSize?: number;
  pageNumber?: number;
  cursor?: number;
};

export type FollowRequest = {
  selectedUserId: number;
};

export type UserResponse = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region: string;
  dateOfBirth: string;
  aboutMe: string;
  avatars: UserAvatar[];
  isFollowing: boolean;
  isFollowedBy: boolean;
  followingCount: number;
  followersCount: number;
  publicationsCount: number;
};
