import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	Input,
	useToast,
	Box,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { createGroup, getChat, getSearchedUser } from '../../app/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import UserListItem from './UserListItem';
import UserBadgeItem from './UserBadgeItem';
import { ChatState } from '../../context/ChatProvider';
// import UserBadgeItem from '../userAvatar/UserBadgeItem';
// import UserListItem from '../userAvatar/UserListItem';

const GroupChatModal = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupChatName, setGroupChatName] = useState();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const toast = useToast();
	const dispatch = useDispatch();
	const { user, chats, setChats } = ChatState();

	const handleGroup = (userToAdd) => {
		if (selectedUsers.includes(userToAdd)) {
			toast({
				title: 'User already added',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top',
			});
			return;
		}

		setSelectedUsers([...selectedUsers, userToAdd]);
	};

	useEffect(() => {
		dispatch(getSearchedUser(search));
	}, [search]);
	const { searchedUsers, loading } = useSelector((state) => state.chat);
	
	const handleDelete = (delUser) => {
		setSelectedUsers(
			selectedUsers.filter((sel) => sel._id !== delUser._id)
		);
	};

	const handleSubmit = async () => {
		if (!groupChatName || !selectedUsers) {
			toast({
				title: 'Please fill all the feilds',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top',
			});
			return;
		}
		await dispatch(
			createGroup({
				name: groupChatName,
				users: JSON.stringify(selectedUsers.map((u) => u._id)),
			})
		);
		dispatch(getChat());
		setSelectedUsers([]);
		setGroupChatName('');
		onClose();
	};

	return (
		<>
			<span onClick={onOpen}>{children}</span>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize="35px"
						fontFamily="Work sans"
						d="flex"
						justifyContent="center"
					>
						Create Group Chat
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody d="flex" flexDir="column" alignItems="center">
						<FormControl>
							<Input
								placeholder="Chat Name"
								mb={3}
								onChange={(e) =>
									setGroupChatName(e.target.value)
								}
							/>
						</FormControl>
						<FormControl>
							<Input
								placeholder="Add Users eg: John, Piyush, Jane"
								mb={1}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</FormControl>
						<Box w="100%" d="flex" flexWrap="wrap">
							{selectedUsers.map((u) => (
								<UserBadgeItem
									key={u._id}
									user={u}
									handleFunction={() => handleDelete(u)}
								/>
							))}
						</Box>
						{loading ? (
							// <ChatLoading />
							<div>Loading...</div>
						) : (
							searchedUsers
								?.slice(0, 4)
								.map((user) => (
									<UserListItem
										key={user._id}
										user={user}
										handleFunction={() => handleGroup(user)}
									/>
								))
						)}
					</ModalBody>
					<ModalFooter>
						<Button onClick={handleSubmit} colorScheme="blue">
							Create Chat
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default GroupChatModal;
