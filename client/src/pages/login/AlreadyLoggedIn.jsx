import { Box, Center, Heading } from '@chakra-ui/react';
import React from 'react';

const AlreadyLoggedIn = () => {
	return (
		<Box pt={20} height={'80vh'}>
			<Center height={'100%'}>
				<Heading>You are already logged in.</Heading>
			</Center>
		</Box>
	);
};

export default AlreadyLoggedIn;
