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
exports.productServices = void 0;
const prismaClient_1 = require("../../constants/prismaClient");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isShopActive = yield prismaClient_1.prisma.shop.findUniqueOrThrow({ where: { id: payload.shopId, status: "White" } });
    const result = yield prismaClient_1.prisma.product.create({ data: payload });
    return result;
});
const updateProductIntoDB = (userEmail, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prisma.auth.findUniqueOrThrow({
        where: { email: userEmail },
    });
    const product = yield prismaClient_1.prisma.product.findUniqueOrThrow({
        where: { id: id, shop: { status: "White" } },
        include: { shop: true },
    });
    if (product.shop.userId !== user.id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not allowed to update other vendor product");
    }
    const result = yield prismaClient_1.prisma.product.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteProductIntoDB = (userEmail, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prisma.auth.findUniqueOrThrow({
        where: { email: userEmail },
    });
    const product = yield prismaClient_1.prisma.product.findUniqueOrThrow({
        where: { id: id, shop: { status: 'White' } },
        include: { shop: true },
    });
    if (product.shop.userId !== user.id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not allowed to delete other vendor product");
    }
    const result = yield prismaClient_1.prisma.product.delete({
        where: { id },
    });
    return result;
});
const getAllProductFromDB = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const filterCondition = [{ shop: { status: "White" } }];
    const searchFields = ["name", "description", "code"];
    if (params.searchTerm) {
        const conditionItems = searchFields.map((field) => {
            return {
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            };
        });
        filterCondition.push({ OR: conditionItems });
    }
    if (params.minPrice) {
        filterCondition.push({
            price: {
                gte: Number(params.minPrice),
            },
        });
    }
    if (params.maxPrice) {
        filterCondition.push({
            price: {
                lte: Number(params.maxPrice),
            },
        });
    }
    if (params.category) {
        filterCondition.push({
            category: {
                name: params.category,
            },
        });
    }
    const totalProducts = yield prismaClient_1.prisma.product.count({ where: { AND: filterCondition } });
    const result = yield prismaClient_1.prisma.product.findMany({
        where: { AND: filterCondition },
        include: {
            category: true,
            Reviews: {
                select: {
                    rating: true,
                },
            },
        },
        take: Number(params.limit) || 100000,
        skip: params.page ? (Number(params.page) - 1) * Number(params.limit) : 0,
        orderBy: [
            {
                shop: {
                    followedShop: {
                        _count: "desc",
                    },
                },
            },
        ],
    });
    console.log(params.page);
    return { result, meta: { page: params.page || 1, total: totalProducts, limit: Number(params.limit) } };
});
const getShopProductFromDB = (shopId, params) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.product.findMany({
        where: { shopId },
        include: {
            category: true,
            Reviews: {
                select: {
                    rating: true,
                },
            },
        },
        take: Number(params.limit) || 100000,
    });
    return result;
});
const getCartProductFromDB = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.product.findMany({
        where: { id: { in: ids } },
    });
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
            shop: true,
            Reviews: {
                select: {
                    rating: true,
                },
            },
        },
    });
    return result;
});
exports.productServices = {
    createProductIntoDB,
    updateProductIntoDB,
    deleteProductIntoDB,
    getAllProductFromDB,
    getShopProductFromDB,
    getSingleProductFromDB,
    getCartProductFromDB,
};
