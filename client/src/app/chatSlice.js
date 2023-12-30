import { createSlice } from '@reduxjs/toolkit';
import {
	addMemberToGroup,
	createGroup,
	fetchChat,
	getChat,
	getSearchedUser,
	renameGroup,
} from './chatAction';

const chatSlice = createSlice({
	name: 'chatSlice',
	initialState: {
		searchedUsers: [],
		loading: false,
		error: null,
	},

	extraReducers: (builder) => {
		builder.addCase(getSearchedUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getSearchedUser.fulfilled, (state, action) => {
			state.loading = false;
			state.searchedUsers = action.payload.data;
		});
		builder.addCase(getSearchedUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(getChat.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getChat.fulfilled, (state, action) => {
			state.loading = false;
			state.chats = action.payload;
		});
		builder.addCase(getChat.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(fetchChat.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchChat.fulfilled, (state, action) => {
			state.loading = false;
			state.chatsss = action.payload;
		});
		builder.addCase(fetchChat.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(createGroup.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createGroup.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(createGroup.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(addMemberToGroup.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(addMemberToGroup.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(addMemberToGroup.rejected, (state, action) => {
			state.loading = false;
			console.log(action.payload);
			state.error = action.payload;
		});

		builder.addCase(renameGroup.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(renameGroup.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(renameGroup.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default chatSlice.reducer;
