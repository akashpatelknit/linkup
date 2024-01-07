import './post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Comments from '../comments/Comments';
import { memo, useCallback, useEffect, useState } from 'react';
import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import date from 'date-and-time';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllPost,
	getOverAllPost,
	likeAndUnlikePost,
} from '../../app/postAction';
import { getComment } from '../../app/mAct';
import { calculateTimeSpent } from '../../utils/timeCalculate';
import LazyImage from '../LazyImage/LazyImage';
import { useLikePostMutation } from '../../api/auth/auth';
import { updateOverAllLikes } from '../../app/postSlice';

const Post = ({ post }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user?.userInfo);
	const { avatar, fullname, _id: userId } = post.owner;
	const { desc, img, likes, createdAt, _id } = post;
	const [commentOpen, setCommentOpen] = useState(false);
	const [relode, setRelode] = useState(false);

	const [likePost, { isLoading: isLikePost }] = useLikePostMutation();

	const [liked, setLiked] = useState(
		likes?.some((like) => like.userId === userInfo._id)
	);

	const dateFormatted = date.format(
		new Date(createdAt),
		'ddd, HH:mm, MMM DD YYYY'
	);

	const handleLike = useCallback(
		async (_id) => {
			try {
				const res = await likePost({ postId: _id });
				if (res.data) {
					setLiked((prev) => !prev);
					dispatch(
						updateOverAllLikes({ postId: _id, data: res.data })
					);
				}
			} catch (error) {
				console.log(error);
			}
		},
		[_id, dispatch]
	);

	const handleCommentOpenAndCloseAndFetch = useCallback(
		async (postId) => {
			setCommentOpen(!commentOpen);
			dispatch(getComment({ postId: postId }));
			console.log('get comment function');
		},
		[setCommentOpen, commentOpen]
	);

	useCallback(() => {
		dispatch(getComment({ postId: post?._id }));
		dispatch(getOverAllPost());
		console.log('get comment');
	}, [relode]);

	console.log('render');

	return (
		<Box
			className="post"
			pt={5}
			boxShadow={'md'}
			borderRadius={10}
			width={'100%'}
		>
			<Box className="container" p={2}>
				<Flex justifyContent={'space-between'}>
					<Flex className="userInfo">
						<Flex alignItems="center" gap={2}>
							<Avatar
								name={fullname}
								src={avatar}
								// filter={'grayScale(1)'}
							/>
							<Link
								to={`/profile/${userId}`}
								style={{
									textDecoration: 'none',
									color: 'inherit',
								}}
							>
								<Flex
									alignItems={'center'}
									justifyContent={'space-between'}
									gap={3}
								>
									<Text fontWeight={700}>{fullname} </Text>

									<Text fontWeight={500} fontSize={'sm'}>
										•{calculateTimeSpent(createdAt)} ago
									</Text>
								</Flex>
							</Link>
						</Flex>
					</Flex>
					<MoreHorizIcon />
				</Flex>
				<div className="content">
					<Text py={1} pl={2}>
						{desc}
					</Text>
					<Flex
						width="100%"
						margin={'auto'}
						justifyContent={'center'}
					>
						<LazyImage
							src={img}
							alt={img}
							width={'100%'}
							maxH={'500px'}
							objectFit={'cover'}
							objectPosition={'center'}
							borderRadius={10}
							// filter={'grayScale(1)'}
						/>
					</Flex>
				</div>
				<Flex
					mt={2}
					justifyContent={'space-between'}
					alignItems={'center'}
					py={2}
				>
					<Flex className="item">
						<Box cursor={'pointer'} onClick={() => handleLike(_id)}>
							{liked ? (
								<FavoriteOutlinedIcon />
							) : (
								<FavoriteBorderOutlinedIcon />
							)}
						</Box>
						{likes?.length} Likes
					</Flex>
					<Flex className="item">
						<Button
							onClick={() =>
								handleCommentOpenAndCloseAndFetch(post?._id)
							}
						>
							<TextsmsOutlinedIcon />
							{post?.commentsCount} Comments
						</Button>
					</Flex>
					<Flex className="item">
						<ShareOutlinedIcon />
						Share
					</Flex>
				</Flex>
				{commentOpen && <Comments post={post} setRelode={setRelode} />}
			</Box>
		</Box>
	);
};

export default memo(Post);
