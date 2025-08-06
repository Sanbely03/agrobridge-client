// src/routes/loanRequest.routes.ts

import { Router } from 'express';
import { createLoanRequest, getAllLoanRequests, updateLoanRequestStatus } from '../controllers/loanRequest.controller'; // NEW: Import updateLoanRequestStatus
import { authenticateToken } from '../middlewares/authenticateToken';
import { checkRole } from '../middlewares/checkRole';
import { UserRole } from '@prisma/client';

const router = Router();

// Protected route for creating a loan request (POST)
router.post(
  '/',
  authenticateToken,
  checkRole([UserRole.FARMER]), // Only farmers can create loan requests
  createLoanRequest
);

// Protected route for getting all loan requests (GET)
router.get(
  '/',
  authenticateToken,
  checkRole([UserRole.ADMIN, UserRole.INVESTOR]), // Only admins and investors can view all loan requests
  getAllLoanRequests
);

// NEW: Protected route for updating loan request status (PATCH)
router.patch(
  '/:id/status', // Matches /api/loan-requests/:id/status
  authenticateToken,
  checkRole([UserRole.ADMIN]), // Only admins can approve/reject loan requests
  updateLoanRequestStatus
);

export default router;
