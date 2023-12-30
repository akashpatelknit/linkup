import mongoose, { Schema } from 'mongoose';

const PostSchema = new mongoose.Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		desc: {
			type: String,
			trim: true,
			max: 500,
		},
		img: {
			type: String,
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		], 
	},
	{ timestamps: true }
);

export const Post = mongoose.model('Post', PostSchema);
