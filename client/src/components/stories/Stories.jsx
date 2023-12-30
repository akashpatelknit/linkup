import { Box, Flex, Image } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
const Stories = () => {
	const stories = [
		{
			id: 1,
			name: 'John Doe',
			img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
		},
		{
			id: 2,
			name: 'John Doe',
			img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
		},
		{
			id: 3,
			name: 'John Doe',
			img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
		},
		{
			id: 4,
			name: 'John Doe',
			img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
		},
	];
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};
	return (
		<Flex className="stories" height={'100px'} width={'100%'} bg={'red'}>
			<Slider {...settings}>
				<Box>
					<Image
						src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
						alt=""
						filter={'grayScale(1)'}
						width={'100px'}
					/>
					<span>Akash patel</span>
					<button>+</button>
				</Box>
				{/* {stories.map((story) => (
					<Box className="story" key={story.id}>
						<Image
							filter={'grayScale(1)'}
							src={story.img}
							alt=""
							width={'100%'}
						/>
						<span>{story.name}</span>
					</Box>
				))} */}
			</Slider>
		</Flex>
	);
};

export default Stories;
