import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/send', authMiddleware, sendMessage);
router.get('/messages/:recipient', authMiddleware, getMessages);

export default router;