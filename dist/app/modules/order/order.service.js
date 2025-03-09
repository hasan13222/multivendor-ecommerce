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
exports.orderServices = void 0;
const prismaClient_1 = require("../../constants/prismaClient");
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.order.createMany({ data: payload });
    return result;
});
const createTransactionIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield prismaClient_1.prisma.product.findFirstOrThrow({
        where: { id: payload.productId },
    });
    const newTr = { amount: payload.amount, userId: payload.userId };
    const result = yield prismaClient_1.prisma.transaction.create({
        data: Object.assign(Object.assign({}, newTr), { shopId: shop === null || shop === void 0 ? void 0 : shop.shopId }),
    });
    return result;
});
const getMyOrderFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.order.findMany({
        where: { userId: userId },
        include: { product: true },
    });
    return result;
});
const getMyShopOrderFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.order.findMany({
        where: {
            product: {
                shop: {
                    userId: userId,
                },
            },
        },
        include: {
            product: true,
        },
    });
    return result;
});
const changeOrderStatusIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.order.update({ where: { id }, data: payload });
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    getMyOrderFromDB,
    getMyShopOrderFromDB,
    createTransactionIntoDB,
    changeOrderStatusIntoDb,
};
