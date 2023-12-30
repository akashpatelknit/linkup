import {
	Heading,
	Avatar,
	Box,
	Center,
	Image,
	Flex,
	Text,
	Stack,
	Button,
	useColorModeValue,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadSpecificUSer } from '../../app/userAction';

const FriendsProfileCards = ({ user }) => {
	const { avatar, fullname, _id, coverImage, bio } = user;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleNavigate = (_id) => {
		navigate(`/profile/${_id}`);
		dispatch(loadSpecificUSer({ userId: _id }));
	};
	return (
		<Center>
			<Box
				bg={useColorModeValue('white', 'gray.800')}
				rounded={'md'}
				overflow={'hidden'}
				width={'250px'}
				height={'350px'}
			>
				<Image
					h={'120px'}
					w={'full'}
					src={coverImage}
					objectFit="cover"
					alt="#"
					// filter={'grayScale(1)'}
				/>
				<Flex justify={'center'} mt={-12}>
					<Avatar
						size={'xl'}
						src={avatar}
						// filter={'grayScale(1)'}
						css={{
							border: '2px solid white',
						}}
					/>
				</Flex>

				<Box pt={6}>
					<Stack spacing={0} align={'center'} mb={2}>
						<Heading
							fontSize={'xl'}
							fontWeight={500}
							fontFamily={'body'}
							textAlign={'center'}
							wordWrap="break-word"
						>
							{fullname}
						</Heading>
						<Text color={'gray.500'}>{bio}</Text>
					</Stack>

					<Link to={`/profile/${_id}`}>
						<Button
							w={'full'}
							mt={8}
							bg={useColorModeValue('#151f21', 'gray.900')}
							color={'white'}
							rounded={'md'}
						>
							Profile
						</Button>
					</Link>
				</Box>
			</Box>
		</Center>
	);
};

export default FriendsProfileCards;
