"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopValidations = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const createShopValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        logo: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
const updateShopValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        logo: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z
            .enum(Object.values(client_1.ShopStatus))
            .optional(),
    })
        .strict(),
});
const followShopValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        shopId: zod_1.z.string(),
    })
        .strict(),
});
exports.shopValidations = {
    createShopValidationSchema,
    updateShopValidationSchema,
    followShopValidationSchema,
};
