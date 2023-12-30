import { Router } from 'express';
import {
	updateCoverPictrure,
	updateProfileDetails,
	updateProfilePictrure,
} from '../controllers/user.controller.js';
import { varifyJWT } from '../middlewares/auth.moddleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router
	.route('/updateCover')
	.post(
		upload.fields([{ name: 'cover', maxCount: 1 }]),
		varifyJWT,
		updateCoverPictrure
	);
router
	.route('/updateProfile')
	.post(
		upload.fields([{ name: 'avatar', maxCount: 1 }]),
		varifyJWT,
		updateProfilePictrure
	);
router.route('/updateDetails').post(varifyJWT, updateProfileDetails);

export default router;
