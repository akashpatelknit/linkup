import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Message } from '../models/message.model.js';
import { User } from '../models/user.model.js';
import { Chat } from '../models/chat.model.js';

export const sendMessages = asyncHandler(async (req, res) => {
	const { content, chatId } = req.body;

	if (!content || !chatId) {
		return res.sendStatus(400);
	}

	var newMessage = {
		sender: req.user._id,
		content: content,
		chat: chatId,
	};

	try {
		var message = await Message.create(newMessage);

		message = await message.populate('sender', 'fullname avatar');
		message = await message.populate('chat');
		message = await User.populate(message, {
			path: 'chat.users',
			select: 'fullname avatar email',
		});

		await Chat.findByIdAndUpdate(req.body.chatId, {
			latestMessage: message,
		});
		console.log(message);
		res.json(message);
	} catch (error) {
		console.log(error);
		res.status(400);
		throw new Error(error.message);
	}
});

export const allMessages = asyncHandler(async (req, res) => {
	const { chatId } = req.params;
	try {
		let messages = await Message.find({ chat: chatId })
			.populate('sender', 'fullname avatar email')
			.populate('chat');
		res.json(messages);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});
