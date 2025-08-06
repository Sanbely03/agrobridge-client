// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import admin from '../config/firebaseAdmin'; // Firebase Admin SDK
import prisma from '../utils/prisma'; // Prisma Client
import { UserRole } from '@prisma/client'; // Import UserRole for custom claims

// --- Generate Custom Firebase Token ---
// This endpoint takes email/password, looks up the user in Firebase,
// and then generates a custom token for that user's UID.
// This is primarily for backend-driven authentication flows or testing.
export const generateCustomToken = async (req: Request, res: Response) => {
  const { email, password } = req.body; // Expecting email and password for login

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required to generate a token.' });
  }

  try {
    // Step 1: Get the user record from Firebase Authentication by email.
    // This confirms the user exists in Firebase.
    const userRecord = await admin.auth().getUserByEmail(email);

    // Step 2: Fetch the user's details from your PostgreSQL database using their Firebase UID.
    // This is important to get their role and specialization for custom claims.
    const userInDb = await prisma.user.findUnique({
      where: { firebaseUid: userRecord.uid },
      select: {
        id: true,
        role: true,
        email: true,
        fullName: true,
        farmingSpecialization: true,
        laborSpecialization: true,
      },
    });

    if (!userInDb) {
      // This scenario indicates a mismatch between Firebase Auth and your DB.
      console.error(`User with Firebase UID ${userRecord.uid} not found in PostgreSQL DB.`);
      return res.status(404).json({ message: 'Authentication failed: User not found in database.' });
    }

    // Step 3: Create a custom token for the Firebase user's UID.
    // Include custom claims (like role, userId, specializations) in the token.
    // These claims can be accessed on the client-side after signing in with the custom token.
    const customToken = await admin.auth().createCustomToken(userRecord.uid, {
      role: userInDb.role,
      userId: userInDb.id,
      farmingSpecialization: userInDb.farmingSpecialization,
      laborSpecialization: userInDb.laborSpecialization,
    });

    res.status(200).json({
      message: 'Custom token generated successfully!',
      customToken,
      user: { // Return basic user info for convenience
        id: userInDb.id,
        email: userInDb.email,
        fullName: userInDb.fullName,
        role: userInDb.role,
        farmingSpecialization: userInDb.farmingSpecialization,
        laborSpecialization: userInDb.laborSpecialization,
      },
    });

  } catch (error: any) {
    console.error('Error generating custom token:', error);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
      // Be generic for security: don't specify if it's email or password
      return res.status(401).json({ message: 'Authentication failed: Invalid credentials.' });
    }
    res.status(500).json({ message: 'Failed to generate custom token.', error: error.message });
  }
};
