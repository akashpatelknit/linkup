import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Input,
	useBreakpointValue,
	Flex,
	Box,
	Text,
} from '@chakra-ui/react';
import GroupIcon from '@mui/icons-material/Group';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import EventIcon from '@mui/icons-material/Event';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import SocialProfileWithImage from '../profile/Profile.jsx';
function DrawerExample() {
	const user = useSelector((state) => state.user?.userInfo);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const display = useBreakpointValue({
		base: 'flex',
		md: 'flex',
		lg: 'none',
	});
	return (
		<>
			<Button
				ref={btnRef}
				colorScheme="teal"
				onClick={onOpen}
				display={display}
			>
				Open
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef}
				marginTop={'80px'}
			>
				<DrawerOverlay marginTop={'80px'} />
				<DrawerContent marginTop={'80px'}>
					<DrawerBody>
						<Box className="menu" width={'full'}>
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
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Close
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default DrawerExample;
