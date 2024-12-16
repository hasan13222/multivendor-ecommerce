-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('Regular', 'Flash');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discountType" "DiscountType" NOT NULL DEFAULT 'Regular';
