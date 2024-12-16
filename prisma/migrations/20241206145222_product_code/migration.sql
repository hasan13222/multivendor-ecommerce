/*
  Warnings:

  - Made the column `isDeleted` on table `Auth` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "isDeleted" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "code" TEXT;
