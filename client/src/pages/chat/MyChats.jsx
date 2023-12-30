import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { useSelector, useDispatch } from 'react-redux';
import { getChat } from '../../app/chatAction';
import { Avatar, Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { getSender } from '../../config/ChatLogic';
import GroupChatModal from './GroupChatModel';
import { getM } from '../../app/mAct';
import MyChatsUserList from './MyChatsUserList';

const MyChats = () => {
	const [loggedUser, setLoggedUser] = useState(null);
	const { selectedChat, setSelectedChat, user ,message} = ChatState();
	const [socketConnected, setSocketConnected] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getChat());
	}, []);

	// useEffect(() => {
	// 	dispatch(getM(selectedChat?._id));
	// }, [selectedChat]);

	const { chats } = useSelector((state) => state.chat);
	// console.log('chat', chats,user);
	return (
		<Box
			display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
			flexDir="column"
			alignItems="center"
			p={3}
			bg="white"
			w={{ base: '100%', md: '31%' }}
			borderRadius="lg"
			borderWidth="1px"
			minH={{ base: '90vh', md: '90vh' }}
		>
			<Box
				pb={3}
				px={3}
				fontSize={{ base: '28px', md: '30px' }}
				fontFamily="Work sans"
				display="flex"
				w="100%"
				justifyContent="space-between"
				alignItems="center"
			>
				My Chats
				<GroupChatModal>
					<Button
						d="flex"
						fontSize={{ base: '17px', md: '10px', lg: '17px' }}
						rightIcon={<AddIcon />}
					>
						New Group Chat
					</Button>
				</GroupChatModal>
			</Box>
			<Box
				d="flex"
				flexDir="column"
				p={3}
				bg="#F8F8F8"
				w="100%"
				h="100%"
				borderRadius="lg"
				overflowY="hidden"
			>
				{chats ? (
					<Stack overflowY="scroll">
						{chats.map((chat) => (
							<MyChatsUserList chat={chat} key={chat._id} />
						))}
					</Stack>
				) : (
					// <ChatLoading />
					<Text>Loading...</Text>
				)}
			</Box>
		</Box>
	);
};

export default MyChats;
