// src/controllers/user.controller.ts

import { Request, Response } from 'express';
import admin from '../config/firebaseAdmin'; // Firebase Admin SDK
import prisma from '../utils/prisma'; // Prisma Client
import { UserRole, FarmingSpecialization, LaborSpecialization } from '@prisma/client'; // Enums
import { CustomRequest } from '../middlewares/authenticateToken'; // Import CustomRequest

// --- User Registration ---
export const registerUser = async (req: Request, res: Response) => {
  const {
    email,
    password,
    fullName,
    role,
    farmingSpecialization,
    laborSpecialization, // Ensure this is destructured
    phoneNumber,
    nin,
    bvn,
    country,
    state,
    lga,
    gender,
    latitude,
    longitude,
  } = req.body;

  // Basic validation
  if (!email || !password || !fullName || !role) {
    return res.status(400).json({ message: 'Missing required registration fields (email, password, fullName, role).' });
  }

  // Validate UserRole enum
  if (!Object.values(UserRole).includes(role)) {
    return res.status(400).json({ message: 'Invalid user role provided.' });
  }

  // Conditional validation for FARMER role
  if (role === UserRole.FARMER) {
    if (!farmingSpecialization || !Object.values(FarmingSpecialization).includes(farmingSpecialization)) {
      return res.status(400).json({ message: 'Farming specialization is required and must be valid for farmers.' });
    }
  }

  // Conditional validation for LABOR_WORKER role
  if (role === UserRole.LABOR_WORKER) {
    if (!laborSpecialization || !Object.values(LaborSpecialization).includes(laborSpecialization)) {
      return res.status(400).json({ message: 'Labor specialization is required and must be valid for labor workers.' });
    }
  }


  try {
    // 1. Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    // 2. Create corresponding user record in PostgreSQL database
    const newUser = await prisma.user.create({
      data: {
        firebaseUid: userRecord.uid,
        email,
        fullName,
        role: role as UserRole, // Cast to UserRole enum
        farmingSpecialization: farmingSpecialization ? (farmingSpecialization as FarmingSpecialization) : null,
        laborSpecialization: laborSpecialization ? (laborSpecialization as LaborSpecialization) : null, // CORRECTLY SAVE THIS
        phoneNumber,
        nin,
        bvn,
        country,
        state,
        lga,
        gender,
        latitude,
        longitude,
        isProfileComplete: true, // Assuming initial registration completes basic profile
      },
    });

    // 3. Initialize a Wallet for the new user
    await prisma.wallet.create({
      data: {
        userId: newUser.id,
        withdrawableBalance: 0,
        unwithdrawableBalance: 0,
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
        farmingSpecialization: newUser.farmingSpecialization,
        laborSpecialization: newUser.laborSpecialization, // Include in response
      },
    });

  } catch (error: any) {
    console.error('Error during user registration:', error);
    if (error.code === 'auth/email-already-in-use') {
      return res.status(409).json({ message: 'Registration failed: Email already in use.' });
    }
    res.status(500).json({ message: 'Failed to register user.', error: error.message });
  }
};


// --- Get User Profile ---
export const getUserProfile = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  if (!req.currentUser || !req.user) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  // Ensure user can only view their own profile or if they are an admin
  if (req.user.id !== id && req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({ message: 'Forbidden: You can only view your own profile unless you are an Admin.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        wallet: true,
        businessProfile: true,
        supplierProfile: true,
        deliveryPartnerProfile: true,
        vetProfile: true,
        overseerProfile: true,
        laborWorkerProfile: true,
        loanRequests: true, // Include their loan requests
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Remove sensitive data before sending
    const { firebaseUid, ...userWithoutFirebaseUid } = user;

    res.status(200).json({ message: 'User profile fetched successfully!', user: userWithoutFirebaseUid });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to fetch user profile.', error: error.message });
  }
};

// --- Get User Wallet ---
export const getUserWallet = async (req: CustomRequest, res: Response) => {
  const { id } = req.params; // User ID from URL

  if (!req.currentUser || !req.user) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  // A user can only view their own wallet, or an Admin can view any wallet
  if (req.user.id !== id && req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({ message: 'Forbidden: You can only view your own wallet unless you are an Admin.' });
  }

  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId: id },
    });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found for this user.' });
    }

    res.status(200).json({ message: 'Wallet fetched successfully!', wallet });
  } catch (error: any) {
    console.error('Error fetching user wallet:', error);
    res.status(500).json({ message: 'Failed to fetch user wallet.', error: error.message });
  }
};
