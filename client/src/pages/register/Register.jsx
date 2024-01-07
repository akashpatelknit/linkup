import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRegisterUserMutation } from '../../api/auth/auth';
import { useNavigate } from 'react-router-dom';
export default function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [fullname, setFullname] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [registerUser, { data, error, isLoading }] =
		useRegisterUserMutation();
	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			console.log(data);
			const res = await registerUser({
				fullname,
				email,
				username,
				password,
			});
			if (res.data) {
				navigate('/login');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'}>
						Sign up
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to enjoy all of our cool features ✌️
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl id="firstName" isRequired>
									<FormLabel>User Name</FormLabel>
									<Input
										type="text"
										value={username || ''}
										onChange={(e) =>
											setUsername(e.target.value)
										}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="lastName">
									<FormLabel>Full Name</FormLabel>
									<Input
										type="text"
										value={fullname || ''}
										onChange={(e) =>
											setFullname(e.target.value)
										}
									/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl id="email" isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type="emial"
								value={email || ''}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? 'text' : 'password'}
									value={password || ''}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() =>
											setShowPassword(
												(showPassword) => !showPassword
											)
										}
									>
										{showPassword ? (
											<ViewIcon />
										) : (
											<ViewOffIcon />
										)}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								isLoading={isLoading}
								size="lg"
								bg={'#60C9CA'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								onClick={handleRegister}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={'center'}>
								Already a user?{' '}
								<Link href="/login" color={'blue.400'}>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
