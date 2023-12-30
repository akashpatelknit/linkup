import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Following } from '../models/follow.model.js';
import { Follower } from '../models/follower.model.js';

const generateAccessAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(500, 'Something went wrong while generating tokens');
	}
};

const registerUser = asyncHandler(async (req, res) => {
	// get user data from req.body
	const { fullname, username, email, password } = req.body;
	// validate user data
	if (
		[fullname, username, email, password].some(
			(field) => field?.trim() === ''
		)
	) {
		throw new ApiError(400, 'All fields are required');
	}

	// check if user already exists
	const existUser = await User.findOne({
		$or: [{ email }, { username }],
	});
	if (existUser) {
		throw new ApiError(400, 'User already exists');
	}

	// create user object to save to database
	const user = await User.create({
		fullname,
		username: username.toLowerCase(),
		email,
		password,
	});

	// remove password and refreshToken from response
	const createUSer = await User.findById(user._id).select(
		'-password -refreshToken'
	);

	// check if user is created
	if (!createUSer) {
		throw new ApiError(500, 'Something went wrong while creating user');
	}

	// return response
	return res
		.status(201)
		.json(new ApiResponse(200, createUSer, 'User created successfully'));
});

const loginUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	if (!username && !email) {
		throw new ApiError(400, 'Username or email is required');
	}
	const user = await User.findOne({ $or: [{ username }, { email }] });
	if (!user) {
		throw new ApiError(404, 'User not found');
	}

	const isPasswordMatch = await user.isPasswordCorrect(password);
	if (!isPasswordMatch) {
		throw new ApiError(401, 'Invalid user credentials');
	}

	const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
		user._id
	);

	const loggedInUser = await User.findByIdAndUpdate(user._id).select(
		'-password -refreshToken'
	);
	const options = {
		httpOnly: true,
		expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
		secure: true,
		sameSite: 'none',
	};

	return res
		.status(200)
		.cookie('refreshToken', refreshToken, options)
		.cookie('accessToken', accessToken, options)
		.json(
			new ApiResponse(
				200,
				{ user: loggedInUser, accessToken, refreshToken },
				'User logged in successfully'
			)
		);
});

const logoutUser = asyncHandler(async (req, res) => {
	await User.findByIdAndUpdate(
		req.user._id,
		{
			$set: {
				refreshToken: undefined,
			},
		},
		{ new: true }
	);
	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.clearCookie('refreshToken', options)
		.clearCookie('accessToken', options)
		.json(new ApiResponse(200, null, 'User logged out successfully'));
});

const updateProfile = asyncHandler(async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user._id);
	if (!user) {
		throw new ApiError(404, 'User not found');
	}

	const avatarPath = req.files?.avatar[0]?.path;

	const avatar = await uploadOnCloudinary(avatarPath);

	if (!avatar) {
		throw new ApiError(500, 'Something went wrong while uploading avatar');
	}
	user.avatar = avatar.url;
	await user.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(new ApiResponse(200, user, 'User profile updated successfully'));
});

const followAndUnfollowUser = asyncHandler(async (req, res) => {
	const { followingUserId } = req.body;
	const userId = req.user._id;
	let message = '';
	const existingFollow = await Following.findOne({
		userId,
		followingUserId,
	});

	// userId is type of followingId
	if (!existingFollow) {
		// If not following, create follow relationship
		await Following.create({
			userId,
			followingUserId,
		});

		await Follower.create({
			userId: followingUserId,
			followerUserId: userId,
		});
		message = 'Successfully followed user.';
	} else {
		// If already following, delete follow relationship
		await Following.findOneAndDelete({
			userId: userId,
			followingUserId: followingUserId,
		});
		await Follower.findOneAndDelete({
			userId: followingUserId,
			followerUserId: userId,
		});
		message = 'Successfully unfollowed user.';
	}
	return res.status(200).json(new ApiResponse(200, null, message));
});

