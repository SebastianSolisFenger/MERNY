import express from 'express';
import { getUser } from '../Controllers/UserController.js';
import { updateUser } from '../Controllers/UserController.js';
import { deleteUser } from '../Controllers/UserController.js';
import { followUser } from '../Controllers/UserController.js';
import { UnFollowUser } from '../Controllers/UserController.js';
import { getAllUsers } from '../Controllers/UserController.js';

import authMiddleWare from '../MiddleWare/authMiddleWare.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', authMiddleWare, updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, UnFollowUser);

export default router;
