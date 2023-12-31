import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const varifyJWT = asyncHandler(async (req, res, next) => {
	console.log(req.cookies)
	try {
		const token =
			req.cookies?.accessToken ||
			(req.headers.authorization &&
				req.headers.authorization.replace('Bearer ', ''));

		if (!token) {
			throw new ApiError(401, 'Unauthorized access');
		}
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		console.log(decodedToken)
		const user = await User.findById(decodedToken._id).select(
			'-password -refreshToken'
		);
		if (!user) {
			throw new ApiError(401, 'Unauthorized access');
		}
		req.user = user;
		next();
	} catch (error) {
		// console.log(error)
		throw new ApiError(401, error?.message || 'Unauthorized access');
	}
});
