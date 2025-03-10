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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopServices = void 0;
const prismaClient_1 = require("../../constants/prismaClient");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const createShopIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.shop.create({ data: payload });
    return result;
});
const getAllShopFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.shop.findMany({ include: { followedShop: true, _count: { select: { Product: true } } } });
    return result;
});
const getMyShopFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prisma.auth.findUnique({ where: { email: email } });
    console.log(user);
    const result = yield prismaClient_1.prisma.shop.findFirst({
        where: { userId: user === null || user === void 0 ? void 0 : user.id },
    });
    console.log(result);
    return result;
});
const getSingleShopFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.shop.findUnique({
        where: { id },
        include: { followedShop: true },
    });
    return result;
});
const updateShopIntoDB = (email, shopId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prisma.auth.findUnique({ where: { email: email } });
    const shop = yield prismaClient_1.prisma.shop.findUniqueOrThrow({
        where: { id: shopId, status: "White" },
    });
    if ((user === null || user === void 0 ? void 0 : user.id) !== (shop === null || shop === void 0 ? void 0 : shop.userId)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "You can not update other vendor shop");
    }
    const result = yield prismaClient_1.prisma.shop.update({
        where: { id: shopId },
        data: payload,
    });
    return result;
});
const deleteShopFromDB = (email, shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prisma.auth.findUnique({ where: { email: email } });
    const shop = yield prismaClient_1.prisma.shop.findUnique({ where: { id: shopId } });
    if ((user === null || user === void 0 ? void 0 : user.id) !== (shop === null || shop === void 0 ? void 0 : shop.userId)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "You can not update other vendor shop");
    }
    const result = yield prismaClient_1.prisma.shop.delete({
        where: { id: shopId },
    });
    return result;
});
const followShopIntoDB = (userId, shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.followedShop.create({ data: { userId, shopId } });
    return result;
});
const changeShopStatusIntoDb = (status, shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.shop.update({
        where: { id: shopId },
        data: { status },
    });
    return result;
});
const unfollowShopIntoDB = (userId, shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.followedShop.delete({
        where: { userId_shopId: { userId, shopId } },
    });
    return result;
});
const checkShopFollowIntoDB = (userId, shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.followedShop.findFirst({
        where: { userId, shopId },
    });
    return result;
});
exports.shopServices = {
    createShopIntoDB,
    getAllShopFromDB,
    getMyShopFromDB,
    getSingleShopFromDB,
    updateShopIntoDB,
    deleteShopFromDB,
    followShopIntoDB,
    unfollowShopIntoDB,
    checkShopFollowIntoDB,
    changeShopStatusIntoDb,
};
