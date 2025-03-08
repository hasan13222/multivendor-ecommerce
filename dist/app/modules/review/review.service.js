"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewServices = void 0;
const prismaClient_1 = require("../../constants/prismaClient");
const createReviewIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductPurchased = yield prismaClient_1.prisma.order.findFirstOrThrow({
        where: { productId: payload.productId, userId: userId },
    });
    const result = yield prismaClient_1.prisma.review.create({ data: Object.assign(Object.assign({}, payload), { userId }) });
    return result;
});
const getProductReviewFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.review.findMany({
        where: { productId: productId },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
        },
    });
    return result;
});
exports.reviewServices = {
    createReviewIntoDB,
    getProductReviewFromDB,
};
