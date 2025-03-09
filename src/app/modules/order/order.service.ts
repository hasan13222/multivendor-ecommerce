import { Order } from "@prisma/client";
import { prisma } from "../../constants/prismaClient";

const createOrderIntoDB = async (payload: Order[]) => {
  const result = await prisma.order.createMany({ data: payload });
  return result;
};

const createTransactionIntoDB = async (payload: any) => {
  const shop = await prisma.product.findFirstOrThrow({
    where: { id: payload.productId },
  });
  const newTr = { amount: payload.amount, userId: payload.userId };
  const result = await prisma.transaction.create({
    data: { ...newTr, shopId: shop?.shopId },
  });
  return result;
};
const getMyOrderFromDB = async (userId: string) => {
  const result = await prisma.order.findMany({
    where: { userId: userId },
    include: { product: true },
  });
  return result;
};
const getMyShopOrderFromDB = async (userId: string) => {
  const result = await prisma.order.findMany({
    where: {
      product: {
        shop: {
          userId: userId,
        },
      },
    },
    include: {
      product: true,
    },
  });
  return result;
};

const changeOrderStatusIntoDb = async (id: string, payload: Order) => {
  const result = await prisma.order.update({ where: { id }, data: payload });
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getMyOrderFromDB,
  getMyShopOrderFromDB,
  createTransactionIntoDB,
  changeOrderStatusIntoDb,
};
