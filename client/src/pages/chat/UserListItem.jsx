import { Box, Text, Flex } from '@chakra-ui/layout';
import { ChatState } from '../../context/ChatProvider';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';

const UserListItem = ({ user, handleFunction }) => {
	const { onlineUsers } = ChatState();
	const isOnline = onlineUsers?.find((u) => u.userId === user._id);
	return (
		<Box
			onClick={handleFunction}
			cursor="pointer"
			bg="#E8E8E8"
			_hover={{
				background: '#38B2AC',
				color: 'white',
			}}
			w="100%"
			d="flex"
			alignItems="center"
			color="black"
			px={3}
			py={2}
			mb={2}
			borderRadius="lg"
		>
			<Flex>
				<Avatar
					mr={2}
					size="sm"
					cursor="pointer"
					name={user.fullname}
					src={user.avatar}
				>
					{isOnline && (
						<AvatarBadge
							boxSize="1em"
							bg="green.500"
							border="2px solid white"
						/>
					)}
				</Avatar>
				<Text>{user.fullname}</Text>
			</Flex>
		</Box>
	);
};

export default UserListItem;
