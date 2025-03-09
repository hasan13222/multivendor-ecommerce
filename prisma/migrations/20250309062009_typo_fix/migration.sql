/*
  Warnings:

  - You are about to drop the column `long_descripton` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "long_descripton",
ADD COLUMN     "long_description" TEXT DEFAULT 'Long Desc';
