/*
  Warnings:

  - You are about to drop the column `landSize` on the `LoanRequest` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `LoanRequest` table. All the data in the column will be lost.
  - The `cropType` column on the `LoanRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[livestockDetailsId]` on the table `LoanRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guarantorId]` on the table `LoanRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nin]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bvn]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."CropType" AS ENUM ('MAIZE', 'CASSAVA', 'YAM', 'COCOA', 'RICE', 'SOYBEANS', 'GROUNDNUT', 'MILLET', 'SORGHUM', 'WHEAT', 'TOMATOES', 'PEPPER', 'ONION', 'POTATOES', 'PLANTAIN', 'BANANA', 'OIL_PALM', 'RUBBER', 'CASH_CROPS', 'FOOD_CROPS', 'OTHER_CROP');

-- CreateEnum
CREATE TYPE "public"."FarmOwnershipStatus" AS ENUM ('OWNED', 'RENTED', 'LEASED', 'FAMILY', 'COMMUNITY', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."LoanPurpose" AS ENUM ('NEW_PROJECT', 'UPGRADE', 'SUPPORT');

-- AlterEnum
ALTER TYPE "public"."LivestockCategory" ADD VALUE 'OTHER_LIVESTOCK';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."LoanStatus" ADD VALUE 'OVERDUE';
ALTER TYPE "public"."LoanStatus" ADD VALUE 'DISBURSED';

-- AlterTable
ALTER TABLE "public"."LoanRequest" DROP COLUMN "landSize",
DROP COLUMN "location",
ADD COLUMN     "documentUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "farmAreaName" TEXT,
ADD COLUMN     "farmName" TEXT,
ADD COLUMN     "guarantorId" TEXT,
ADD COLUMN     "livestockDetailsId" TEXT,
ADD COLUMN     "loanPurpose" "public"."LoanPurpose" NOT NULL DEFAULT 'NEW_PROJECT',
ADD COLUMN     "locationLGA" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "locationState" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "locationVillage" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "ownershipStatus" "public"."FarmOwnershipStatus" NOT NULL DEFAULT 'OTHER',
DROP COLUMN "cropType",
ADD COLUMN     "cropType" "public"."CropType",
ALTER COLUMN "estimatedYield" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "bvn" TEXT,
ADD COLUMN     "isProfileComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nin" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateTable
CREATE TABLE "public"."Guarantor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "placeOfWork" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Wallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "withdrawableBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "unwithdrowableBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LivestockLoanDetails" (
    "id" TEXT NOT NULL,
    "livestockCategory" "public"."LivestockCategory" NOT NULL,
    "numberOfAnimals" INTEGER,
    "costOfField" DOUBLE PRECISION,
    "livestockPlan" TEXT,
    "feedingCost" DOUBLE PRECISION,
    "housingType" TEXT,
    "waterSource" TEXT,
    "veterinaryPlan" TEXT,
    "marketStrategy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LivestockLoanDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "public"."Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRequest_livestockDetailsId_key" ON "public"."LoanRequest"("livestockDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRequest_guarantorId_key" ON "public"."LoanRequest"("guarantorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_nin_key" ON "public"."User"("nin");

-- CreateIndex
CREATE UNIQUE INDEX "User_bvn_key" ON "public"."User"("bvn");

-- AddForeignKey
ALTER TABLE "public"."LoanRequest" ADD CONSTRAINT "LoanRequest_livestockDetailsId_fkey" FOREIGN KEY ("livestockDetailsId") REFERENCES "public"."LivestockLoanDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoanRequest" ADD CONSTRAINT "LoanRequest_guarantorId_fkey" FOREIGN KEY ("guarantorId") REFERENCES "public"."Guarantor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
