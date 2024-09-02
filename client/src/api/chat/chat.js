import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
	reducerPath: 'chatApi',
	credentials: 'include',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
	endpoints: (builder) => ({
		// comments
		createChat: builder.mutation({
			query: (body) => ({
				url: `/chat`,
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
	}),
});

export const { useCreateChatMutation, useGetCommentQuery } = chatApi;
