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
exports.cartServices = void 0;
const prismaClient_1 = require("../../constants/prismaClient");
const createCartIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductAlreadyInUserCart = yield prismaClient_1.prisma.cart.findFirst({
        where: { userId: payload.userId, productId: payload.productId },
    });
    if (isProductAlreadyInUserCart) {
        return yield prismaClient_1.prisma.cart.update({
            where: { userId_productId: { userId: payload.userId, productId: payload.productId } },
            data: { qty: isProductAlreadyInUserCart.qty + 1 },
        });
    }
    const result = yield prismaClient_1.prisma.cart.create({ data: payload });
    return result;
});
const updateCartIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.cart.update({ where: { id }, data: payload });
    return result;
});
const deleteCartIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.cart.delete({ where: { id } });
    return result;
});
const getAllCartFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.cart.findMany();
    return result;
});
exports.cartServices = {
    createCartIntoDB,
    updateCartIntoDB,
    deleteCartIntoDB,
    getAllCartFromDB,
};
