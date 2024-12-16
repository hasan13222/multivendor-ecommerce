import { Category } from "@prisma/client";
import { prisma } from "../../constants/prismaClient";

const createCategoryIntoDB = async (payload: Category) => {
  const result = await prisma.category.create({ data: payload });
  return result;
};
const updateCategoryIntoDB = async (id: string, payload: Category) => {
  const result = await prisma.category.update({ where: { id }, data: payload });
  return result;
};
const deleteCategoryIntoDB = async (id: string) => {
  const result = await prisma.category.delete({ where: { id } });
  return result;
};
const getAllCategoryFromDB = async () => {
  const result = await prisma.category.findMany();
  return result;
};

export const categoryServices = {
  createCategoryIntoDB,
  updateCategoryIntoDB,
  deleteCategoryIntoDB,
  getAllCategoryFromDB,
};
