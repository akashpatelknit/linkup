import React from 'react';
import LeftBar from '../leftBar/LeftBar.jsx';
import RightBar from '../rightBar/RightBar.jsx';
import {
	ChakraProvider,
	Box,
	Flex,
	useBreakpointValue,
} from '@chakra-ui/react';
import Navbar from '../navbar/Navbar.jsx';
import MobileNavbarBottom from '../navbar/MobileNavbarBottom.jsx';

const Layout = ({ children }) => {
	const isDesktop = useBreakpointValue({ base: false, md: true });

	return (
		<ChakraProvider>
			<Navbar />
			<Flex as="main" pt={20}>
				{isDesktop && (
					<Flex flex={{ base: 0, md: 1, xl: 2 }}>
						<LeftBar />
					</Flex>
				)}
				<Flex flex={{ base: 1, md: 2, xl: 4 }} p={4}>
					{children}
				</Flex>
				{isDesktop && (
					<Flex flex={{ base: 0, md: 0, xl: 2 }}>
						<RightBar />
					</Flex>
				)}
			</Flex>
			<MobileNavbarBottom />
		</ChakraProvider>
	);
};

export default Layout;
