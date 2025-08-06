// src/controllers/loanRequest.controller.ts

import { Request, Response } from 'express';
import prisma from '../utils/prisma';
// Import LaborSpecialization here
import { UserRole, LoanStatus, LoanPurpose, FarmOwnershipStatus, CropType, LivestockCategory, LaborSpecialization } from '@prisma/client';
import { CustomRequest } from '../middlewares/authenticateToken';

// --- Create Loan Request ---
export const createLoanRequest = async (req: CustomRequest, res: Response) => {
  if (!req.currentUser || !req.user) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  // Only FARMERs can create loan requests
  if (req.user.role !== UserRole.FARMER) {
    return res.status(403).json({ message: 'Forbidden: Only farmers can create loan requests.' });
  }

  // NEW LOGIC: Check for existing active loan requests
  try {
    const activeLoanRequest = await prisma.loanRequest.findFirst({
      where: {
        farmerId: req.user.id,
        status: {
          in: [LoanStatus.PENDING, LoanStatus.APPROVED, LoanStatus.IN_PROGRESS, LoanStatus.DISBURSED],
        },
      },
    });

    if (activeLoanRequest) {
      return res.status(409).json({
        message: 'Conflict: You already have an active loan request (PENDING, APPROVED, IN_PROGRESS, or DISBURSED).',
        activeLoanRequestId: activeLoanRequest.id,
        activeLoanRequestStatus: activeLoanRequest.status,
      });
    }
  } catch (error: any) {
    console.error('Error checking for active loan requests:', error);
    return res.status(500).json({ message: 'Internal server error during loan request check.', error: error.message });
  }

  const {
    loanPurpose,
    locationState,
    locationLGA,
    locationVillage,
    farmAreaName,
    farmName,
    ownershipStatus,
    estimatedCost,
    requestedAmount,
    reason,
    // Crop-specific fields (optional)
    cropType,
    estimatedYield,
    // Livestock-specific fields (nested object)
    livestockDetails,
    // Guarantor fields (nested object)
    guarantor,
    // Document URLs (array of strings)
    documentUrls,
  } = req.body;

  // --- Basic Validation for universally required fields ---
  if (!loanPurpose || !locationState || !locationLGA || !locationVillage || !ownershipStatus || !estimatedCost || !requestedAmount || !reason) {
    return res.status(400).json({ message: 'Missing core required loan request fields (purpose, location, ownership, costs, reason).' });
  }

  // Validate Enums
  if (!Object.values(LoanPurpose).includes(loanPurpose)) {
    return res.status(400).json({ message: 'Invalid loanPurpose provided.' });
  }
  if (!Object.values(FarmOwnershipStatus).includes(ownershipStatus)) {
    return res.status(400).json({ message: 'Invalid ownershipStatus provided.' });
  }

  // --- Conditional Validation based on LoanPurpose and Farming Specialization ---
  if (loanPurpose === LoanPurpose.NEW_PROJECT || loanPurpose === LoanPurpose.UPGRADE) {
    // For projects, farmName is highly recommended
    if (!farmName) {
      return res.status(400).json({ message: 'Farm name is required for new projects or upgrades.' });
    }
  }

  // Handle Crop-specific loans
  if (cropType) {
    if (!Object.values(CropType).includes(cropType)) {
      return res.status(400).json({ message: 'Invalid cropType provided.' });
    }
    if (estimatedYield === undefined || estimatedYield === null) {
      return res.status(400).json({ message: 'Estimated yield is required when cropType is specified.' });
    }
  }

  // Handle Livestock-specific loans
  let createdLivestockDetails = null;
  if (livestockDetails) {
    // Validate livestockDetails fields
    if (!livestockDetails.livestockCategory || !Object.values(LivestockCategory).includes(livestockDetails.livestockCategory)) {
      return res.status(400).json({ message: 'Livestock category is required and must be valid for livestock loans.' });
    }
    // Add more specific validation for livestockDetails based on loanPurpose if needed
    // e.g., if NEW_PROJECT, then numberOfAnimals, costOfField might be required.

    // Create LivestockLoanDetails first
    try {
      createdLivestockDetails = await prisma.livestockLoanDetails.create({
        data: {
          livestockCategory: livestockDetails.livestockCategory,
          numberOfAnimals: livestockDetails.numberOfAnimals,
          costOfField: livestockDetails.costOfField,
          livestockPlan: livestockDetails.livestockPlan,
          feedingCost: livestockDetails.feedingCost,
          housingType: livestockDetails.housingType,
          waterSource: livestockDetails.waterSource,
          veterinaryPlan: livestockDetails.veterinaryPlan,
          marketStrategy: livestockDetails.marketStrategy,
        },
      });
    } catch (error: any) {
      console.error('Error creating livestock loan details:', error);
      return res.status(500).json({ message: 'Failed to create livestock loan details.', error: error.message });
    }
  }

  // Handle Guarantor details
  let createdGuarantor = null;
  if (guarantor) {
    if (!guarantor.name || !guarantor.placeOfWork || !guarantor.address || !guarantor.phoneNumber) {
      return res.status(400).json({ message: 'All guarantor details (name, place of work, address, phone number) are required if a guarantor is provided.' });
    }
    try {
      createdGuarantor = await prisma.guarantor.create({
        data: {
          name: guarantor.name,
          placeOfWork: guarantor.placeOfWork,
          address: guarantor.address,
          phoneNumber: guarantor.phoneNumber,
        },
      });
    } catch (error: any) {
      console.error('Error creating guarantor:', error);
      // If guarantor creation fails, clean up createdLivestockDetails if any
      if (createdLivestockDetails) {
        await prisma.livestockLoanDetails.delete({ where: { id: createdLivestockDetails.id } });
      }
      return res.status(500).json({ message: 'Failed to create guarantor details.', error: error.message });
    }
  }

  // --- Handle User Profile Updates (NIN, BVN, Phone Number) ---
  const userUpdates: { phoneNumber?: string; nin?: string; bvn?: string } = {};
  if (req.body.phoneNumber) userUpdates.phoneNumber = req.body.phoneNumber;
  if (req.body.nin) userUpdates.nin = req.body.nin;
  if (req.body.bvn) userUpdates.bvn = req.body.bvn;

  if (Object.keys(userUpdates).length > 0) {
    try {
      await prisma.user.update({
        where: { id: req.user.id },
        data: userUpdates,
      });
    } catch (error: any) {
      console.error('Error updating user profile with NIN/BVN/Phone:', error);
      if (createdLivestockDetails) {
        await prisma.livestockLoanDetails.delete({ where: { id: createdLivestockDetails.id } });
      }
      if (createdGuarantor) {
        await prisma.guarantor.delete({ where: { id: createdGuarantor.id } });
      }
      return res.status(500).json({ message: 'Failed to update user profile details (NIN/BVN/Phone).', error: error.message });
    }
  }

  try {
    const loanRequest = await prisma.loanRequest.create({
      data: {
        farmerId: req.user.id,
        loanPurpose: loanPurpose as LoanPurpose,
        locationState,
        locationLGA,
        locationVillage,
        farmAreaName,
        farmName,
        ownershipStatus: ownershipStatus as FarmOwnershipStatus,
        estimatedCost,
        requestedAmount,
        reason,
        status: LoanStatus.PENDING,

        documentUrls: documentUrls || [],

        ...(cropType && { cropType: cropType as CropType }),
        ...(estimatedYield !== undefined && estimatedYield !== null && { estimatedYield }),

        ...(createdLivestockDetails && { livestockDetailsId: createdLivestockDetails.id }),
        ...(createdGuarantor && { guarantorId: createdGuarantor.id }),
      },
      include: {
        livestockDetails: true,
        guarantor: true,
      },
    });

    // Initialize wallet for new users or update existing if not present
    let userWallet = await prisma.wallet.findUnique({
      where: { userId: req.user.id }
    });

    if (!userWallet) {
      userWallet = await prisma.wallet.create({
        data: {
          userId: req.user.id,
          withdrawableBalance: 0,
          unwithdrawableBalance: 0,
        }
      });
    }

    res.status(201).json({ message: 'Loan request created successfully!', loanRequest });
  } catch (error: any) {
    console.error('Error creating loan request:', error);
    // Rollback any created sub-records if the main loan request fails
    if (createdLivestockDetails) {
      await prisma.livestockLoanDetails.delete({ where: { id: createdLivestockDetails.id } });
    }
    if (createdGuarantor) {
      await prisma.guarantor.delete({ where: { id: createdGuarantor.id } });
    }
    res.status(500).json({ message: 'Failed to create loan request.', error: error.message });
  }
};


