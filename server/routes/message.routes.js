import { Router } from 'express';

import { varifyJWT } from '../middlewares/auth.moddleware.js';
import {
	allMessages,
	sendMessages,
} from '../controllers/message.controller.js';

const router = Router();

router.route('/').post(varifyJWT, sendMessages);

router.route('/:chatId').get(varifyJWT, allMessages);

export default router;
