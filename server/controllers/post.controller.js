import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { Likes } from '../models/likes.model.js';
import { Post } from '../models/Post.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import mongoose, { Schema, ObjectId } from 'mongoose';
import getDataUri from '../utils/dataUri.js';
import cloudinary from 'cloudinary';

const createPost = asyncHandler(async (req, res) => {
	const { desc } = req.body;
	const { file } = req;
	const user = await User.findById(req.user._id);

	if (!user) {
		throw new ApiError(404, 'User not found');
	}

	const fileUri = getDataUri(file);
	const imageResponce = await uploadOnCloudinary(fileUri.content);
	if (!imageResponce) {
		throw new ApiError(500, 'Something went wrong while uploading image');
	}
	const post = await Post.create({
		owner: req.user._id,
		desc,
		img: imageResponce.secure_url || '',
	});

	if (!post) {
		throw new ApiError(500, 'Something went wrong while creating post');
	}

	await user.save();

	return res
		.status(201)
		.json(new ApiResponse(201, post, 'Post created successfully'));
});

const getPosts = asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const post = await Post.aggregate([
		{
			$match: {
				owner: new mongoose.Types.ObjectId(userId),
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: 'owner',
				foreignField: '_id',
				as: 'owner',
			},
		},
		{
			$unwind: '$owner',
		},

		{
			$project: {
				_id: 1,
				owner: {
					_id: 1,
					username: 1,
					fullname: 1,
					avatar: 1,
				},
				desc: 1,
				img: 1,
			},
		},
		{
			$lookup: {
				from: 'likes',
				localField: '_id',
				foreignField: 'postId',
				as: 'likes',
			},
		},
		{
			$lookup: {
				from: 'comments',
				localField: '_id',
				foreignField: 'post',
				as: 'comments',
			},
		},
		{
			$addFields: {
				commentsCount: { $size: '$comments' },
			},
		},
		{
			$project: {
				comments: 0,
			},
		},
		{
			$sort: {
				createdAt: -1,
			},
		},
	]);
	if (!post) {
		throw new ApiError(404, 'Posts not found');
	}
	return res
		.status(200)
		.json(new ApiResponse(200, post, 'Posts fetched successfully'));
});

const getOverallPosts = asyncHandler(async (req, res) => {
	let friendsPosts = await User.aggregate([
		{
			$match: {
				_id: req.user._id,
			},
		},
		{
			$lookup: {
				from: 'followings',
				localField: '_id',
				foreignField: 'userId',
				as: 'friends',
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: 'friends.followingUserId',
				foreignField: '_id',
				as: 'ownerDetails',
			},
		},
		{
			$lookup: {
				from: 'posts',
				localField: 'friends.followingUserId',
				foreignField: 'owner',
				as: 'posts',
			},
		},
		{
			$project: {
				_id: 1,
				mergedData: {
					$map: {
						input: '$posts',
						as: 'post',
						in: {
							$mergeObjects: [
								'$$post',
								{
									owner: {
										$arrayElemAt: [
											{
												$filter: {
													input: '$ownerDetails',
													as: 'detail',
													cond: {
														$eq: [
															'$$detail._id',
															'$$post.owner',
														],
													},
												},
											},
											0,
										],
									},
								},
							],
						},
					},
				},
			},
		},
		{
			$unwind: '$mergedData',
		},
		{
			$replaceRoot: {
				newRoot: '$mergedData',
			},
		},
		{
			$project: {
				_id: 1,
				desc: 1,
				img: 1,
				createdAt: 1,
				owner: {
					_id: 1,
					username: 1,
					fullname: 1,
					avatar: 1,
				},
			},
		},

		{
			$lookup: {
				from: 'likes',
				localField: '_id',
				foreignField: 'postId',
				as: 'likes',
			},
		},
	]);

	const myPosts = await Post.aggregate([
		{
			$match: {
				owner: req.user._id,
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: 'owner',
				foreignField: '_id',
				as: 'ownerArray', // Rename the output field to avoid conflict
			},
		},
		{
			$project: {
				_id: 1,
				desc: 1,
				img: 1,
				createdAt: 1,
				owner: {
					$arrayElemAt: ['$ownerArray', 0], // Extract the first element from the ownerArray
				},
			},
		},
		{
			$project: {
				_id: 1,
				desc: 1,
				img: 1,
				createdAt: 1,
				owner: {
					_id: 1,
					username: 1,
					fullname: 1,
					avatar: 1,
				},
			},
		},
		{
			$lookup: {
				from: 'likes',
				localField: '_id',
				foreignField: 'postId',
				as: 'likes',
			},
		},
		{
			$lookup: {
				from: 'comments',
				localField: '_id',
				foreignField: 'post',
				as: 'comments',
			},
		},
		{
			$addFields: {
				commentsCount: { $size: '$comments' },
			},
		},
		{
			$project: {
				comments: 0,
			},
		},
	]);

	// Rename the 'owner' field to remove the 'Array' suffix if needed
	myPosts.forEach((post) => {
		post.owner = post.owner ? post.owner : {}; // Ensure owner exists
	});

	let friends = [...friendsPosts, ...myPosts];
	friends = friends.sort((a, b) => {
		return new Date(b.createdAt) - new Date(a.createdAt);
	});
	return res
		.status(200)
		.json(new ApiResponse(200, friends, 'Posts fetched successfully'));
});

const likeAndUnlike = asyncHandler(async (req, res) => {
	const { postId } = req.body;
	const like = await Likes.findOne({
		userId: req.user._id,
		postId,
	});

	if (like) {
		await Likes.findByIdAndDelete(like._id);

		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					like,
					'Post is like or unlike successfully'
				)
			);
	} else {
		const like = await Likes.create({
			userId: req.user._id,
			postId,
		});
		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					like,
					'Post is like or unlike successfully'
				)
			);
	}
});

export { createPost, getPosts, likeAndUnlike, getOverallPosts };
