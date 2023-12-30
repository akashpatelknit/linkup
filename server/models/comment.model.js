import mongoose, { Schema } from 'mongoose';
import aggrigatePaginate from 'mongoose-aggregate-paginate-v2';
const commentSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
		},
	},
	{
		timestamps: true,
	}
);
commentSchema.plugin(aggrigatePaginate);
export const Comment = mongoose.model('Comment', commentSchema);
