import { prisma } from "../../constants/prismaClient";

const getAllTransactionFromDB = async () => {
  const result = await prisma.transaction.findMany();
  return result;
};

const getMyTransactionFromDB = async (userId: string) => {
  const result = await prisma.transaction.findMany({
    where: { userId: userId },
  });
  return result;
};

const getMyShopTransactionFromDB = async (shopId: string) => {
  const result = await prisma.transaction.findMany({
    where: {
      shopId: shopId,
    },
  });
  return result;
};

export const transactionServices = {
  getAllTransactionFromDB,
  getMyTransactionFromDB,
  getMyShopTransactionFromDB,
};
