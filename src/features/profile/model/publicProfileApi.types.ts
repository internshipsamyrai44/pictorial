export type PublicUserProfileByIdResponse = {
  aboutMe: string;
  avatars: Avatars[];
  id: number;
  userName: string;
};

type Avatars = {
  createdAt: Date;
  fileSize: number;
  height: number;
  url: string;
  width: number;
};
