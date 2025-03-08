import { Coupon } from "@prisma/client";
import { prisma } from "../../constants/prismaClient";

const createCouponIntoDB = async (payload: Coupon) => {
  const result = await prisma.coupon.create({ data: payload });
  return result;
};
const updateCouponIntoDB = async (id: string, payload: Coupon) => {
  const result = await prisma.coupon.update({ where: { id }, data: payload });
  return result;
};
const deleteCouponIntoDB = async (id: string) => {
  const result = await prisma.coupon.delete({ where: { id } });
  return result;
};
const getCouponFromDB = async (code: string) => {
  const result = await prisma.coupon.findFirst({
    where: { code, status: "Active" },
  });
  return result;
};
const getAllCouponFromDB = async () => {
  const result = await prisma.coupon.findMany();
  return result;
};

export const couponServices = {
  createCouponIntoDB,
  updateCouponIntoDB,
  deleteCouponIntoDB,
  getCouponFromDB,
  getAllCouponFromDB
};
