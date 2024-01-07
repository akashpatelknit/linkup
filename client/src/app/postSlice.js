import { createSlice } from '@reduxjs/toolkit';
import {
	createPost,
	getAllPost,
	getOverAllPost,
	likeAndUnlikePost,
} from './postAction';

const userAndPosts = (payload) => {
	const { fullname, avatar, posts, _id } = payload.data;
	return {
		_id,
		fullname,
		avatar,
		posts,
	};
};

const postSlice = createSlice({
	name: 'postSlice',
	initialState: {
		loading: false,
		error: null,
		allPosts: [],
		overAllPosts: [],
	},
	reducers: {
		updateOverAllLikes: (state, action) => {
			let index = state.overAllPosts.findIndex(
				(post) => post._id === action.payload.postId
			);
			let isPostLiked = state.overAllPosts[index].likes?.findIndex(
				(like) => like._id === action.payload.data.data._id
			);
			// console.log(action.payload.data.data, index);
			if (isPostLiked !== -1) {
				state.overAllPosts[index].likes.splice(index, 1);
			} else {
				state.overAllPosts[index].likes?.push(action.payload.data.data);
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllPost.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getAllPost.fulfilled, (state, action) => {
			state.loading = false;
			state.allPosts = action.payload.data;
		});
		builder.addCase(getAllPost.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(createPost.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createPost.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(createPost.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(likeAndUnlikePost.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(likeAndUnlikePost.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(likeAndUnlikePost.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(getOverAllPost.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getOverAllPost.fulfilled, (state, action) => {
			state.loading = false;
			state.overAllPosts = action.payload.data;
		});
		builder.addCase(getOverAllPost.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export const { updateOverAllLikes } = postSlice.actions;
export default postSlice.reducer;
