import express from 'express';
import { listUsers, addUser, changeUsername, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.get('/', listUsers);
router.post('/', addUser);
router.put('/:username', changeUsername);
router.get('/:id', getUserById); // Ruta actualizada

export default router;
