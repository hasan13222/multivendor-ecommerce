import { Contact } from "@prisma/client";
import { prisma } from "../../constants/prismaClient";

const createContactIntoDB = async (payload: Contact) => {
  const result = await prisma.contact.create({ data: payload });
  return result;
};


export const contactServices = {
  createContactIntoDB,
};
