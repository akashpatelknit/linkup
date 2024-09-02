import { Box, Flex } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import SideBar from './client/src/pages/chat/SideBar';
import { ChatState } from './client/src/context/ChatProvider';
import MyChats from './client/src/pages/chat/MyChats';
import Chatbox from './client/src/pages/chat/Chatbox';
import { useDispatch } from 'react-redux';
import { loadUser } from './client/src/app/userAction';

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
