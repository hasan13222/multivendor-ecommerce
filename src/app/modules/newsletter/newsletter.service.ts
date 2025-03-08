import { Newsletter } from "@prisma/client";
import { prisma } from "../../constants/prismaClient";

const createNewsletterIntoDB = async (payload: Newsletter) => {
  const result = await prisma.newsletter.create({ data: payload });
  return result;
};


export const newsletterServices = {
  createNewsletterIntoDB,
};
