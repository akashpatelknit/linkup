import cloudinary from 'cloudinary';
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
		const response = await cloudinary.v2.uploader.upload(localFilePath);
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
