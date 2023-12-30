import { Router } from 'express';
import {
	followAndUnfollowUser,
	getFollowersList,
	getFriendsList,
	getSearchedUser,
	getUserById,
	loadUser,
	loginUser,
	logoutUser,
	registerUser,
	updateCoverPictrure,
	updateProfile,
	updateProfileDetails,
	updateProfilePictrure,
} from '../controllers/user.controller.js';
import { varifyJWT } from '../middlewares/auth.moddleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

// secured routes
router.route('/logout').post(varifyJWT, logoutUser);

// load user
router.route('/').get(varifyJWT, loadUser);

// update user profile

// follow and unfollow user
router.route('/follow').post(varifyJWT, followAndUnfollowUser);

// friends list
router.route('/friends').get(varifyJWT, getFriendsList);

// followers list
router.route('/followers').get(varifyJWT, getFollowersList);


// search user
router.route('/search').get(varifyJWT, getSearchedUser);

// load user by userId
router.route('/:userId').get(varifyJWT, getUserById);
export default router;
