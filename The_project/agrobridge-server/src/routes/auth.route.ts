// src/routes/auth.route.ts

import { Router } from 'express';
import { registerUser, getUserProfile, generateCustomToken } from '../controllers/auth.controller';
import { authenticateFirebaseToken } from '../middlewares/auth.middleware';

const router = Router();

// Public route for user registration
router.post('/register', registerUser);

// Protected route for fetching user profile
router.get('/profile', authenticateFirebaseToken, getUserProfile);

// New public route to generate a custom token for a given firebaseUid
// This is for development/testing purposes only
router.post('/generate-token', generateCustomToken);

export default router;
