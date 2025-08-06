-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."LoanPurpose" ADD VALUE 'CROP_FARMING';
ALTER TYPE "public"."LoanPurpose" ADD VALUE 'LIVESTOCK';
ALTER TYPE "public"."LoanPurpose" ADD VALUE 'EQUIPMENT';
ALTER TYPE "public"."LoanPurpose" ADD VALUE 'GENERAL';
