import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import postSlice from './postSlice';
import chatSlice from './chatSlice';
import mSlice from './mSlice';
import allUsersSlice from './allUsersSlice';
import { authApi } from '../api/auth/auth';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		user: userSlice,
		posts: postSlice,
		allUser:allUsersSlice ,
		chat: chatSlice,
		message: mSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
