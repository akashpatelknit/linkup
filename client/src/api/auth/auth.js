import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
	reducerPath: 'authApi',
	credentials: 'include',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1' }),
	endpoints: (builder) => ({
		getAllUsers: builder.query({
			query: () => ({
				url: `/users`,
				method: 'GET',
				credentials: 'include',
				withCredentials: true,
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
		logOutUser: builder.mutation({
			query: () => ({
				url: `/users/logout`,
				method: 'POST',
			}),
		}),
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
	}),
});

export const {
	useGetAllUsersQuery,
	useRegisterUserMutation,
	useLoginUserMutation,
	useLogOutUserMutation,
	useUpdateUserDetailMutation,
	useUpdateAvatarMutation,
	useUpdateCoverMutation,
} = authApi;
