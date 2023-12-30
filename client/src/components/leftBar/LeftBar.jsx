import './leftBar.scss';
import Friends from '../../assets/1.png';
import GroupIcon from '@mui/icons-material/Group';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import EventIcon from '@mui/icons-material/Event';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import SocialProfileWithImage from '../profile/Profile';

const LeftBar = () => {
	const user = useSelector((state) => state.user?.userInfo);
	const display = useBreakpointValue({ base: 'none', xl: 'flex' });

	return (
		<Box
			width={{
				base: '0',
				sm: '250px',
				md: '250px',
				lg: '350px',
				xl: '350px',
			}}
			boxShadow={'lg'}
			display={{ base: 'none', md: 'flex', xl: 'flex' }}
			position={{ base: 'none', md: 'fixed', xl: 'fixed' }}
			height={'full'}
		>
			<Box className="container" px={2} width={'350px'}>
				<Box className="menu" width={'100%'}>
					<SocialProfileWithImage user={user} />
					<hr />
					<br />
					<Flex
						alignItems="center"
						justifyContent="space-between"
						gap={10}
						py={2}
					>
						<Link to="/friends">
							<GroupIcon fontSize="large" />
						</Link>
						<Text fontWeight={500}>Friends</Text>
					</Flex>
					<Flex
						alignItems="center"
						justifyContent="space-between"
						gap={10}
						py={2}
					>
						<Link to="/saved">
							<TurnedInIcon fontSize="large" />
						</Link>
						<Text fontWeight={500}>Saved</Text>
					</Flex>
					<Flex
						alignItems="center"
						justifyContent="space-between"
						gap={10}
						py={2}
					>
						<Link to="/videos">
							<OndemandVideoIcon fontSize="large" />
						</Link>
						<Text fontWeight={500}>Video</Text>
					</Flex>
					<Flex
						alignItems="center"
						justifyContent="space-between"
						gap={10}
						py={2}
					>
						<Link to="/events">
							<EventIcon fontSize="large" />
						</Link>
						<Text fontWeight={500}>Events</Text>
					</Flex>
					<Flex
						alignItems="center"
						justifyContent="space-between"
						gap={10}
						py={2}
					>
						<Link to="/gallary">
							<CollectionsIcon fontSize="large" />
						</Link>
						<Text fontWeight={500}>Gallary</Text>
					</Flex>
				</Box>
				<br />
			</Box>
		</Box>
	);
};

export default LeftBar;
