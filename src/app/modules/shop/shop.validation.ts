import { z } from "zod";
import { ShopStatus } from "@prisma/client";
const createShopValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    logo: z.string().optional(),
    description: z.string().optional(),
  }),
});

const updateShopValidationSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      logo: z.string().optional(),
      description: z.string().optional(),
      status: z
        .enum(Object.values(ShopStatus) as [string, ...string[]])
        .optional(),
    })
    .strict(),
});

const followShopValidationSchema = z.object({
  body: z
    .object({
      shopId: z.string(),
    })
    .strict(),
});

export const shopValidations = {
  createShopValidationSchema,
  updateShopValidationSchema,
  followShopValidationSchema,
};
