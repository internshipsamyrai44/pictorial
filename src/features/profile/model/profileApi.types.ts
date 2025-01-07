export interface Avatar {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
}

export interface Profile {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  aboutMe?: string;
  avatars: Avatar[];
  city?: string;
  country?: string;
  region?: string;
  dateOfBirth?: string;
  createdAt: string;
}

export interface AvatarRequest {
  file: File;
}

export interface AvatarResponse {
  avatars: Avatar[];
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  aboutMe?: string;
  city?: string;
  country?: string;
  region?: string;
  userName: string;
  dateOfBirth?: Date;
}
