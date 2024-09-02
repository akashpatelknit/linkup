import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
	reducerPath: 'postApi',
	credentials: 'include',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
	endpoints: (builder) => ({
		createPost: builder.mutation({
			query: (body) => ({
				url: `/post/createPost`,
				method: 'POST',
				credentials: 'include',
				withCredentials: true,
				body,
			}),
		}),
		getAllPost: builder.query({
			query: (body) => ({
				url: `/post/allPosts/${body.userId}`,
				method: 'GET',
				credentials: 'include',
				withCredentials: true,
			}),
		}),
		getOverAllPost: builder.query({
			query: (body) => ({
				url: `/post/overallPosts`,
				method: 'GET',
				credentials: 'include',
				withCredentials: true,
			}),
		}),
		likeAndUnlikePost: builder.mutation({
			query: (body) => ({
				url: `/post/likeAndUnlike`,
				method: 'POST',
				credentials: 'include',
				withCredentials: true,
				body,
			}),
		}),
	}),
});

export const {
	useCreatePostMutation,
	useGetAllPostQuery,
	useGetOverAllPostQuery,
	useLikeAndUnlikePostMutation,
} = postApi;
