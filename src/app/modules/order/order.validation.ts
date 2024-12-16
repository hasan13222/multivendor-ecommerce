import { z } from "zod";

const createOrderValidationSchema = z.object({
  body: z.array(
    z.object({
      productId: z.string(),
      qty: z.number(),
    })
  ),
});

export const orderValidations = {
  createOrderValidationSchema,
};
