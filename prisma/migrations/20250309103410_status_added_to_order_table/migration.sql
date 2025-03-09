-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Processing', 'Delivered', 'Cancelled');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'Processing';
