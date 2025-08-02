-- AlterEnum
ALTER TYPE "public"."UserRole" ADD VALUE 'LABOR_WORKER';

-- CreateTable
CREATE TABLE "public"."LaborWorkerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "availability" TEXT,
    "contactNumber" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LaborWorkerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LaborWorkerProfile_userId_key" ON "public"."LaborWorkerProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."LaborWorkerProfile" ADD CONSTRAINT "LaborWorkerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
