export type PostImageViewModel = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type UploadedImageViewModel = {
  images: PostImageViewModel[];
};

export type PostUpdateRequest = {
  postId: number;
  description: string;
};

export type PostRequestData = {
  description: string;
  childrenMetadata: uploadId[] | undefined;
};

export type uploadId = {
  uploadId: string | undefined;
};

export type PublishedPostResponse = {
  id: number;
  userName: string;
  description: string;
  location: string | null;
  images: PostImageViewModel[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: UserName;
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: string[];
};

export type PostResponse = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: PublishedPostResponse[];
};

export type FeedPostsResponse = {
  pageSize: number;
  totalCount: number;
  page: number;
  pagesCount: number;
  nextCursor: number | null;
  prevCursor: number | null;
  items: PublishedPostResponse[];
};

export type UserName = {
  firstName: string;
  lastName: string;
};

export type PublicPostsResponse = {
  pageSize: number;
  totalCount: number;
  totalUsers: number;
  items: PublishedPostResponse[];
};

export type AvatarsType = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
};

export type UpdateLikeStatusRequest = {
  likeStatus: string;
  postId: number;
};

export type GetPostLikesArgs = {
  cursor?: number;
  pageNumber?: number;
  pageSize?: number;
  postId: number;
  search?: string;
};

export type GetPostLikesResponse = {
  isLiked: boolean;
  items: {
    avatars: AvatarsType[];
    createdAt: string;
    id: number;
    isFollowedBy: boolean;
    isFollowing: boolean;
    userId: number;
    userName: string;
  }[];
  notReadCount: number;
  pageSize: number;
  totalCount: number;
};
