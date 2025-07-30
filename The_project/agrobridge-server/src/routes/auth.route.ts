// src/routes/auth.route.ts

import { Router } from 'express';
import { registerUser, getUserProfile } from '../controllers/auth.controller';
import { authenticateFirebaseToken } from '../middlewares/auth.middleware';

const router = Router();

// Public route for user registration
router.post('/register', registerUser);

// Protected route for fetching user profile
// This route will first go through the Firebase authentication middleware
router.get('/profile', authenticateFirebaseToken, getUserProfile);

export default router;