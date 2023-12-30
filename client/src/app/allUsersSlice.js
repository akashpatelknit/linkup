import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from './allUsersAction';

const allUserSlice = createSlice({
	name: 'allUserSlice',
	initialState: {
		loading: false,
		error: null,
	},

	extraReducers: (builder) => {
		builder.addCase(getAllUsers.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getAllUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.allUser = action.payload;
		});
		builder.addCase(getAllUsers.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		// builder.addCase(createPost.pending, (state) => {
		// 	state.loading = true;
		// });
		// builder.addCase(createPost.fulfilled, (state) => {
		// 	state.loading = false;
		// });
		// builder.addCase(createPost.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.error = action.payload;
		// });
		// builder.addCase(likeAndUnlikePost.pending, (state) => {
		// 	state.loading = true;
		// });
		// builder.addCase(likeAndUnlikePost.fulfilled, (state) => {
		// 	state.loading = false;
		// });
		// builder.addCase(likeAndUnlikePost.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.error = action.payload;
		// });
	},
});

export default allUserSlice.reducer;
