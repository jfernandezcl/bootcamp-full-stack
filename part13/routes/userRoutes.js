import express from 'express';
import { listUsers, addUser, changeUsername, getUserById } from '../controllers/userController.js';
import { getUser } from '../controllers/userControllerB.js';

const router = express.Router();

router.get('/', listUsers);
router.post('/', addUser);
router.put('/:username', changeUsername);
router.get('/:id', getUserById); // Ruta actualizada
router.get('/:id', getUser);

export default router;
