import { useEffect } from 'react';
import Post from '../post/Post';
import './posts.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPost } from '../../app/postAction';
import { Box } from '@chakra-ui/react';
const Posts = ({ allPosts }) => {
	return (
		<Box pb={20}>
			{allPosts?.map((post) => (
				<Post post={post} key={post._id} />
			))}
		</Box>
	);
};

export default Posts;
