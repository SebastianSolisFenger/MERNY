import express from 'express';
import { registerUser } from '../Controllers/AuthController.js';
import { loginUser } from '../Controllers/AuthController.js';

const router = express.Router();

// router.get('/', async (req, res) => {
//   res.send('Auth Route');
// });

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
