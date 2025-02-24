import { inctagramApi } from '@/app/services/inctagram.api';

type UploadImage = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

type UploadImageResponse = {
  images: UploadImage[];
};

export const postsApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: 'v1/posts/image',
        method: 'posts',
        body: formData
      })
    })
  })
});

export const { useCreatePostMutation } = postsApi;
