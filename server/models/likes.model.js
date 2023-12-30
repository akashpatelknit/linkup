import mongoose from 'mongoose';

const likesSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
		},
	},
	{ timestamps: true }
);

export const Likes = mongoose.model('Likes', likesSchema);
