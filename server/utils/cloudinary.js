import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { ApiError } from './ApiError.js';

cloudinary.config({
	cloud_name: 'dn7avilos',
	api_key: '184659772994836',
	api_secret: 'yaj_l9umEFt6qzJCUWsF46zrfRU',
});

const uploadOnCloudinary = async (localFilePath) => {
	try {
		if (!localFilePath) return null;
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: 'auto',
		});

		// file uploaded on cloudinary successfully
		// console.log('File uploaded on cloudinary successfully', response.url);
		fs.unlinkSync(localFilePath);
		// remove file from local storage
		// fs.unlinkSync(localFilePath);
		return response;
	} catch (err) {
		fs.unlinkSync(localFilePath); // remove file from local storage if error occurs while uploading on cloudinary
		return new ApiError(
			500,
			'Something went wrong while uploading file',
			err
		);
	}
};

export { uploadOnCloudinary };
