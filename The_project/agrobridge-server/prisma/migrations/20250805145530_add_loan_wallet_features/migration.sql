/*
  Warnings:

  - A unique constraint covering the columns `[insurancePolicyId]` on the table `LoanRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."LoanRequest" ADD COLUMN     "insurancePolicyId" TEXT,
ADD COLUMN     "overseerId" TEXT,
ADD COLUMN     "veterinaryId" TEXT;

-- CreateTable
CREATE TABLE "public"."InsurancePolicy" (
    "id" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "coverageAmount" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "premium" DOUBLE PRECISION NOT NULL,
    "coveredRisks" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsurancePolicy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePolicy_policyNumber_key" ON "public"."InsurancePolicy"("policyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRequest_insurancePolicyId_key" ON "public"."LoanRequest"("insurancePolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "public"."User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "public"."LoanRequest" ADD CONSTRAINT "LoanRequest_overseerId_fkey" FOREIGN KEY ("overseerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoanRequest" ADD CONSTRAINT "LoanRequest_veterinaryId_fkey" FOREIGN KEY ("veterinaryId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoanRequest" ADD CONSTRAINT "LoanRequest_insurancePolicyId_fkey" FOREIGN KEY ("insurancePolicyId") REFERENCES "public"."InsurancePolicy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
