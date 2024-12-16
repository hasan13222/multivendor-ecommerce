import { z } from "zod";

const createCartValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    productId: z.string(),
    qty: z.number(),
  }),
});

const updateCartValidationSchema = z.object({
  body: z.object({
    qty: z.number(),
  }).strict(),
});

export const cartValidations = {
  createCartValidationSchema,
  updateCartValidationSchema
};
