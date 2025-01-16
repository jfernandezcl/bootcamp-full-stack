import express from 'express';
import { addUser, listUsers, changeUsername } from '../controllers/userController.js';

const router = express.Router();

router.post('/', addUser);
router.get('/', listUsers);
router.put('/:username', changeUsername);

export default router;
