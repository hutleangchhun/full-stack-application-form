import express from 'express';
import { handleMessage } from '../controllers/messageController.js';

const router = express.Router();

router.post('/send', handleMessage);

export default router;
