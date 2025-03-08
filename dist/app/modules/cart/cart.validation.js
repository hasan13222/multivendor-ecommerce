"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidations = void 0;
const zod_1 = require("zod");
const createCartValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        productId: zod_1.z.string(),
        qty: zod_1.z.number(),
    }),
});
const updateCartValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        qty: zod_1.z.number(),
    }).strict(),
});
exports.cartValidations = {
    createCartValidationSchema,
    updateCartValidationSchema
};
