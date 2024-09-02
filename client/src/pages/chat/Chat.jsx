import { Box, Flex } from '@chakra-ui/layout';
import { lazy, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { ChatState } from '../../context/ChatProvider';
import { loadUser } from '../../app/userAction';
const SideBar = lazy(() => import('./SideBar'));
const MyChats = lazy(() => import('./MyChats'));
const Chatbox = lazy(() => import('./Chatbox'));

const Chat = () => {
	const [fetchAgain, setFetchAgain] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadUser());
	}, []);
	const { user } = ChatState();

	return (
		<div style={{ width: '100%' }}>
			{user && <SideBar />}
			<Flex justifyContent="space-between" w="100%">
				{user && <MyChats />}
				{user && <Chatbox />}
			</Flex>
		</div>
	);
};

export default Chat;
