import {
	Avatar,
	AvatarBadge,
	Box,
	Button,
	Flex,
	Text,
	VStack,
	useBreakpointValue,
} from '@chakra-ui/react';
import ButtonSpinner from '../loaderButton/ButtonSpinner';
import EventCard from '../eventCard/EventCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../../app/allUsersAction';
import { followUser } from '../../app/userAction';
import { Link } from 'react-router-dom';
const RightBar = () => {
	const display = useBreakpointValue({ base: 'none', lg: 'flex' });
	const dispatch = useDispatch();
	const allUser = useSelector((state) => state.allUser?.allUser);
	useEffect(() => {
		dispatch(getAllUsers());
	}, []);
	const handleFollow =async (_id) => {
		await dispatch(followUser({ followingUserId: _id }));
		dispatch(getAllUsers());
	};
	return (
		<Box px={5} pos={'fixed'} display={display}>
			<Box
				className="container"
				px={5}
				borderRadius={10}
				boxShadow={'md'}
				maxH="100vh" // Set a maximum height to enable vertical scrolling
				overflowY="auto" // Enable vertical scrollbar
				p="4" // Add padding to the container
				_webkit-scrollbar={{ width: '5px' }} // Customize scrollbar width
				_webkit-scrollbar-thumb={{ bg: 'teal.500' }} // Customize scrollbar thumb color
			>
				<Box className="item">
					<Text fontWeight={500} textAlign={'start'}>
						Friends Suggestions
					</Text>
					<br />
					{allUser?.data?.map((user) => (
						<Box key={user._id}>
							<Flex alignItems={'center'} gap={5}>
								<Flex alignItems={'center'} gap={5}>
									<Avatar
										name={user?.fullname}
										src={user?.avatar}
										filter={'grayscale(1)'}
									/>
									<Flex flexDirection={'column'}>
										<Link
											to={`/profile/${user._id}`}
											fontWeight={500}
										>
											{user?.fullname}
										</Link>
										<Flex gap={3} pt={2}>
											<Button
												onClick={() =>
													handleFollow(user._id)
												}
											>
												Follow
											</Button>
										</Flex>
									</Flex>
								</Flex>
							</Flex>
							<br />
						</Box>
					))}
				</Box>
				<br />
				<hr />
				<br />

				<Flex flexDirection={'column'} gap={3}>
					<Text fontWeight={500} textAlign={'start'}>
						Events
					</Text>
					<Box className="user">
						<EventCard />
					</Box>
					<ButtonSpinner btnName={'Show more'} />
				</Flex>
				<br />
				<hr />
				<br />

				<Box className="item">
					<Text fontWeight={500}>Online Friends</Text>
					<br />
					<Box className="user">
						<div className="userInfo">
							<Flex alignItems={'center'} gap={5}>
								<Avatar
									name="Dan Abrahmov"
									src="https://bit.ly/dan-abramov"
									size={'lg'}
									filter={'grayscale(1)'}
								>
									<AvatarBadge boxSize="1em" bg="red.500" />
								</Avatar>
								<Box>
									<Flex gap={2}>
										<Text fontWeight={500}>Jane Doe</Text>
									</Flex>
								</Box>
							</Flex>
						</div>
					</Box>
					<br />
					<Box className="user">
						<div className="userInfo">
							<Flex alignItems={'center'} gap={5}>
								<Avatar
									name="Dan Abrahmov"
									src="https://bit.ly/dan-abramov"
									size={'lg'}
									filter={'grayscale(1)'}
								>
									<AvatarBadge boxSize="1em" bg="red.500" />
								</Avatar>
								<Box>
									<Flex
										gap={2}
										justifyContent={'space-between'}
									>
										<Text fontWeight={500}>Jane Doe</Text>
									</Flex>
								</Box>
							</Flex>
						</div>
					</Box>
					<br />
					<Box className="user">
						<div className="userInfo">
							<Flex alignItems={'center'} gap={5}>
								<Avatar
									name="Dan Abrahmov"
									src="https://bit.ly/dan-abramov"
									size={'lg'}
									filter={'grayscale(1)'}
								>
									<AvatarBadge boxSize="1em" bg="red.500" />
								</Avatar>
								<Box>
									<Flex gap={2}>
										<Text fontWeight={500}>Jane Doe</Text>
									</Flex>
								</Box>
							</Flex>
						</div>
					</Box>
					<br />
					<Box className="user">
						<div className="userInfo">
							<Flex alignItems={'center'} gap={5}>
								<Avatar
									name="Dan Abrahmov"
									src="https://bit.ly/dan-abramov"
									size={'lg'}
									filter={'grayscale(1)'}
								>
									<AvatarBadge boxSize="1em" bg="red.500" />
								</Avatar>
								<Box>
									<Flex gap={2}>
										<Text fontWeight={500}>Jane Doe</Text>
									</Flex>
									<Text fontWeight={'bold'} color={'blue'}>
										1 min ago
									</Text>
								</Box>
							</Flex>
						</div>
					</Box>
				</Box>
				<br />
			</Box>
		</Box>
	);
};

export default RightBar;
