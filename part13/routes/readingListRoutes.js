import express from 'express';
import { markAsRead } from '../controllers/readingListController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/:id', authenticate, markAsRead);

export default router;
