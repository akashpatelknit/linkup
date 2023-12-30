import { Box, Flex } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { ChatState } from '../../context/ChatProvider';
import MyChats from './MyChats';
import Chatbox from './Chatbox';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../app/userAction';

const Chatpage = () => {
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

export default Chatpage;
