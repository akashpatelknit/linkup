import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import {
	Box,
	Button,
	FormControl,
	IconButton,
	Input,
	Spinner,
	Text,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../../config/ChatLogic';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import { useSelector, useDispatch } from 'react-redux';
import { getM, sendM } from '../../app/mAct';
import ScrollableChat from './ScrollableChat';
import { addToMessage } from '../../app/mSlice';

const SingleChat = () => {
	const {
		selectedChat,
		setSelectedChat,
		user,
		setNewMessage,
		message,
		newMessage,
	} = ChatState();
	const [newTypedMessage, setNewTypedMessage] = useState('');
	const istyping = true;
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.message);

	useEffect(() => {
		dispatch(getM(selectedChat?._id));
	}, [setSelectedChat]);
	console.log('message single chat', message);

	const sendMessage = async (event) => {
		setNewMessage(newTypedMessage);
		setNewTypedMessage('');
	};

	const typingHandler = (e) => {
		setNewTypedMessage(e.target.value);
	};

	return (
		<>
			{selectedChat ? (
				<>
					<Text
						fontSize={{ base: '28px', md: '30px' }}
						pb={3}
						px={2}
						w="100%"
						fontFamily="Work sans"
						display="flex"
						justifyContent={{ base: 'space-between' }}
						alignItems="center"
					>
						<IconButton
							display={{ base: 'flex', md: 'none' }}
							icon={<ArrowBackIcon />}
							onClick={() => setSelectedChat('')}
						/>

						{!selectedChat.isGroupChat ? (
							<>
								{getSender(user, selectedChat.users)}
								<ProfileModal
									user={getSenderFull(
										user,
										selectedChat.users
									)}
								/>
							</>
						) : (
							<>
								{selectedChat.chatName.toUpperCase()}
								<UpdateGroupChatModal />
							</>
						)}
					</Text>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="flex-end"
						p={3}
						bg="#E8E8E8"
						w="100%"
						h="full"
						borderRadius="lg"
						overflowY="hidden"
					>
						{loading ? (
							<Spinner
								size="xl"
								w={20}
								h={20}
								alignSelf="center"
								margin="auto"
							/>
						) : (
							<div className="messages">
								<ScrollableChat messages={message} />
							</div>
						)}

						<FormControl id="first-name" isRequired mt={3}>
							<Input
								variant="filled"
								bg="#E0E0E0"
								placeholder="Enter a message.."
								value={newTypedMessage}
								onChange={typingHandler}
							/>
							<Button onClick={sendMessage}> Send</Button>
						</FormControl>
					</Box>
				</>
			) : (
				// to get socket.io on same page
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					h="100%"
				>
					<Text fontSize="3xl" pb={3} fontFamily="Work sans">
						Click on a user to start chatting
					</Text>
				</Box>
			)}
		</>
	);
};

export default SingleChat;
