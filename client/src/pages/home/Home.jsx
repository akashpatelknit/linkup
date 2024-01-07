import Stories from '../../components/stories/Stories.jsx';
import Posts from '../../components/posts/Posts.jsx';
import Share from '../../components/share/Share.jsx';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOverAllPost } from '../../app/postAction.js';

const Home = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOverAllPost());
	}, [dispatch]);
	const overAllPosts = useSelector((state) => state.posts?.overAllPosts);
	return (
		<Box width={'full'}>
			{/* <Box px={20}><Stories /></Box> */}
			<Box>
				<Share />
				<Posts allPosts={overAllPosts} />
			</Box>
		</Box>
	);
};

export default Home;
