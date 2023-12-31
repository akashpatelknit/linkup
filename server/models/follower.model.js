import mongoose, { Schema } from 'mongoose';

const followerSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		followerUserId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

export const Follower = mongoose.model('Follower', followerSchema);
