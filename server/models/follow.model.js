import mongoose, { Schema } from 'mongoose';

const followSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		followingUserId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

export const Following = mongoose.model('Following', followSchema);
