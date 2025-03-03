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
  location: string;
  images: PostImageViewModel[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: UserName;
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};

export type PostResponse = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: PublishedPostResponse[];
};

export type UserName = {
  firstName: string;
  lastName: string;
};