// --- Get All Loan Requests (for Investors/Admins) ---
export const getAllLoanRequests = async (req: CustomRequest, res: Response) => {
  if (!req.currentUser || !req.user) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  // Only ADMINs and INVESTORs can view all loan requests
  if (req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.INVESTOR) {
    return res.status(403).json({ message: 'Forbidden: Only administrators and investors can view all loan requests.' });
  }

  try {
    const loanRequests = await prisma.loanRequest.findMany({
      where: {
        // By default, only show PENDING loans to be reviewed
        // You can add query parameters later to filter by status, farmerId, etc.
        status: LoanStatus.PENDING,
      },
      include: {
        farmer: { // Include farmer details
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
            nin: true,
            bvn: true,
            farmingSpecialization: true,
            country: true,
            state: true,
            lga: true,
          },
        },
        livestockDetails: true, // Include livestock-specific details if available
        guarantor: true, // Include guarantor details if available
      },
      orderBy: {
        createdAt: 'asc', // Order by oldest first
      },
    });

    res.status(200).json({ message: 'Loan requests fetched successfully!', loanRequests });
  } catch (error: any) {
    console.error('Error fetching loan requests:', error);
    res.status(500).json({ message: 'Failed to fetch loan requests.', error: error.message });
  }
};

// --- Update Loan Request Status (Approve/Reject) ---
export const updateLoanRequestStatus = async (req: CustomRequest, res: Response) => {
  if (!req.currentUser || !req.user) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  // Only ADMINs can approve/reject loans
  if (req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({ message: 'Forbidden: Only administrators can update loan request status.' });
  }

  const { id } = req.params; // Loan request ID from URL
  const { status, approvedAmount, rejectionReason } = req.body; // New status and optional details

  // --- DEBUGGING LOGS START ---
  console.log('Received loan status update request:');
  console.log('Loan ID:', id);
  console.log('Raw status from req.body:', status);
  console.log('Type of status from req.body:', typeof status);
  // --- DEBUGGING LOGS END ---

  // CORRECTED: Explicitly cast status to LoanStatus enum for validation
  const newStatus = status as LoanStatus;

  // --- DEBUGGING LOGS START ---
  console.log('Casted newStatus:', newStatus);
  console.log('Does LoanStatus include newStatus?', Object.values(LoanStatus).includes(newStatus));
  // --- DEBUGGING LOGS END ---


  // Basic validation for status
  if (!newStatus || !Object.values(LoanStatus).includes(newStatus)) {
    return res.status(400).json({ message: 'Invalid or missing status for loan request update.' });
  }

  try {
    const loanRequest = await prisma.loanRequest.findUnique({
      where: { id },
      // CORRECTED: Use 'select' within 'farmer' to get specific fields, and include 'livestockDetails' directly
      include: {
        farmer: {
          select: {
            id: true,
            wallet: true,
            farmingSpecialization: true,
            role: true, // Include role to check if it's a farmer
            laborSpecialization: true // Include laborSpecialization for assignment logic
          }
        },
        livestockDetails: true // Include livestockDetails directly
      },
    });

    if (!loanRequest) {
      return res.status(404).json({ message: 'Loan request not found.' });
    }

    // Ensure only PENDING loans can be updated to APPROVED or REJECTED
    if (loanRequest.status !== LoanStatus.PENDING) { // Corrected PENDED to PENDING
      return res.status(400).json({ message: `Loan request is already ${loanRequest.status}. Cannot change status from non-PENDING.` });
    }

    let updatedLoanRequest;
    if (newStatus === LoanStatus.APPROVED) { // Use newStatus here
      if (approvedAmount === undefined || approvedAmount === null || approvedAmount <= 0) {
        return res.status(400).json({ message: 'Approved amount is required and must be positive for loan approval.' });
      }
      if (approvedAmount > loanRequest.requestedAmount) {
        return res.status(400).json({ message: 'Approved amount cannot exceed requested amount.' });
      }

      // --- Assignment Logic ---
      let assignedOverseerId: string | null = null;
      let assignedVeterinaryId: string | null = null;
      let createdInsurancePolicy = null;

      // 1. Assign Overseer (now a LABOR_WORKER with FIELD_OVERSEER specialization)
      const overseers = await prisma.user.findMany({
        where: {
          role: UserRole.LABOR_WORKER,
          laborSpecialization: LaborSpecialization.FIELD_OVERSEER,
        },
        select: { id: true },
        take: 1, // Get one available overseer
      });

      if (overseers.length > 0) {
        assignedOverseerId = overseers[0].id;
      } else {
        console.warn('No FIELD_OVERSEER found to assign to the loan. Proceeding without assignment.');
        // Optionally, you could return an error here if an overseer is mandatory
      }

      // 2. Assign Veterinary (if Livestock loan, now a LABOR_WORKER with VETERINARY specialization)
      // Check farmer's farmingSpecialization directly from the included farmer object
      if (loanRequest.farmer?.farmingSpecialization === 'LIVESTOCK' && loanRequest.livestockDetails) {
        const vets = await prisma.user.findMany({
          where: {
            role: UserRole.LABOR_WORKER,
            laborSpecialization: LaborSpecialization.VETERINARY,
          },
          select: { id: true },
          take: 1, // Get one available vet
        });

        if (vets.length > 0) {
          assignedVeterinaryId = vets[0].id;
        } else {
          console.warn('No VETERINARY found to assign to the livestock loan. Proceeding without assignment.');
          // Optionally, you could return an error here if a vet is mandatory for livestock loans
        }
      }

      // 3. Create Insurance Policy
      // For simplicity, we'll create a generic policy. In a real app, this would be more dynamic.
      try {
        createdInsurancePolicy = await prisma.insurancePolicy.create({
          data: {
            policyNumber: `AGROINS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            provider: 'AgroSure Insurance Plc',
            coverageAmount: approvedAmount * 1.05, // 5% more than approved amount for buffer
            startDate: new Date(),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year coverage
            premium: approvedAmount * 0.02, // 2% of approved amount as premium
            coveredRisks: ['drought', 'flood', 'pest_outbreak', 'disease'],
          },
        });
      } catch (error: any) {
        console.error('Error creating insurance policy:', error);
        // Decide how to handle this: fail loan approval, or proceed without insurance
        return res.status(500).json({ message: 'Failed to create insurance policy.', error: error.message });
      }


      // --- Loan Disbursement Logic (Your Business Rule) ---
      const withdrawablePercentage = 0.10; // 10%
      const unwithdrawablePercentage = 0.90; // 90%

      const withdrawablePart = approvedAmount * withdrawablePercentage;
      const unwithdrawablePart = approvedAmount * unwithdrawablePercentage;

      // Update loan request status and approval details
      updatedLoanRequest = await prisma.loanRequest.update({
        where: { id },
        data: {
          status: LoanStatus.APPROVED,
          approvedAmount: approvedAmount,
          approvedDate: new Date(),
          overseerId: assignedOverseerId, // Assign overseer
          veterinaryId: assignedVeterinaryId, // Assign veterinary
          insurancePolicyId: createdInsurancePolicy ? createdInsurancePolicy.id : null, // Assign insurance
        },
        include: {
          farmer: { include: { wallet: true } }, // Re-include updated wallet info
          overseer: true, // Include assigned overseer details
          veterinary: true, // Include assigned veterinary details
          insurancePolicy: true, // Include created insurance policy details
        },
      });

      // Update farmer's wallet (transactional update for safety)
      // Check if wallet exists on the farmer object that was included
      if (!loanRequest.farmer?.wallet) { // Use optional chaining here
          // This case should ideally not happen if wallet is created on user registration/loan request
          // but as a fallback, create it.
          await prisma.wallet.create({
              data: {
                  userId: loanRequest.farmer.id,
                  withdrawableBalance: withdrawablePart,
                  unwithdrawableBalance: unwithdrawablePart,
              }
          });
      } else {
          await prisma.wallet.update({
              where: { userId: loanRequest.farmer.id },
              data: {
                  withdrawableBalance: { increment: withdrawablePart },
                  unwithdrawableBalance: { increment: unwithdrawablePart },
              },
          });
      }

      res.status(200).json({
        message: 'Loan request approved and funds disbursed to wallet!',
        loanRequest: updatedLoanRequest,
        disbursement: {
          withdrawable: withdrawablePart,
          unwithdrawable: unwithdrawablePart,
        },
      });

    } else if (newStatus === LoanStatus.REJECTED) { // Use newStatus here
      if (!rejectionReason || rejectionReason.trim() === '') {
        return res.status(400).json({ message: 'Rejection reason is required for loan rejection.' });
      }

      updatedLoanRequest = await prisma.loanRequest.update({
        where: { id },
        data: {
          status: LoanStatus.REJECTED,
          rejectionReason: rejectionReason,
        },
      });
      res.status(200).json({ message: 'Loan request rejected.', loanRequest: updatedLoanRequest });

    } else {
      // For any other status, you might allow updates only from certain roles
      // or implement specific logic. For now, we only handle APPROVED and REJECTED
      return res.status(400).json({ message: 'Invalid status update. Only APPROVED or REJECTED are allowed from PENDING.' });
    }

  } catch (error: any) {
    console.error('Error updating loan request status:', error);
    res.status(500).json({ message: 'Failed to update loan request status.', error: error.message });
  }
};
