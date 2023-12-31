import { Router } from 'express';
import {
	updateCoverPictrure,
	updateProfileDetails,
	updateProfilePictrure,
} from '../controllers/user.controller.js';
import { varifyJWT } from '../middlewares/auth.moddleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import singleUpload from '../middlewares/multer1.js';

const router = Router();

router.route('/updateCover').post(singleUpload, varifyJWT, updateCoverPictrure);
router
	.route('/updateProfile')
	.post(singleUpload, varifyJWT, updateProfilePictrure);

router.route('/updateDetails').post(varifyJWT, updateProfileDetails);

export default router;
