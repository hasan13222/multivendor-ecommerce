import { Review } from "@prisma/client";
import { prisma } from "../../constants/prismaClient";

const createReviewIntoDB = async (userId: string, payload: Review) => {
  const isProductPurchased = await prisma.order.findFirstOrThrow({
    where: { productId: payload.productId, userId: userId },
  });
  const result = await prisma.review.create({ data: { ...payload, userId } });
  return result;
};
const getProductReviewFromDB = async (productId: string) => {
  const result = await prisma.review.findMany({
    where: { productId: productId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return result;
};

export const reviewServices = {
  createReviewIntoDB,
  getProductReviewFromDB,
};
