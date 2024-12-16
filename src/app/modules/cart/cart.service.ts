import { Cart } from "@prisma/client";
import { prisma } from "../../constants/prismaClient";

const createCartIntoDB = async (payload: Cart) => {
  const isProductAlreadyInUserCart = await prisma.cart.findFirst({
    where: { userId: payload.userId, productId: payload.productId },
  });
  if (isProductAlreadyInUserCart) {
    return await prisma.cart.update({
      where: { userId_productId: {userId: payload.userId, productId: payload.productId} },
      data: { qty: isProductAlreadyInUserCart.qty + 1 },
    });
  }
  const result = await prisma.cart.create({ data: payload });
  return result;
};
const updateCartIntoDB = async (id: string, payload: Cart) => {
  const result = await prisma.cart.update({ where: { id }, data: payload });
  return result;
};
const deleteCartIntoDB = async (id: string) => {
  const result = await prisma.cart.delete({ where: { id } });
  return result;
};
const getAllCartFromDB = async () => {
  const result = await prisma.cart.findMany();
  return result;
};

export const cartServices = {
  createCartIntoDB,
  updateCartIntoDB,
  deleteCartIntoDB,
  getAllCartFromDB,
};
