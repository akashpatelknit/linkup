import { Avatar, Box, Flex } from '@chakra-ui/react';
import React from 'react';
import DrawerExample from '../sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileNavbarBottom = () => {
	const user = useSelector((state) => state.user?.userInfo);
	return (
		<Box
			position={'fixed'}
			display={{ base: 'flex', md: 'none' }}
			bottom={0}
			zIndex={999}
			bg={'white'}
			height={'80px'}
			width={'full'}
		>
			<Flex
				justifyContent={'space-between'}
				alighItems={'center'}
				width={'full'}
			>
				<Flex
					flex="2"
					alignItems={'center'}
					justifyContent={'flex-start'}
					ml={3}
				>
					<DrawerExample />
				</Flex>
				<Flex
					flex="1"
					alignItems={'center'}
					justifyContent={'center'}
					gap={2}
				>
					<Link to={`/profile/${user?._id}`}>
						<Avatar name={user?.fullname} src={user?.avatar} />
					</Link>

					<Link to="/chat">
						<Avatar
							name="Kola Tioluwani"
							src="https://image.similarpng.com/very-thumbnail/2021/08/Instagram-chat-icon-isolated-on-transparent-background-PNG.png"
						/>
					</Link>
				</Flex>
			</Flex>
		</Box>
	);
};

export default MobileNavbarBottom;
