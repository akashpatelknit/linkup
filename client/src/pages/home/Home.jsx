import { Box } from '@chakra-ui/react';
import { lazy, useEffect } from 'react';
import { useGetOverAllPostQuery } from '../../api/post/post.js';
const Posts = lazy(() => import('../../components/posts/Posts.jsx'));
const Share = lazy(() => import('../../components/share/Share.jsx'));

const Home = () => {
	const { data, error, isLoading } = useGetOverAllPostQuery();
	return (
		<Box width={'full'}>
			<Box>
				<Share />
				<Posts allPosts={data?.data} />
			</Box>
		</Box>
	);
};

export default Home;
