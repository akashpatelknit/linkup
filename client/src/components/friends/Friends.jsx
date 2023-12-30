import { Flex } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import FriendsProfileCards from '../profile/FriendsProfileCards.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getFriendsList } from '../../app/userAction.js';

const Friends = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getFriendsList());
	}, []);

	const user = useSelector((state) => state.user?.friends);
	console.log(user);
	return (
		<Flex flexWrap={'wrap'} justifyContent={'flex-start'} gap={3}>
			{user?.map((user) => (
				<FriendsProfileCards user={user} />
			))}
		</Flex>
	);
};

export default Friends;
