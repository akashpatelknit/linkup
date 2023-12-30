import { createSlice } from '@reduxjs/toolkit';
import { createComment, getComment, getM, sendM } from './mAct';

const mSlice = createSlice({
	name: 'mSlice',
	initialState: {
		message: [],
		loading: false,
		error: null,
		comments: [],
	},
	reducers: {
		addToMessage: (state, action) => {
			state.message.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getM.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getM.fulfilled, (state, action) => {
			state.loading = false;
			state.message = action.payload;
			state.error = null;
		});
		builder.addCase(getM.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(sendM.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(sendM.fulfilled, (state, action) => {
			state.loading = false;
			state.message.push(action.payload);
			state.error = null;
		});
		builder.addCase(sendM.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(createComment.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createComment.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
		});
		builder.addCase(createComment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(getComment.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getComment.fulfilled, (state, action) => {
			state.loading = false;
			state.comments = action.payload.data;
			state.error = null;
		});
		builder.addCase(getComment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export const { addToMessage } = mSlice.actions;
export default mSlice.reducer;
