import { inctagramApi } from '@/app/services/inctagram.api';
import {
  AnswerRequest,
  AnswerResponse,
  AnswersRequest,
  AnswersResponse,
  CommentRequest,
  CommentResponse,
  CommentsRequest,
  CommentsResponse,
  GetPostLikesArgs,
  GetPostLikesResponse,
  PostRequestData,
  PostResponse,
  PostUpdateRequest,
  PublishedPostResponse,
  UpdateLikeStatusAnswerRequest,
  UpdateLikeStatusCommentRequest,
  UpdateLikeStatusRequest,
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
    }),
    createComment: build.mutation<CommentResponse, CommentRequest>({
      query: ({ postId, content }) => ({
        url: `v1/posts/${postId}/comments`,
        method: 'POST',
        body: {
          content
        }
      }),
      invalidatesTags: ['Posts', 'Comments']
    }),
    getComments: build.query<CommentsResponse, CommentsRequest>({
      query: ({ postId, ...args }) => ({
        url: `v1/posts/${postId}/comments`,
        method: 'GET',
        params: args
      }),
      providesTags: ['Posts', 'Comments']
    }),
    getAnswersToComment: build.query<AnswersResponse, AnswersRequest>({
      query: ({ postId, commentId, ...args }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/answers`,
        method: 'GET',
        params: args
      }),
      providesTags: ['Posts', 'Comments']
    }),
    createAnswerToComment: build.mutation<AnswerResponse, AnswerRequest>({
      query: ({ postId, commentId, content }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/answers`,
        method: 'POST',
        body: {
          content
        }
      }),
      invalidatesTags: ['Posts', 'Comments']
    }),
    updateLikeStatusComment: build.mutation<void, UpdateLikeStatusCommentRequest>({
      query: ({ postId, commentId, likeStatus }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/like-status`,
        method: 'PUT',
        body: {
          likeStatus
        }
      }),
      invalidatesTags: ['Posts', 'Comments']
    }),
    updateLikeStatusAnswer: build.mutation<void, UpdateLikeStatusAnswerRequest>({
      query: ({ postId, commentId, likeStatus, answerId }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
        method: 'PUT',
        body: {
          likeStatus: likeStatus
        }
      }),
      invalidatesTags: ['Posts', 'Comments']
    })
  })
});

export const {
  useUploadImagesMutation,
  useUpdatePostMutation,
  useCreatePostMutation,
  useGetPostsByUsernameQuery,
  useDeletePostMutation,
  useGetPostsByIdQuery,
  useGetPostLikesQuery,
  useUpdateLikeStatusPostMutation,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useCreateAnswerToCommentMutation,
  useGetAnswersToCommentQuery,
  useUpdateLikeStatusCommentMutation,
  useUpdateLikeStatusAnswerMutation
} = postsApi;
