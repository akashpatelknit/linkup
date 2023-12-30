import {
	Avatar,
	Box,
	Drawer,
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StoreIcon from '@mui/icons-material/Store';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useBreakpoint } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DrawerExample from '../sidebar/Sidebar.jsx';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const { avatar, fullname } = useSelector((state) => state.user?.userInfo);
	const display = useBreakpointValue({
		base: 'none',
		md: 'none',
		lg: 'flex',
	});
	return (
		<Flex
			alignItems={'center'}
			boxShadow={'md'}
			pos={'fixed'}
			zIndex={999}
			bg={'white'}
			height={'80px'}
			width={'full'}
		>
			<Box flex="1" p="4" display={display}>
				<Flex gap={2} alignItems={'center'} justifyContent={'center'}>
					<Avatar
						name={fullname}
						src={avatar}
						filter={'grayscale(1)'}
					/>
					<InputGroup>
						<Input placeholder="Search..." outline={'none'} />
						<InputRightElement>
							<IconButton
								aria-label="Search"
								icon={<SearchIcon />}
								variant="ghost"
							/>
						</InputRightElement>
					</InputGroup>
				</Flex>
			</Box>

			<Box flex={{ base: 1, md: 2 }} py="4" width={'100%'}>
				<Flex
					gap={1}
					alignItems={'center'}
					justifyContent={'space-evenly'}
					width={'100%'}
				>
					<Link to="/">
						<HomeIcon fontSize="large" />
					</Link>
					<Link to="/flag">
						<FlagIcon fontSize="large" />
					</Link>
					<Link to="/video">
						<OndemandVideoIcon fontSize="large" />
					</Link>
					<Link to="/">
						<MessageIcon fontSize="large" />
					</Link>
				</Flex>
			</Box>

			<Box flex="1" p="4" display={display}>
				<Flex
					gap={10}
					alignItems={'center'}
					justifyContent={'flex-end'}
				>
					<Flex alignItems={'center'}>
						<Avatar
							name={fullname}
							src={avatar}
							filter={'grayscale(1)'}
						/>
						<Text fontWeight={'bold'}>{fullname}</Text>
					</Flex>

					<NotificationsIcon fontSize="large" />
				</Flex>
			</Box>
		</Flex>
	);
};

export default Navbar;