const loadUser = asyncHandler(async (req, res) => {
	const user = await User.aggregate([
		{
			$match: {
				_id: req.user._id,
			},
		},
		{
			$lookup: {
				from: 'followers',
				localField: '_id',
				foreignField: 'userId',
				as: 'followers',
			},
		},
		{
			$lookup: {
				from: 'followings',
				localField: '_id',
				foreignField: 'userId',
				as: 'following',
			},
		},
		// {
		// 	$project: {
		// 		password: 0,
		// 		refreshToken: 0,
		// 		createdAt: 0,
		// 		updatedAt: 0,
		// 		joinedData: {
		// 			createdAt: 0,
		// 			updatedAt: 0,
		// 		},
		// 	},
		// },
	]);

	if (!user) {
		throw new ApiError(404, 'User not found');
	}

	return res
		.status(200)
		.json(new ApiResponse(200, user, 'User load successfully'));
});

const getFriendsList = asyncHandler(async (req, res) => {
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
	friends = friends.map((friend) => friend.following[0]);
	return res.status(200).json(new ApiResponse(200, friends, 'Friends list'));
});

const getFollowersList = asyncHandler(async (req, res) => {
	let friends = await Follower.aggregate([
		{
			$match: {
				userId: req.user._id,
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: 'followerUserId',
				foreignField: '_id',
				as: 'followers',
			},
		},
		{
			$project: {
				_id: 0,
				'followers._id': 1,
				'followers.username': 1,
				'followers.fullname': 1,
				'followers.bio': 1,
				'followers.avatar': 1,
				'followers.coverImage': 1,
			},
		},
	]);

	if (!friends) {
		throw new ApiError(404, 'No friends found');
	}
	friends = friends.map((friend) => friend.followers[0]);
	return res
		.status(200)
		.json(new ApiResponse(200, friends, 'Followers list'));
});

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.userId).select(
		'-password -refreshToken -createdAt -updatedAt -__v'
	);
	if (!user) {
		throw new ApiError(404, 'User not found');
	}
	return res
		.status(200)
		.json(new ApiResponse(200, user, 'User load successfully'));
});

// update controller
const updateProfilePictrure = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		throw new ApiError(404, 'User not found');
	}
	const avatarPath = req.files?.avatar[0]?.path;
	console.log(req.files);
	const avatar = await uploadOnCloudinary(avatarPath);

	if (!avatar) {
		throw new ApiError(500, 'Something went wrong while uploading avatar');
	}
	user.avatar = avatar.url;
	await user.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(new ApiResponse(200, user, 'User profile updated successfully'));
});

const updateCoverPictrure = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		throw new ApiError(404, 'User not found');
	}
	const coverPath = req.files?.cover[0]?.path;

	const cover = await uploadOnCloudinary(coverPath);

	if (!cover) {
		throw new ApiError(500, 'Something went wrong while uploading cover');
	}
	user.coverImage = cover.url;
	await user.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(new ApiResponse(200, user, 'User profile updated successfully'));
});

const updateProfileDetails = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		throw new ApiError(404, 'User not found');
	}
	const { bio, website, status, socialLinks } = req.body;

	user.bio = bio;
	user.website = website;

	await user.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(new ApiResponse(200, user, 'User profile updated successfully'));
});

// search user
const getSearchedUser = asyncHandler(async (req, res) => {
	const keyword = req.query.search
		? {
				$or: [
					{ fullname: { $regex: req.query.search, $options: 'i' } },
					{ email: { $regex: req.query.search, $options: 'i' } },
				],
		  }
		: {};
	const users = await User.find(keyword)
		.find({ _id: { $ne: req.user._id } })
		.select(
			'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
		);

	if (!users) {
		throw new ApiError(404, 'User not found');
	}
	return res
		.status(200)
		.json(new ApiResponse(200, users, 'User load successfully'));
});

export {
	registerUser,
	loginUser,
	logoutUser,
	loadUser,
	updateProfile,
	getUserById,
	followAndUnfollowUser,
	getFriendsList,
	getFollowersList,
	updateProfilePictrure,
	updateCoverPictrure,
	updateProfileDetails,
	getSearchedUser,
};
