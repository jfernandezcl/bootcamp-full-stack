import express from 'express';
import { addUser, listUsers, changeUsername } from '../controllers/userController.js';
import { getUserById } from '../controllers/user.js';

const router = express.Router();

router.post('/', addUser);
router.get('/', listUsers);
router.put('/:username', changeUsername);
router.get('/:id', getUserById);

export default router;
