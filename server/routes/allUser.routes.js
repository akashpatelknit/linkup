import { Router } from 'express';
import { getAllUsers } from '../controllers/allUser.controller.js';
import { varifyJWT } from '../middlewares/auth.moddleware.js';

const router = Router();

router.route('/').get(varifyJWT, getAllUsers);

export default router;
