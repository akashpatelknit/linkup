import React, { useState } from 'react';
import ChakraProviderWrapper from '../useChakraProvider/ChakraProvider';
import EditIcon from '@mui/icons-material/Edit';
import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import {
	useUpdateAvatarMutation,
	useUpdateCoverMutation,
	useUpdateUserDetailMutation,
} from '../../api/auth/auth';
import { useDispatch } from 'react-redux';
import { loadSpecificUSer } from '../../app/userAction';

const EditModal = ({ user }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [coverImage, setCoverImage] = useState();
	const [avatar, setAvatar] = useState();
	const [bio, setBio] = useState('');
	const [website, setWebsite] = useState('');
	const [fullname, setFullname] = useState('');
	const dispatch = useDispatch();
	const [updateUserDetail, { isLoading: isUserDetailLoading }] =
		useUpdateUserDetailMutation();
	const [updateAvatar, { isLoading: isAvatarLoading }] =
		useUpdateAvatarMutation();
	const [updateCover, { isLoading: isCoverLoading }] =
		useUpdateCoverMutation();

	const handleUserDetailsUpdate = async () => {
		try {
			const res = await updateUserDetail({
				bio,
				website,
			});
			setBio('');
			setWebsite('');
			dispatch(loadSpecificUSer({ userId: user?._id }));
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	const handleCoverImage = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('cover', coverImage);
			const res = await updateCover(formData);
			setCoverImage();
			dispatch(loadSpecificUSer({ userId: user?._id }));
		} catch (error) {
			console.log(error);
		}
	};
	const handleAvatar = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('avatar', avatar);
			setAvatar();
			dispatch(loadSpecificUSer({ userId: user?._id }));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<ChakraProviderWrapper>
			<Button onClick={onOpen}>Edit Profile</Button>

			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex
							alignItems={'center'}
							justifyContent={'space-between'}
							py={2}
						>
							<Heading size="md" my={3}>
								Cover Image
							</Heading>
							<Button
								onClick={handleCoverImage}
								isLoading={isCoverLoading}
								loadingText="Uploading..."
							>
								Update Cover
							</Button>
						</Flex>
						<Box
							width={'100%'}
							position="relative"
							borderRadius={10}
						>
							<Image src={user?.coverImage} borderRadius={10} />
							<Box
								cursor="pointer"
								position="absolute"
								top={2}
								right={2}
								bg={'skyblue'}
								padding={1}
								borderRadius={5}
								height={8}
								width={8}
								display={'flex'}
								justifyContent={'center'}
								alignItems={'center'}
								// onClick={}
							>
								<Input
									type="file"
									id="cover"
									style={{ display: 'none' }}
									onChange={(e) => {
										setCoverImage(e.target.files[0]);
									}}
								/>
								<label
									htmlFor="cover"
									style={{ cursor: 'pointer' }}
								>
									<EditIcon />
								</label>
							</Box>
						</Box>
						<Flex
							alignItems={'center'}
							justifyContent={'space-between'}
							py={2}
						>
							<Heading size="md" my={3}>
								Profile Picture
							</Heading>
							<Button
								onClick={handleAvatar}
								isLoading={isAvatarLoading}
								loadingText="Uploading..."
							>
								Update Avatar
							</Button>
						</Flex>
						<Box
							width={'100%'}
							margin={'auto'}
							position="relative"
							borderRadius={10}
						>
							<form encType="multipart/form-data">
								<Image
									src={user?.avatar}
									borderRadius={'50%'}
									width={'100px'}
									height={'100px'}
								/>
								<Box
									cursor="pointer"
									position="absolute"
									top={2}
									right={2}
									bg={'skyblue'}
									padding={1}
									borderRadius={5}
									height={8}
									width={8}
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									// onClick={}
								>
									<input
										type="file"
										id="avatar"
										onChange={(e) =>
											setAvatar(e.target.files[0])
										}
									/>
									<label
										htmlFor="avatar"
										style={{ cursor: 'pointer' }}
									>
										<EditIcon />
									</label>
								</Box>
							</form>
						</Box>
						<Heading size="md" my={3}>
							Personal Information
						</Heading>
						<Flex
							width={'100%'}
							margin={'auto'}
							position="relative"
							borderRadius={10}
							flexDirection={'column'}
							gap={3}
						>
							<Box>
								<label htmlFor="email">Bio : {user?.bio}</label>
								<Input
									type="text"
									placeholder="Bio"
									value={bio}
									mt={2}
									onChange={(e) => setBio(e.target.value)}
								/>
							</Box>
							<Box>
								<label htmlFor="website">
									Website : {user?.website}
								</label>
								<Input
									type="text"
									placeholder="Website"
									value={website}
									mt={2}
									onChange={(e) => setWebsite(e.target.value)}
								/>
							</Box>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<Button
							variant="ghost"
							onClick={handleUserDetailsUpdate}
						>
							Update Personal Information
						</Button>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={onClose}
							isLoading={isUserDetailLoading}
							loadingText="Uploading..."
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</ChakraProviderWrapper>
	);
};

export default EditModal;
