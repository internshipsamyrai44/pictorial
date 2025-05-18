export type PublicUserProfileByIdResponse = {
  id: number;
  userName: string;
  aboutMe: any;
  avatars: PublicUserProfileAvatar[];
  userMetadata: PublicUserMetadata;
  hasPaymentSubscription: boolean;
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
