// src/routes/user.routes.ts

import { Router } from 'express';
import { registerUser, getUserProfile, getUserWallet } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct middleware import

const router = Router();

// Public route for user registration
router.post('/register', registerUser);

// Protected routes for user profile and wallet
router.get('/:id', authenticateToken, getUserProfile);
router.get('/:id/wallet', authenticateToken, getUserWallet);

export default router;
