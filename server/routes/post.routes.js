import { Router } from 'express';
import {
	loadUser,
	loginUser,
	logoutUser,
	registerUser,
	updateProfile,
} from '../controllers/user.controller.js';
import { varifyJWT } from '../middlewares/auth.moddleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
	createPost,
	getOverallPosts,
	getPosts,
	likeAndUnlike,
} from '../controllers/post.controller.js';
const router = Router();

//	create Post Route
router
	.route('/createPost')
	.post(
		varifyJWT,
		upload.fields([{ name: 'post', maxCount: 1 }]),
		createPost
	);

// likeAndUnlike route
router.route('/likeAndUnlike').post(varifyJWT, likeAndUnlike);

// get all posts

router.route('/overallPosts').get(varifyJWT, getOverallPosts);

router.route('/allPosts/:userId').get(getPosts);
export default router;
