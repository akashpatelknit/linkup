import './profile.scss';

import Posts from '../../components/posts/Posts.jsx';
import EditModal from '../../components/modal/Modal.jsx';
import {
	Box,
	Button,
	Flex,
	Image,
	Link,
	LinkOverlay,
	Text,
} from '@chakra-ui/react';
import LanguageIcon from '@mui/icons-material/Language';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSpecificUSer } from '../../app/userAction.js';
import { getAllPost } from '../../app/postAction.js';

const Profile = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadSpecificUSer({ userId }));
		dispatch(getAllPost({ userId }));
	}, [dispatch, userId]);

	const user = useSelector((state) => state.user?.spacificUser);
	const allPosts = useSelector((state) => state.posts?.allPosts);

	return (
		<Box width={'full'}>
			<Box width={'100%'} h={'300px'} position={'relative'}>
				<Box w={'100%'} h={'100%'} pos={'absolute'}>
					<Image
						src={user?.coverImage}
						alt={user?.fullname}
						width={'100%'}
						h={'100%'}
						objectFit={'cover'}
						borderRadius={10}
					/>
				</Box>

				<Box w={'100%'} h={'100%'} pos={'absolute'}>
					<Image
						src={user?.avatar}
						alt={user?.fullname}
						w={{ base: '150px', md: '200px' }}
						height={{ base: '150px', md: '200px' }}
						borderRadius={'50%'}
						objectFit={'cover'}
						pos={'absolute'}
						left={0}
						right={{ base: 'none', md: 0 }}
						margin={'auto'}
						top={{ base: '230px', md: '200px' }}
					/>
				</Box>
			</Box>

			<Box className="profileContainer">
				<Box
					padding={'50px'}
					mb={'20px'}
					display={'flex'}
					alignItems={'center'}
					className="uInfo"
					position={'relative'}
				>
					<Flex
						flex={1}
						alignItems={'center'}
						justifyContent={'flex-end'}
						gap={3}
						position={'absolute'}
						right={0}
						top={{ base: 5, md: '50px' }}
					>
						<Button>follow</Button>
						<EditModal user={user} />
					</Flex>
				</Box>
				<Box>
					<Text
						fontSize={'2xl'}
						fontWeight={'bold'}
						textAlign={{ base: 'left', md: 'center' }}
					>
						{user?.fullname}
					</Text>
					<Flex
						gap={3}
						justifyContent={{ base: 'flex-start', md: 'center' }}
					>
						<Text
							fontSize={'md'}
							fontWeight={'bold'}
							color={'gray.500'}
							textAlign={{ base: 'left', md: 'center' }}
						>
							{user?.bio}
						</Text>
						<Link to={user?.website}>
							<LanguageIcon />
						</Link>
					</Flex>
				</Box>
				<Posts allPosts={allPosts} />
			</Box>
		</Box>
	);
};

export default Profile;
