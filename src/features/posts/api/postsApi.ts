import { inctagramApi } from '@/app/services/inctagram.api';

type PostImageViewModel = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

type UploadedImageViewModel = {
  images: PostImageViewModel[];
};

type PostRequestData = {
  description: string;
  childrenMetadata: uploadId[];
};

type uploadId = {
  uploadId: string | undefined;
};

type PublishedPostResponse = {
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

type UserName = {
  firstName: string;
  lastName: string;
};

export const postsApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    uploadImages: build.mutation<UploadedImageViewModel, FormData>({
      query: (formData) => ({
        url: 'v1/posts/image',
        method: 'POST',
        body: formData
      })
    }),
    createPost: build.mutation<PublishedPostResponse, PostRequestData>({
      query: (postData) => ({
        url: 'v1/posts',
        method: 'POST',
        body: postData
      })
    })
  })
});

export const { useUploadImagesMutation, useCreatePostMutation } = postsApi;
