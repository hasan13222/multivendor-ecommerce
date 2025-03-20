import { prisma } from "../../constants/prismaClient";

const getAllTransactionFromDB = async () => {
  const result = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};

const getMyTransactionFromDB = async (userId: string) => {
  const result = await prisma.transaction.findMany({
    where: { userId: userId }, 
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};

const getMyShopTransactionFromDB = async (shopId: string) => {
  const result = await prisma.transaction.findMany({
    where: {
      shopId: shopId,
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};

export const transactionServices = {
  getAllTransactionFromDB,
  getMyTransactionFromDB,
  getMyShopTransactionFromDB,
};
