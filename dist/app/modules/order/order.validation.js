"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidations = void 0;
const zod_1 = require("zod");
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string(),
        qty: zod_1.z.number(),
    })),
});
exports.orderValidations = {
    createOrderValidationSchema,
};
