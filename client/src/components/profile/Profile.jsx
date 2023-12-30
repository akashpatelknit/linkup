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
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function SocialProfileWithImage({ user }) {
	const { avatar, fullname, followers, following, _id, coverImage, bio } =
		user;
	const navigate = useNavigate();
	const handleNavigate = (_id) => {
		navigate(`/profile/${_id}`);
	};
	return (
		<Center>
			<Box
				// maxW={'270px'}
				w={'100%'}
				bg={useColorModeValue('white', 'gray.800')}
				// boxShadow={'2xl'}
				rounded={'md'}
				overflow={'hidden'}
			>
				<Image
					h={'120px'}
					w={'full'}
					src={coverImage}
					objectFit="cover"
					alt="#"
					filter={'grayScale(1)'}
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

				<Box p={6}>
					<Stack spacing={0} align={'center'} mb={5}>
						<Heading
							fontSize={'2xl'}
							fontWeight={500}
							fontFamily={'body'}
						>
							{fullname}
						</Heading>
						<Text color={'gray.500'}>{bio}</Text>
					</Stack>

					<Stack direction={'row'} justify={'center'} spacing={6}>
						<Stack spacing={0} align={'center'}>
							<Text fontWeight={600}>{following?.length}</Text>
							<Text fontSize={'sm'} color={'gray.500'}>
								Following
							</Text>
						</Stack>
						<Stack spacing={0} align={'center'}>
							<Text fontWeight={600}>{followers?.length}</Text>
							<Text fontSize={'sm'} color={'gray.500'}>
								Followers
							</Text>
						</Stack>
					</Stack>

					<Link
						style={{
							textDecoration: 'none',
							color: 'inherit',
						}}
						className="linkbtn"
						to={`/profile/${_id}`}
					>
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
}
