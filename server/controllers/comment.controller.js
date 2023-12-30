import { Comment } from '../models/comment.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createComment = asyncHandler(async (req, res) => {
	const { content, postId } = req.body;

	if (!content || !postId)
		return res.status(400).json(new ApiError('Invalid data', 400));

	const comment = await Comment.create({
		content,
		user: req.user._id,
		post: postId,
	});

	if (!comment)
		return res.status(400).json(new ApiError('Comment not created', 400));

	return res
		.status(201)
		.json(new ApiResponse(200, comment, 'Comment created'));
});

export const getComments = asyncHandler(async (req, res) => {
	const { postId } = req.query;
	if (!postId) return res.status(400).json(new ApiError('Invalid data', 400));

	const comments = await Comment.find({ post: postId }).populate(
		'user',
		'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
	).sort({ createdAt: -1 });

	if (!comments)
		return res.status(400).json(new ApiError('Comments not found', 400));

	return res
		.status(200)
		.json(new ApiResponse(200, comments, 'Comments found'));
});
