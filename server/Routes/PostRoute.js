import express from 'express';
import { createPost } from '../Controllers/PostController.js';
import { getPost } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);

export default router;
