// src/routes/auth.routes.ts

import { Router } from 'express';
import { generateCustomToken } from '../controllers/auth.controller'; // Only generateCustomToken

const router = Router();

// Route to generate a custom Firebase token for login (takes email/password)
router.post('/generate-token', generateCustomToken);

export default router;
