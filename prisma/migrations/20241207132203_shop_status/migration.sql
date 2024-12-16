-- CreateEnum
CREATE TYPE "ShopStatus" AS ENUM ('Black', 'White');

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "status" "ShopStatus" NOT NULL DEFAULT 'White';
