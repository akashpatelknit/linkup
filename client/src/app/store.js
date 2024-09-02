import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import postSlice from './postSlice';
import chatSlice from './chatSlice';
import mSlice from './mSlice';
import allUsersSlice from './allUsersSlice';
import { authApi } from '../api/auth/auth';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postApi } from '../api/post/post';
import { chatApi } from '../api/chat/chat';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[postApi.reducerPath]: postApi.reducer,
		[chatApi.reducerPath]: chatApi.reducer,
		user: userSlice,
		posts: postSlice,
		allUser: allUsersSlice,
		chat: chatSlice,
		message: mSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(postApi.middleware)
			.concat(chatApi.middleware),
});

setupListeners(store.dispatch);
