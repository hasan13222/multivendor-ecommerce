import { Shop, ShopStatus } from "@prisma/client";
import { prisma } from "../../constants/prismaClient";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const createShopIntoDB = async (payload: Shop) => {
  const result = await prisma.shop.create({ data: payload });
  return result;
};

const getAllShopFromDB = async () => {
  const result = await prisma.shop.findMany();
  return result;
};

const getMyShopFromDB = async (email: string) => {
  const user = await prisma.auth.findUnique({ where: { email: email } });
  console.log(user)
  const result = await prisma.shop.findFirst({
    where: { userId: user?.id },
  });
  console.log(result)
  return result;
};

const getSingleShopFromDB = async (id: string) => {
  const result = await prisma.shop.findUnique({
    where: { id },
    include: { followedShop: true },
  });
  return result;
};

const updateShopIntoDB = async (
  email: string,
  shopId: string,
  payload: Partial<Shop>
) => {
  const user = await prisma.auth.findUnique({ where: { email: email } });
  const shop = await prisma.shop.findUniqueOrThrow({
    where: { id: shopId, status: "White" },
  });
  if (user?.id !== shop?.userId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "You can not update other vendor shop"
    );
  }

  const result = await prisma.shop.update({
    where: { id: shopId },
    data: payload,
  });
  return result;
};

const deleteShopFromDB = async (email: string, shopId: string) => {
  const user = await prisma.auth.findUnique({ where: { email: email } });
  const shop = await prisma.shop.findUnique({ where: { id: shopId } });
  if (user?.id !== shop?.userId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "You can not update other vendor shop"
    );
  }

  const result = await prisma.shop.delete({
    where: { id: shopId },
  });
  return result;
};

const followShopIntoDB = async (userId: string, shopId: string) => {
  const result = await prisma.followedShop.create({ data: { userId, shopId } });
  return result;
};

const changeShopStatusIntoDb = async (status: ShopStatus, shopId: string) => {
  const result = await prisma.shop.update({
    where: { id: shopId },
    data: { status },
  });
  return result;
};
const unfollowShopIntoDB = async (userId: string, shopId: string) => {
  const result = await prisma.followedShop.delete({
    where: { userId_shopId: { userId, shopId } },
  });
  return result;
};

const checkShopFollowIntoDB = async (userId: string, shopId: string) => {
  const result = await prisma.followedShop.findFirst({
    where: { userId, shopId },
  });
  return result;
};

export const shopServices = {
  createShopIntoDB,
  getAllShopFromDB,
  getMyShopFromDB,
  getSingleShopFromDB,
  updateShopIntoDB,
  deleteShopFromDB,
  followShopIntoDB,
  unfollowShopIntoDB,
  checkShopFollowIntoDB,
  changeShopStatusIntoDb,
};
