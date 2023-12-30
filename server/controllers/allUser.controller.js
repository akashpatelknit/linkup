import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Following } from '../models/follow.model.js';
import { Follower } from '../models/follower.model.js';

const getAllUsers = asyncHandler(async (req, res) => {
	let friends = await Following.aggregate([
		{
			$match: {
				userId: req.user._id,
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: 'followingUserId',
				foreignField: '_id',
				as: 'following',
			},
		},
		{
			$project: {
				_id: 0,
				'following._id': 1,
				'following.username': 1,
				'following.fullname': 1,
				'following.bio': 1,
				'following.avatar': 1,
				'following.coverImage': 1,
			},
		},
	]);

	if (!friends) {
		throw new ApiError(404, 'No friends found');
	}
	friends = friends?.map((friend) => friend.following[0]);
	friends = friends.map((item) => (item ? item._id : null)).filter(Boolean);

	let users = await User.aggregate([
		{
			$match: {
				_id: { $nin: friends, $ne: req.user._id },
			},
		},
		{
			$project: {
				_id: 1,
				username: 1,
				fullname: 1,
				bio: 1,
				avatar: 1,
				coverImage: 1,
			},
		},
		{
			$limit: 10,
		},
	]);

	res.status(200).json(new ApiResponse(200, users, 'success'));
});

export { getAllUsers };
