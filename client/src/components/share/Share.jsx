import './share.scss';
import Image from '../../assets/img.png';
import Map from '../../assets/map.png';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MapIcon from '@mui/icons-material/Map';
import Diversity1Icon from '@mui/icons-material/Diversity1';

import { Avatar, Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import ButtonSpinner from '../loaderButton/ButtonSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { createPost, getOverAllPost } from '../../app/postAction';

const Share = () => {
	const [post, setPost] = useState();
	const [desc, setDesc] = useState('');
	const dispatch = useDispatch();
	const { avatar, fullname } = useSelector((state) => state.user?.userInfo);
	const { loading } = useSelector((state) => state.posts);
	const display = {
		base: 'none',
		md: 'flex',
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', post);
		formData.append('desc', desc);
		await dispatch(createPost(formData));
		setDesc('');
		dispatch(getOverAllPost());
	};
	// console.log(post, desc);
	return (
		<Box
			className="share"
			boxShadow={'md'}
			borderRadius={10}
			my={5}
			width={'full'}
		>
			<Box className="container">
				{/* <form encType="multipart/form-data"> */}
				<Flex alignItems="center" gap={4} p="2">
					<Avatar
						name={fullname}
						src={avatar}
						// filter={'grayScale(1)'}
					/>
					<input
						type="text"
						name="desc"
						value={desc}
						placeholder={`What's on your mind......`}
						onChange={(e) => setDesc(e.target.value)}
					/>
				</Flex>
				<hr />
				<Flex justifyContent={'space-between'} py={2}>
					<Flex justifyContent={'space-evenly'} flex={2}>
						<Flex>
							<input
								type="file"
								id="file"
								style={{ display: 'none' }}
								name="post"
								onChange={(e) => {
									setPost(e.target.files[0]);
								}}
							/>
							<label htmlFor="file">
								<Flex alignItems={'center'} gap={2}>
									<Box
										// bg="palegreen"
										p={1}
										borderRadius={5}
										height={10}
										width={10}
										cursor={'pointer'}
									>
										<AddPhotoAlternateIcon
											sx={{ fontSize: 30 }}
										/>
									</Box>
									<Text display={display}>Add Image</Text>
								</Flex>
							</label>
						</Flex>
						<Flex alignItems={'center'} gap={2}>
							<Box
								// bg="palegreen"
								p={1}
								borderRadius={5}
								height={10}
								width={10}
								cursor={'pointer'}
							>
								<MapIcon sx={{ fontSize: 30 }} />
							</Box>
							<Text display={display}>Add Place</Text>
						</Flex>
						<Flex alignItems={'center'} gap={2}>
							<Box
								// bg="palegreen"
								p={1}
								borderRadius={5}
								height={10}
								width={10}
								cursor={'pointer'}
							>
								<Diversity1Icon sx={{ fontSize: 30 }} />
							</Box>
							<Text display={display}>Tag Friends</Text>
						</Flex>
						<Flex
							flex={{ base: 0, md: 1 }}
							justifyContent={'flex-end'}
							mr={3}
						>
							<Button
								onClick={handleSubmit}
								isLoading={loading}
								loadingText="Posting"
							>
								Share
							</Button>
						</Flex>
					</Flex>
				</Flex>
				{/* </form> */}
			</Box>
		</Box>
	);
};

export default Share;
