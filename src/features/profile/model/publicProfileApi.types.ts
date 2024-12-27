export type PublicUserProfile = {
  id: number;
  userName: string;
  aboutMe: any;
  avatars: PublicUserProfileAvatar[];
  userMetadata: PublicUserMetadata;
};

type PublicUserProfileAvatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

type PublicUserMetadata = {
  following: number;
  followers: number;
  publications: number;
};
