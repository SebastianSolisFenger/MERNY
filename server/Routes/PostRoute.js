import express from 'express';
import { createPost } from '../Controllers/PostController.js';
import { getPost } from '../Controllers/PostController.js';
import { updatePost } from '../Controllers/PostController.js';
import { deletePost } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
