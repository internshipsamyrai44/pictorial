export type PublicUserProfileByIdResponse = {
  aboutMe: string;
  avatars: PublicUserProfileAvatar[];
  id: number;
  userName: string;
  userMetadata: PublicUserMetadata;
};

type PublicUserProfileAvatar = {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
};

type PublicUserMetadata = {
  following: number;
  followers: number;
  publications: number;
};
