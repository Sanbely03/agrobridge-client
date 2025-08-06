/*
  Warnings:

  - The values [VET,OVERSEER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."LaborSpecialization" AS ENUM ('VETERINARY', 'FIELD_OVERSEER', 'AGRONOMIST', 'FIELD_AGENT', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."UserRole_new" AS ENUM ('ADMIN', 'FARMER', 'INVESTOR', 'BUSINESS', 'SUPPLIER', 'DELIVERY_PARTNER', 'LABOR_WORKER');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."User" ALTER COLUMN "role" TYPE "public"."UserRole_new" USING ("role"::text::"public"."UserRole_new");
ALTER TYPE "public"."UserRole" RENAME TO "UserRole_old";
ALTER TYPE "public"."UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'FARMER';
COMMIT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "laborSpecialization" "public"."LaborSpecialization";
