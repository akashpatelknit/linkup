import { ChakraProvider } from '@chakra-ui/react';

const Layout = ({ children }) => {
	return <ChakraProvider>{children}</ChakraProvider>;
};

export default Layout;
