import { inctagramApi } from '@/app/services/inctagram.api';
import {
  GetPostLikesArgs,
  GetPostLikesResponse,
  PostRequestData,
  PostResponse,
  PostUpdateRequest,
  PublishedPostResponse,
  UpdateLikeStatusRequest,
  UploadedImageViewModel,
  FeedPostsResponse
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
    }),
    getFeedPosts: build.query<FeedPostsResponse, { endCursorPostId?: number; pageSize?: number; pageNumber?: number }>({
      query: (params) => ({
        url: 'v1/home/publications-followers',
        method: 'GET',
        params
      }),
      providesTags: ['Posts']
    }),
    getPostLikes: build.query<GetPostLikesResponse, GetPostLikesArgs>({
      query: ({ postId, ...args }) => ({
        url: `v1/posts/${postId}/likes`,
        method: 'GET',
        params: args
      }),
      providesTags: ['LikesInfo', 'LikeInteractions']
    }),
    updateLikeStatusPost: build.mutation<void, UpdateLikeStatusRequest>({
      query: (postData) => ({
        url: `v1/posts/${postData.postId}/like-status`,
        method: 'PUT',
        body: {
          likeStatus: postData.likeStatus
        }
      }),
      invalidatesTags: ['Posts', 'LikesInfo', 'LikeInteractions']
    })
  })
});

export const {
  useUploadImagesMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostsByUsernameQuery,
  useGetPostsByIdQuery,
  useGetFeedPostsQuery,
  useGetPostLikesQuery,
  useUpdateLikeStatusPostMutation
} = postsApi;
