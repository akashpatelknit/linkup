import React from 'react';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Text, Flex } from '@chakra-ui/layout';
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from '@chakra-ui/menu';
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
} from '@chakra-ui/modal';
import { Tooltip } from '@chakra-ui/tooltip';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar';
import { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { fetchChat, getChat, getSearchedUser } from '../../app/chatAction';
import UserListItem from './UserListItem';
import ChatLoading from './ChatLoading';
import { Spinner } from '@chakra-ui/react';
import ChatProvider, { ChatState } from '../../context/ChatProvider';
import { Search2Icon } from '@chakra-ui/icons';
const SideBar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [search, setSearch] = useState('');
	const [loadingChat, setLoadingChat] = useState(false);
	const toast = useToast();
	const dispatch = useDispatch();
	const {
		selectedChat,
		setSelectedChat,
		notification,
		user,
		chats,
		setChats,
	} = ChatState();

	useEffect(() => {
		dispatch(getSearchedUser(search));
	}, [search]);

	const { searchedUsers, loading } = useSelector((state) => state.chat);

	const accessChat = (userId) => {
		setSelectedChat(true);
		dispatch(fetchChat(userId));
	};

	return (
		<>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				bg="white"
				w="full"
				height={20}
				boxShadow={'md'}
			>
				<Tooltip
					label="Search Users to chat"
					hasArrow
					placement="bottom-end"
				>
					<Button variant="ghost" onClick={onOpen}>
						<Search2Icon fontSize="2xl" />
						<Text display={{ base: 'none', md: 'flex' }} px={4}>
							Search User
						</Text>
					</Button>
				</Tooltip>

				<Text fontSize="2xl" fontFamily="Work sans">
					Talk-A-Tive
				</Text>

				{/* // notification and profile menu */}
				<div>
					{/* /// notification menu */}
					<Menu>
						<MenuButton p={1}>
							<NotificationBadge
								count={notification.length}
								effect={Effect.SCALE}
							/>
							<BellIcon fontSize="2xl" m={1} />
						</MenuButton>

						<MenuList pl={2}>
							{!notification.length && 'No New Messages'}
							{notification.map((notif) => (
								<MenuItem
									key={notif._id}
									onClick={() => {
										setSelectedChat(notif.chat);
										setNotification(
											notification.filter(
												(n) => n !== notif
											)
										);
									}}
								>
									{notif.chat.isGroupChat
										? `New Message in ${notif.chat.chatName}`
										: `New Message from ${getSender(
												user,
												notif.chat.users
										  )}`}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					{/* // profile menu */}
					<Menu>
						<MenuButton>
							<Avatar name={user?.fullname} src={user?.avatar} />
							<span>{user?.fullname}</span>
						</MenuButton>
						<MenuList>
							<MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuDivider />
							<MenuItem>Logout</MenuItem>
						</MenuList>
					</Menu>
				</div>

				{/* // search drawer */}
				<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerHeader borderBottomWidth="1px">
							Search Users
						</DrawerHeader>
						<DrawerBody>
							<Flex pb={2}>
								<Input
									placeholder="Search by name or email"
									mr={2}
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</Flex>
							{loading ? (
								<ChatLoading />
							) : (
								searchedUsers?.map((user) => (
									<UserListItem
										key={user._id}
										user={user}
										handleFunction={() =>
											accessChat(user._id)
										}
									/>
								))
							)}
							{loading && <Spinner ml="auto" d="flex" />}
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Flex>
		</>
	);
};

export default SideBar;
