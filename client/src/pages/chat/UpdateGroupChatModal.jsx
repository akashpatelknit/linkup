import { ViewIcon } from '@chakra-ui/icons';
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
	IconButton,
	Spinner,
	Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from './UserBadgeItem';
import UserListItem from './UserListItem';
import {
	addMemberToGroup,
	getChat,
	getSearchedUser,
	removeMemberToGroup,
	renameGroup,
} from '../../app/chatAction';
import { useSelector, useDispatch } from 'react-redux';
import ChatLoading from './ChatLoading';

const UpdateGroupChatModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupChatName, setGroupChatName] = useState();
	const [search, setSearch] = useState('');
	const [selectedUsers, setSelectedUsers] = useState();
	const [searchResult, setSearchResult] = useState([]);
	const [renameloading, setRenameLoading] = useState(false);
	const toast = useToast();
	const dispatch = useDispatch();
	const { selectedChat, setSelectedChat, user } = ChatState();

	useEffect(() => {
		dispatch(getSearchedUser(search));
	}, [search]);

	const { searchedUsers, loading, chats, error } = useSelector(
		(state) => state.chat
	);

	const handleRename = async () => {
		dispatch(
			renameGroup({
				chatId: selectedChat._id,
				updatedGroupName: groupChatName,
			})
		).then(() => {
			onClose();
			dispatch(getChat());
		});
	};

	const handleAddUser = async (user1) => {
		if (selectedChat.users.find((u) => u._id === user1._id)) {
			toast({
				title: 'User Already in group!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		if (selectedChat.groupAdmin._id !== user._id) {
			toast({
				title: 'Only admins can add someone!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}
		dispatch(
			addMemberToGroup({ userId: user1._id, chatId: selectedChat._id })
		);
		if (error) {
			toast({
				title: 'User Already in group!',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	const handleDelete = (delUser) => {
		dispatch(
			removeMemberToGroup({
				userId: delUser._id,
				chatId: selectedChat._id,
			})
		);
	};

	const handleLeaveGRoup = async (user1) => {};

	return (
		<>
			<IconButton
				d={{ base: 'flex' }}
				icon={<ViewIcon />}
				onClick={onOpen}
			/>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent h={'70vh'} overflowY={'scroll'}>
					<ModalHeader
						fontSize="35px"
						fontFamily="Work sans"
						d="flex"
						justifyContent="center"
					>
						{selectedChat.chatName}
					</ModalHeader>

					<ModalCloseButton />
					<ModalBody d="flex" flexDir="column" alignItems="center">
						<Box w="100%" d="flex" flexWrap="wrap" pb={3}>
							{selectedChat.users.map((u) => (
								<UserBadgeItem
									key={u._id}
									user={u}
									admin={selectedChat.groupAdmin}
									handleFunction={() => handleRemove(u)}
								/>
							))}
						</Box>
						<FormControl d="flex">
							<Input
								placeholder="Chat Name"
								value={groupChatName}
								onChange={(e) =>
									setGroupChatName(e.target.value)
								}
							/>
							<Flex justifyContent={'space-between'}>
								<Button
									variant="solid"
									colorScheme="teal"
									ml={1}
									my={2}
									isLoading={loading}
									onClick={handleRename}
								>
									Update
								</Button>
								<Button
									onClick={() => handleLeaveGRoup(user)}
									colorScheme="red"
									mr={1}
									my={2}
									isLoading={loading}
								>
									Leave Group
								</Button>
							</Flex>
						</FormControl>
						<FormControl>
							<Input
								placeholder="Add User to group"
								mb={1}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</FormControl>
						{selectedUsers && (
							<UserBadgeItem
								key={selectedUsers._id}
								user={selectedUsers}
								handleFunction={() =>
									handleDelete(selectedUsers)
								}
							/>
						)}
						{searchedUsers?.map((user) => (
							<UserListItem
								key={user._id}
								user={user}
								handleFunction={() => handleAddUser(user)}
							/>
						))}
					</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UpdateGroupChatModal;
