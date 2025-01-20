import express from 'express';
import { addToReadingList, getReadingList, markAsRead } from '../controllers/readingList.js';

const router = express.Router();

router.post('/', addToReadingList);  // Agregar a la lista de lectura
router.get('/:user_id', getReadingList);  // Obtener lista de lectura de un usuario
router.put('/:id', markAsRead);  // Marcar blog como leído


export default router;
