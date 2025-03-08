"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidations = void 0;
const zod_1 = require("zod");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        shopId: zod_1.z.string(),
        categoryId: zod_1.z.string(),
        name: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        code: zod_1.z.string(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        price: zod_1.z.number(),
        discount: zod_1.z.number(),
        stock: zod_1.z.number(),
    }),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        code: zod_1.z.string().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        price: zod_1.z.number().optional(),
        discount: zod_1.z.number().optional(),
        stock: zod_1.z.number().optional(),
    }),
});
exports.productValidations = {
    createProductValidationSchema,
    updateProductValidationSchema
};
