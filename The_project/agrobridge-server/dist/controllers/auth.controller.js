"use strict";
// src/controllers/auth.controller.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCustomToken = exports.getUserProfile = exports.registerUser = void 0;
const admin = __importStar(require("firebase-admin"));
const prisma_1 = __importDefault(require("../utils/prisma")); // Import the Prisma client instance
const client_1 = require("@prisma/client"); // Import enums for type safety
// --- User Registration ---
const registerUser = async (req, res) => {
    // Destructure farmingSpecialization from req.body
    const { email, password, fullName, role, gender, country, state, lga, farmingSpecialization } = req.body;
    // Basic validation
    // Note: farmingSpecialization is optional in schema, so not required here for all roles
    if (!email || !password || !fullName || !role) {
        return res.status(400).json({ message: 'Missing required fields: email, password, fullName, role.' });
    }
    // Optional: Validate farmingSpecialization if role is FARMER
    if (role === client_1.UserRole.FARMER && farmingSpecialization && !(farmingSpecialization in client_1.FarmingSpecialization)) {
        return res.status(400).json({ message: 'Invalid farming specialization provided.' });
    }
    try {
        // 1. Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: fullName,
        });
        // 2. Store additional user details in PostgreSQL via Prisma
        const newUser = await prisma_1.default.user.create({
            data: {
                firebaseUid: userRecord.uid,
                email: userRecord.email,
                fullName,
                role: role, // Cast role to UserRole enum
                gender,
                country,
                state,
                lga,
                farmingSpecialization: farmingSpecialization, // Save specialization
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
                gender: newUser.gender,
                country: newUser.country,
                state: newUser.state,
                lga: newUser.lga,
                farmingSpecialization: newUser.farmingSpecialization, // Include in response
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            },
        });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        if (error.code === 'auth/email-already-in-use') {
            return res.status(409).json({ message: 'Email already registered with Firebase.', error: error.message });
        }
        if (error.code === 'auth/weak-password') {
            return res.status(400).json({ message: 'Password is too weak.', error: error.message });
        }
        res.status(500).json({ message: 'Failed to register user.', error: error.message });
    }
};
exports.registerUser = registerUser;
// --- Get User Profile (protected by Firebase token) ---
const getUserProfile = async (req, res) => {
    // req.currentUser is populated by the authenticateFirebaseToken middleware
    if (!req.currentUser) {
        return res.status(401).json({ message: 'User not authenticated.' });
    }
    try {
        // Find user in PostgreSQL using the Firebase UID
        const user = await prisma_1.default.user.findUnique({
            where: { firebaseUid: req.currentUser.uid },
            select: {
                id: true,
                firebaseUid: true,
                email: true,
                fullName: true,
                role: true,
                gender: true,
                country: true,
                state: true,
                lga: true,
                farmingSpecialization: true, // Also include specialization here
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            // This should ideally not happen if registration worked correctly
            return res.status(404).json({ message: 'User not found in database.' });
        }
        res.status(200).json({ message: 'User profile retrieved successfully.', user });
    }
    catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Failed to retrieve user profile.', error: error.message });
    }
};
exports.getUserProfile = getUserProfile;
// --- Generate Custom Token for Testing ---
const generateCustomToken = async (req, res) => {
    const { firebaseUid } = req.body;
    if (!firebaseUid) {
        return res.status(400).json({ message: 'Missing required field: firebaseUid' });
    }
    try {
        const customToken = await admin.auth().createCustomToken(firebaseUid);
        res.status(200).json({ message: 'Token generated successfully.', customToken });
    }
    catch (error) {
        console.error('Error generating custom token:', error);
        res.status(500).json({ message: 'Failed to generate custom token.', error: error.message });
    }
};
exports.generateCustomToken = generateCustomToken;
