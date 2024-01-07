import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
	reducerPath: 'authApi',
	credentials: 'include',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
	endpoints: (builder) => ({
		updateUserDetail: builder.mutation({
			query: (body) => ({
				url: `/update/updateDetails`,
				method: 'POST',
				credentials: 'include',
				withCredentials: true,
				body,
			}),
		}),
		updateAvatar: builder.mutation({
			query: (body) => ({
				url: `/update/updateProfile`,
				method: 'POST',
				credentials: 'include',
				withCredentials: true,
				body,
			}),
		}),
		updateCover: builder.mutation({
			query: (body) => ({
				url: `/update/updateCover`,
				method: 'POST',
				credentials: 'include',
				withCredentials: true,
				body,
			}),
		}),

		// comments
		createComment: builder.mutation({
			query: (body) => ({
				url: `/comment`,
				method: 'POST',
				credentials: 'include',
				withCredentials: true,
				body,
			}),
		}),
		getComment: builder.query({
			query: (body) => ({
				url: `/comment`,
				method: 'GET',
				credentials: 'include',
				withCredentials: true,
				params: body,
			}),
		}),
		registerUser: builder.mutation({
			query: (body) => ({
				url: `/users/register`,
				method: 'POST',
				credentials: 'include',
				withCredentials: true,
				body,
			}),
		}),
		loginUser: builder.mutation({
			query: (body) => ({
				url: `/users/login`,
				method: 'POST',
				credentials: 'include',
				withCredentials: true,
				body,
			}),
		}),

		//like and unlike post
		likePost: builder.mutation({
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
	useGetAllUsersQuery,
	useUpdateUserDetailMutation,
	useUpdateAvatarMutation,
	useUpdateCoverMutation,
	useCreateCommentMutation,
	useGetCommentQuery,
	useRegisterUserMutation,
	useLoginUserMutation,
	useLikePostMutation,
} = authApi;
