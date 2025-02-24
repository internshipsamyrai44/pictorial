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

export const postsApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<UploadedImageViewModel, FormData>({
      query: (formData) => ({
        url: 'v1/posts/image',
        method: 'POST',
        body: formData
      })
    })
  })
});

export const { useCreatePostMutation } = postsApi;
