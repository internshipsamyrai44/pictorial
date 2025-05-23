import { inctagramApi } from '@/app/services/inctagram.api';
import {
  PostRequestData,
  PostResponse,
  PostUpdateRequest,
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
      }),
      invalidatesTags: ['Posts']
    }),
    createPost: build.mutation<PublishedPostResponse, PostRequestData>({
      query: (postData) => ({
        url: 'v1/posts',
        method: 'POST',
        body: postData
      }),
      invalidatesTags: ['Posts']
    }),
    updatePost: build.mutation<void, PostUpdateRequest>({
      query: (postData) => ({
        url: `v1/posts/${postData.postId}`,
        method: 'PUT',
        body: {
          description: postData.description
        }
      }),
      invalidatesTags: ['Posts']
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
      }),
      providesTags: ['Posts']
    }),
    getPostsById: build.query<PublishedPostResponse, number>({
      query: (postID) => ({
        url: `v1/posts/id/${postID}`,
        method: 'GET'
      }),
      providesTags: ['Posts']
    })
  })
});

export const {
  useUploadImagesMutation,
  useUpdatePostMutation,
  useCreatePostMutation,
  useGetPostsByUsernameQuery,
  useDeletePostMutation,
  useGetPostsByIdQuery
} = postsApi;
