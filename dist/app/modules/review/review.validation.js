"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidations = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string(),
        orderId: zod_1.z.string(),
        rating: zod_1.z.number(),
        description: zod_1.z.string().optional(),
    }),
});
exports.reviewValidations = {
    createReviewValidationSchema,
};
