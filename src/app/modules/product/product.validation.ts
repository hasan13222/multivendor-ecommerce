import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    shopId: z.string(),
    categoryId: z.string(),
    name: z.string(),
    description: z.string().optional(),
    code: z.string(),
    images: z.array(z.string()).optional(),
    price: z.number(),
    discount: z.number(),
    stock: z.number(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    categoryId: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    code: z.string().optional(),
    images: z.array(z.string()).optional(),
    price: z.number().optional(),
    discount: z.number().optional(),
    stock: z.number().optional(),
  }),
});

export const productValidations = {
  createProductValidationSchema,
  updateProductValidationSchema
};
