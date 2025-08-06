/*
  Warnings:

  - You are about to drop the column `unwithdrowableBalance` on the `Wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Wallet" DROP COLUMN "unwithdrowableBalance",
ADD COLUMN     "unwithdrawableBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
