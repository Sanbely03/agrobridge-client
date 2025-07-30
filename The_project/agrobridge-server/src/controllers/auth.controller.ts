// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import prisma from '../utils/prisma'; // Import the Prisma client instance

// --- User Registration ---
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, fullName, role, gender, country, state, lga } = req.body;

  // Basic validation
  if (!email || !password || !fullName || !role) {
    return res.status(400).json({ message: 'Missing required fields: email, password, fullName, role.' });
  }

  try {
    // 1. Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    // 2. Store additional user details in PostgreSQL via Prisma
    const newUser = await prisma.user.create({
      data: {
        firebaseUid: userRecord.uid, // Link to Firebase UID
        email: userRecord.email!,
        fullName,
        role,
        gender,
        country,
        state,
        lga,
      },
    });

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: newUser.id,
        firebaseUid: newUser.firebaseUid,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    console.error('Error during user registration:', error);

    // Handle specific Firebase errors
    if (error.code === 'auth/email-already-in-use') {
      return res.status(409).json({ message: 'Email already registered with Firebase.', error: error.message });
    }
    if (error.code === 'auth/weak-password') {
      return res.status(400).json({ message: 'Password is too weak.', error: error.message });
    }

    // Generic error response
    res.status(500).json({ message: 'Failed to register user.', error: error.message });
  }
};

// --- Get User Profile (protected by Firebase token) ---
export const getUserProfile = async (req: Request, res: Response) => {
  // req.currentUser is populated by the authenticateFirebaseToken middleware
  if (!req.currentUser) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  try {
    // Find user in PostgreSQL using the Firebase UID
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.currentUser.uid },
      select: { // Select specific fields to return
        id: true,
        firebaseUid: true,
        email: true,
        fullName: true,
        role: true,
        gender: true,
        country: true,
        state: true,
        lga: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      // This should ideally not happen if registration worked correctly
      return res.status(404).json({ message: 'User not found in database.' });
    }

    res.status(200).json({ message: 'User profile retrieved successfully.', user });
  } catch (error: any) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Failed to retrieve user profile.', error: error.message });
  }
};