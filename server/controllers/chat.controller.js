import { User } from '../models/user.model.js';
import { Chat } from '../models/chat.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const accessChat = asyncHandler(async (req, res, next) => {
	const { userId } = req.body;

	if (!userId) {
		return res.sendStatus(400);
	}

	var isChat = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		.populate(
			'users',
			'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
		)
		.populate('latestMessage');

	isChat = await User.populate(isChat, {
		path: 'latestMessage.sender',
		select: 'fullname avatar email',
	});

	if (isChat.length > 0) {
		res.send(isChat[0]);
	} else {
		var chatData = {
			chatName: 'sender',
			isGroupChat: false,
			users: [req.user._id, userId],
		};

		try {
			const createdChat = await Chat.create(chatData);
			const FullChat = await Chat.findOne({
				_id: createdChat._id,
			}).populate(
				'users',
				'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
			);
			res.status(200).json(FullChat);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}
});

export const fetchChats = asyncHandler(async (req, res) => {
	try {
		Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
			.populate(
				'users',
				'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
			)
			.populate(
				'groupAdmin',
				'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
			)
			.populate('latestMessage')
			.sort({ updatedAt: -1 })
			.then(async (results) => {
				results = await User.populate(results, {
					path: 'latestMessage.sender',
					select: 'fullname avatar email',
				});
				res.status(200).send(results);
			});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

export const createGroupChat = asyncHandler(async (req, res) => {
	if (!req.body.users || !req.body.name) {
		return res.status(400).send({ message: 'Please Fill all the feilds' });
	}

	var users = JSON.parse(req.body.users);

	if (users.length < 2) {
		return res
			.status(400)
			.send('More than 2 users are required to form a group chat');
	}

	users.push(req.user);
	const groupChatName = req.body.name.trim();
	const isGroupExists = await Chat.findOne({
		chatName: groupChatName,
	});

	if (isGroupExists) {
		return res.status(400).send({ message: 'Group Name Already Exists' });
	}

	try {
		const groupChat = await Chat.create({
			chatName: req.body.name,
			users: users,
			isGroupChat: true,
			groupAdmin: req.user,
		});

		const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
			.populate(
				'users',
				'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
			)
			.populate(
				'groupAdmin',
				'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
			);

		res.status(200).json(fullGroupChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

export const renameGroup = asyncHandler(async (req, res) => {
	const { chatId, updatedGroupName } = req.body;

	const updatedChat = await Chat.findByIdAndUpdate(
		chatId,
		{
			chatName: updatedGroupName,
		},
		{
			new: true,
		}
	)
		.populate(
			'users',
			'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
		)
		.populate(
			'groupAdmin',
			'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
		);

	if (!updatedChat) {
		res.status(404);
		throw new Error('Chat Not Found');
	} else {
		res.json(updatedChat);
	}
});

export const removeFromGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	const removed = await Chat.findByIdAndUpdate(
		chatId,
		{
			$pull: { users: userId },
		},
		{
			new: true,
		}
	)
		.populate(
			'users',
			'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
		)
		.populate(
			'groupAdmin',
			'-password -socialLinks -refreshToken -posts -watchHistory -followers -following   -__v -createdAt -updatedAt -website -coverImage -bio -status'
		);

	if (!removed) {
		res.status(404);
		throw new Error('Chat Not Found');
	} else {
		res.json(removed);
	}
});

export const addToGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	let isUserExist = await Chat.find({
		$and: [{ users: { $elemMatch: { $eq: userId } } }, { _id: chatId }],
	});
	if (isUserExist.length > 0) {
		throw new ApiError(400, 'User Already Exists');
	}

	const added = await Chat.findByIdAndUpdate(
		chatId,
		{
			$push: { users: userId },
		},
		{
			new: true,
		}
	)
		.populate(
			'users',
			'-password -socialLinks -refreshToken -posts -watchHistory -followers -following  -__v -createdAt -updatedAt -website -coverImage -bio -status'
		)
		.populate(
			'groupAdmin',
			'-password -socialLinks -refreshToken -posts -watchHistory -followers -following  -__v -createdAt -updatedAt -website -coverImage -bio -status'
		);

	if (!added) {
		throw new ApiError(404, 'Chat Not Found');
	}

	return res
		.status(200)
		.json(200, new ApiResponse(200, 'User Added Successfully', added));
});
