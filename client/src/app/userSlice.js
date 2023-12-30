import { createSlice } from '@reduxjs/toolkit';
import {
	followUser,
	getFriendsList,
	loadSpecificUSer,
	loadUser,
	loginUser,
} from './userAction';

const userSlice = createSlice({
	name: 'userSlice',
	initialState: {
		loading: false,
		error: null,
		isAuthenticated: false,
	},

	extraReducers: (builder) => {
		builder.addCase(loadUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loadUser.fulfilled, (state, action) => {
			state.loading = false;
			state.userInfo = action.payload.data[0];
			state.isAuthenticated = true;
		});
		builder.addCase(loadUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
			state.isAuthenticated = true;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(followUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(followUser.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(followUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		
		builder.addCase(loadSpecificUSer.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loadSpecificUSer.fulfilled, (state, action) => {
			state.loading = false;
			state.spacificUser = action.payload.data;
		});
		builder.addCase(loadSpecificUSer.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		// friends List
		builder.addCase(getFriendsList.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getFriendsList.fulfilled, (state, action) => {
			state.loading = false;
			state.friends = action.payload.data;
		});
		builder.addCase(getFriendsList.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default userSlice.reducer;
