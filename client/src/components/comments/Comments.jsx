// import { useContext } from "react";
import { Avatar, Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import './comments.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createComment, getComment } from '../../app/mAct';
import { useState } from 'react';
import date from 'date-and-time';
import { calculateTimeSpent } from '../../utils/timeCalculate';
import { useCreateCommentMutation } from '../../api/auth/auth';

const Comments = ({ post, setRelode }) => {
	const [commentContent, setCommentContent] = useState('');
	const [createComment, { isLoading: isCommentPosting }] =
		useCreateCommentMutation();
	const dispatch = useDispatch();
	const handleCreateComment = async () => {
		try {
			const res = await createComment({
				content: commentContent,
				postId: post?._id,
			});
			dispatch(getComment({ postId: post?._id }));
			setCommentContent('');
		} catch (error) {
			console.log(error);
			setCommentContent('');
		}
	};
	console.log('comments render');
	const { comments } = useSelector((state) => state.message);
	return (
		<Box mt={5}>
			<Flex alignItems={'center'} gap={4}>
				<Input
					type="text"
					placeholder="write a comment..."
					my={2}
					value={commentContent}
					onChange={(e) => setCommentContent(e.target.value)}
				/>
				<Button
					onClick={handleCreateComment}
					isLoading={isCommentPosting}
				>
					Send
				</Button>
			</Flex>
			{comments?.map((comment) => (
				<Flex py={2} gap={3}>
					<Avatar
						src={comment.user?.avatar}
						name={comment.user.fullname}
					/>
					<Flex flexDirection={'column'}>
						<Flex gap={3} justifyContent={'space-between'}>
							<Link to={`/profile/${comment.user._id}`}>
								<Text fontWeight={'500'}>
									{comment.user.fullname}
								</Text>
							</Link>
							<Text fontSize={'sm'}>
								• {calculateTimeSpent(comment.createdAt)} ago
							</Text>
						</Flex>
						<p>{comment.content}</p>
					</Flex>
				</Flex>
			))}
		</Box>
	);
};

export default Comments;
