import { Router } from 'express';
import {
	createComment,
	getComments,
} from '../controllers/comment.controller.js';
import { varifyJWT } from '../middlewares/auth.moddleware.js';
const router = Router();

router.route('/').get(varifyJWT, getComments);
router.route('/').post(varifyJWT, createComment);
export default router;
