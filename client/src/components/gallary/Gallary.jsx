import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createClient } from 'pexels';
import { Box, Grid, GridItem, Image } from '@chakra-ui/react';
const Gallary = () => {
	const client = createClient(
		'SL0BxRPHobvAYF6HmnOUU61HkJNertr8hxIJ0DRSoVMVCSppu2xnaGyc'
	);
	const query = 'Cars';
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			client.photos.search({ query, per_page: 20 }).then((photos) => {
				setData(photos.photos);
				console.log(photos.photos);
			});
		};

		fetchData();
	}, []);
	return (
		<div>
			<Grid templateColumns="repeat(4, 1fr)" gap={6} width={'100%'}>
				{data &&
					data.map((photo) => (
						<GridItem w="100%" key={photo.id}>
							<Box>
								<Image
									src={photo.src.portrait}
									alt="Dan Abramov"
									filter={'grayScale(1)'}
									width={'100%'}
									borderRadius={10}
								/>
							</Box>
						</GridItem>
					))}
			</Grid>
		</div>
	);
};

export default Gallary;
