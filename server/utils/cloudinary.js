import cloudinary from 'cloudinary';
import { ApiError } from './ApiError.js';
import axios from 'axios';

cloudinary.config({
	cloud_name: 'dn7avilos',
	api_key: '184659772994836',
	api_secret: 'yaj_l9umEFt6qzJCUWsF46zrfRU',
});

const uploadOnCloudinary = async (localFilePath) => {
	try {
		if (!localFilePath) return null;
		const response = await cloudinary.v2.uploader.upload(localFilePath);

		// const responseTiny = await axios.post(
		// 	'https://api.tinify.com/shrink',
		// 	response.secure_url,
		// 	{
		// 		headers: {
		// 			Authorization: `Basic ${Buffer.from(
		// 				'api:dRXRYSryD27km3FrdSzbZMwpwZkbGrT5'
		// 			).toString('base64')}`,
		// 		},
		// 	}
		// );
		// console.log(response.secure_url);
		// // Fetch compressed image data
		// const compressedDataUrl = responseTiny.data.output.url;
		// const compressedImageData = await axios.get(compressedDataUrl, {
		// 	responseType: 'arraybuffer',
		// });
		// console.log(compressedImageData);
		return response;
	} catch (err) {
		return new ApiError(
			500,
			'Something went wrong while uploading file',
			err
		);
	}
};

export { uploadOnCloudinary };
