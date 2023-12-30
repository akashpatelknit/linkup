import { Router } from 'express';
import { varifyJWT } from '../middlewares/auth.moddleware.js';
import {
	accessChat,
	addToGroup,
	createGroupChat,
	fetchChats,
	removeFromGroup,
	renameGroup,
} from '../controllers/chat.controller.js';

const router = Router();

router.route('/').post(varifyJWT, accessChat);
router.route('/').get(varifyJWT, fetchChats);
router.route('/group').post(varifyJWT, createGroupChat);
router.route('/rename').put(varifyJWT, renameGroup);
router.route('/groupremove').put(varifyJWT, removeFromGroup);
router.route('/groupadd').put(varifyJWT, addToGroup);

export default router;
