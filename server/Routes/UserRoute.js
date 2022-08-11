import express from 'express';
import { getUser } from '../Controllers/UserController.js';
import { updateUser } from '../Controllers/UserController.js';

const router = express.Router();

router.get('/:id', getUser);
router.put('/:id', updateUser);

export default router;
