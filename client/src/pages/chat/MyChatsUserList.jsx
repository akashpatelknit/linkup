import { Flex, Avatar, AvatarBadge, AvatarGroup, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { getSender, getSenderId } from '../../config/ChatLogic';

const MyChatsUserList = ({ chat }) => {
	const { onlineUsers, selectedChat, setSelectedChat, user } = ChatState();
	const [activeUser, setActiveUser] = useState(false);

	useEffect(() => {
		if (chat.isGroupChat) return;
		const senderId = getSenderId(user, chat.users);
		setActiveUser(onlineUsers?.find((u) => u.userId === senderId));
	}, [onlineUsers, chat]);

	return (
		<Flex
			onClick={() => setSelectedChat(chat)}
			cursor="pointer"
			bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
			color={selectedChat === chat ? 'white' : 'black'}
			px={3}
			py={2}
			borderRadius="lg"
			key={chat._id}
		>
			<Avatar
				mr={2}
				size="sm"
				cursor="pointer"
				name={
					!chat.isGroupChat
						? getSender(user, chat.users)
						: chat.chatName
				}
				src={chat.chatImage}
			>
				{activeUser && (
					<AvatarBadge
						borderColor="papayawhip"
						bg="tomato"
						boxSize="1.25em"
					/>
				)}
			</Avatar>
			<Text>
				{!chat.isGroupChat
					? getSender(user, chat.users)
					: chat.chatName}
			</Text>
			{/* {chat.latestMessage && (
									<Text fontSize="xs">
										<b>
											{chat.latestMessage.sender.name} :{' '}
										</b>
										{chat.latestMessage.content.length > 50
											? chat.latestMessage.content.substring(
													0,
													51
											  ) + '...'
											: chat.latestMessage.content}
									</Text>
								)} */}
		</Flex>
	);
};

export default MyChatsUserList;
