import { inctagramApi } from '@/app/services/inctagram.api';
import {
  PostRequestData,
  PostResponse,
  PublishedPostResponse,
  UploadedImageViewModel
} from '@/features/posts/model/postsApi.types';

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
    }),
    deletePost: build.mutation<void, number>({
      query: (postId: number) => ({
        url: `v1/posts/${postId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Posts']
    }),
    getPostsByUsername: build.query<PostResponse, string>({
      query: (userName) => ({
        url: `v1/posts/${userName}`,
        method: 'GET'
      })
    })
  })
});

export const { useUploadImagesMutation, useCreatePostMutation, useGetPostsByUsernameQuery, useDeletePostMutation } =
  postsApi;
