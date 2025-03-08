import { Prisma, Product } from "@prisma/client";
import { prisma } from "../../constants/prismaClient";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const createProductIntoDB = async (payload: Product) => {
  const isShopActive = await prisma.shop.findUniqueOrThrow({where: {id: payload.shopId, status: "White"}})
  const result = await prisma.product.create({ data: payload });
  return result;
};


const updateProductIntoDB = async (
  userEmail: string,
  id: string,
  payload: Product
) => {
  const user = await prisma.auth.findUniqueOrThrow({
    where: { email: userEmail },
  });
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: id, shop: {status: "White"} },
    include: { shop: true },
  });

  if (product.shop.userId !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to update other vendor product"
    );
  }
  const result = await prisma.product.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteProductIntoDB = async (userEmail: string, id: string) => {
  const user = await prisma.auth.findUniqueOrThrow({
    where: { email: userEmail },
  });
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: id, shop: {status: 'White'} },
    include: { shop: true },
  });

  if (product.shop.userId !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to delete other vendor product"
    );
  }
  const result = await prisma.product.delete({
    where: { id },
  });
  return result;
};

const getAllProductFromDB = async (params: any) => {
  const filterCondition: Prisma.ProductWhereInput[] = [{shop: {status: "White"}}];
  const searchFields = ["name", "description", "code"];

  if (params.searchTerm) {
    const conditionItems = searchFields.map((field) => {
      return {
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      };
    });

    filterCondition.push({ OR: conditionItems });
  }

  if (params.minPrice) {
    filterCondition.push({
      price: {
        gte: Number(params.minPrice),
      },
    });
  }
  if (params.maxPrice) {
    filterCondition.push({
      price: {
        lte: Number(params.maxPrice),
      },
    });
  }
  if (params.category) {
    filterCondition.push({
      category: {
        name: params.category,
      },
    });
  }

  const totalProducts = await prisma.product.count({where: {AND: filterCondition}})

  const result = await prisma.product.findMany({
    where: { AND: filterCondition },
    include: {
      category: true,
      Reviews: {
        select: {
          rating: true,
        },
      },
    },
    take: Number(params.limit) || 100000,
    skip: params.page ? (Number(params.page)-1) * Number(params.limit) : 0,
    orderBy: [
      {
        shop: {
          followedShop: {
            _count: "desc",
          },
          
        },
      },
    ],
  });

  console.log(params.page)

  return {result, meta: {page: params.page || 1, total: totalProducts, limit: Number(params.limit)}};
};
const getShopProductFromDB = async (shopId: string, params: any) => {
  const result = await prisma.product.findMany({
    where: { shopId },
    include: {
      category: true,
      Reviews: {
        select: {
          rating: true,
        },
      },
    },
    take: Number(params.limit) || 100000,
  });
  return result;
};
const getCartProductFromDB = async (ids: string[]) => {
  const result = await prisma.product.findMany({
    where: { id: { in: ids} },
    
  });
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      shop: true,
      Reviews: {
        select: {
          rating: true,
        },
      },
    },
  });
  return result;
};

export const productServices = {
  createProductIntoDB,
  updateProductIntoDB,
  deleteProductIntoDB,
  getAllProductFromDB,
  getShopProductFromDB,
  getSingleProductFromDB,
  getCartProductFromDB,
};
