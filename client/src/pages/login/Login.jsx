import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginUserMutation } from '../../api/auth/auth';
import { loadUser } from '../../app/userAction';
// import { loginUser } from '../../app/userAction.js';

export default function Login() {
	const [loginData, setLoginData] = useState('');
	// const isLoading = false;
	const [loginUser, { data, isLoading, isSuccess }] = useLoginUserMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await loginUser(loginData);
			console.log(res);
			if (res.data) {
				dispatch(loadUser());
				navigate('/');
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
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
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
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								name="email"
								value={loginData.email || ''}
								onChange={(e) => {
									handleChange(e);
								}}
							/>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								name="password"
								value={loginData.password || ''}
								onChange={(e) => {
									handleChange(e);
								}}
							/>
						</FormControl>
						<Stack spacing={10}>
							<Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								justify={'space-between'}
							>
								<Checkbox>Remember me</Checkbox>
								<Text color={'blue.400'}>Forgot password?</Text>
							</Stack>
							<Button
								// bg={"blue.400"}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								bg={'#60C9CA'}
								onClick={handleSubmit}
								isLoading={isLoading}
							>
								Sign in
							</Button>
						</Stack>
					</Stack>
					<Stack pt={6}>
						<Text align={'center'}>
							Don't have a account{'  '}
							<Link href="/register" color={'blue'}>
								Register
							</Link>
						</Text>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
