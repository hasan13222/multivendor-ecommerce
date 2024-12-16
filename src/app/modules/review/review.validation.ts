import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    productId: z.string(),
    orderId: z.string(),
    rating: z.number(),
    description: z.string().optional(),
  }),
});

export const reviewValidations = {
  createReviewValidationSchema,
};


